import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaRegEnvelope, FaTimes } from 'react-icons/fa';
import EmailIcon from '../../Components/Icons/EmailIcon';
import PasswordIcon from '../../Components/Icons/PasswordIcon';
import ProfileIcon from '../../Components/Icons/ProfileIcon';
import CompanyNameIcon from '../../Components/Icons/CompanyNameIcon';
import SlideLeft from '../../Components/Animation/SlideLeft';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import Logo from '../../Components/Logo/Logo';
import { handleFirebaseError } from '../../Utilities/handleFirebaseError';

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAs = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const navigate = useNavigate()
    const { createUser, updateUserProfile, setLoading } = useAuth()
    const [showPwd, setShowPwd] = useState(false)
    const [showPasswordRules, setShowPasswordRules] = useState(false)
    const [showStepIndicator, setShowStepIndicator] = useState(false)
    const [submittedStep, setSubmittedStep] = useState(null);
    const axiosInstance = useAxios()

    const {
        register,
        reset,
        handleSubmit,
        watch,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            companyName: ""
        }
    })
    useEffect(() => {
        reset({
            email: "",
            password: "",
            fullName: "",
            companyName: "",
            // clear other fields if needed
        });
    }, [reset])


    const password = watch("password", "");

    const steps = [
        { fields: ["email", "password"], title: "Account Credentials" },
        { fields: ["fullName", "dateOfBirth"], title: "Personal Details" },
    ]
    const requirements = [
        { label: "At least 6 characters", valid: password.length >= 6 },
        { label: "Contains an uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "Contains a lowercase letter", valid: /[a-z]/.test(password) },
        { label: "Contains a number", valid: /[0-9]/.test(password) },
    ]

    const handleHrRegistration = async (data) => {
        if (currentStep !== steps.length - 1) return;

        const toastId = toast.loading("Creating your personal workspace...")
        try {
            // Upload images to ImgBB
            const userPhoto = { image: data.userPhoto[0] }
            const userPhotoRes = await axios.post(image_hosting_api, userPhoto, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            const userPhotoURL = userPhotoRes.data.data.display_url


            // Firebase Registration
            await createUser(data.email, data.password)
                .then(async () => {
                    await updateUserProfile(data.fullName, userPhotoURL)
                        .then(async () => {
                            const userData = {
                                name: data.fullName,
                                email: data.email,
                                role: "employee",
                                dateOfBirth: data.dateOfBirth,
                                userPhoto: userPhotoURL,
                            }
                            // Save data in MongoDB
                            const res = await axiosInstance.post('/users', userData)
                            if (res.data.insertedId) {
                                toast.success("Employee Account Created! Login Now", { id: toastId });
                                reset()
                                setCurrentStep(0)
                                navigate('/login')
                            }
                        })
                })
            setLoading(false)
            // console.log('user photo url', userPhotoURL);
        }
        catch (error) {
            // console.error(error);
            setLoading(false)
            handleFirebaseError(error.code, toastId)
        }
        // console.log(data)
    }

    const handleNextStep = async () => {
        const isValid = await trigger(steps[currentStep].fields)
        if (isValid) {
            setSubmittedStep(null);
            setCurrentStep((prev) => prev + 1)
        } else {
            setSubmittedStep(currentStep)
        }
        console.log(currentStep);
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    return (
        <div className='relative min-h-screen bg-base-200/10 lg:rounded-r-[100px] w-full lg:w-1/2 flex items-center'>
            <Logo></Logo>
            <div className=' card w-full overflow-hidden flex flex-col justify-center items-center '>
                <h2 className=' text-3xl mb-4 text-white font-semibold'>Please select your role</h2>
                <div className='max-w-sm mx-auto'>
                    <Link to='/join-employee' className='btn my-2 w-full hover:bg-linear-to-r from-secondary to-primary transition-all duration-300 hover:text-white font-bold btn-lg border-0  '>Join As Employee</Link>
                    <Link to='/join-hr' className='btn my-2 w-full hover:bg-linear-to-r from-secondary to-primary transition-all duration-300 hover:text-white font-bold btn-lg border-0  '>Join As HR Manager</Link>
                </div>
                <p className='text-center mt-3 text-gray-100 '>Already Have an account? <span><Link className='text-blue-200 hover:underline font-semibold' to="/login">Login</Link></span></p>
            </div>

        </div>
    );
};

export default JoinAs;