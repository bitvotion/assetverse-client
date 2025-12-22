import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Packages from '../../Components/Packages/Packages';
import AboutSection from '../../Components/HomePageSections/AboutSection';
import FeaturesShowcase from '../../Components/HomePageSections/FeaturesShowcase';
import Testimonials from '../../Components/HomePageSections/Testimonials';
import ExtraSections from '../../Components/HomePageSections/ExtraSections';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Packages></Packages>
            <AboutSection></AboutSection>
            <FeaturesShowcase></FeaturesShowcase>
            <Testimonials></Testimonials>
            <ExtraSections></ExtraSections>

        </div>
    );
};

export default Home;