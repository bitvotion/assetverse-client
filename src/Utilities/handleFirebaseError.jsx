import toast from "react-hot-toast";

// Accept 'toastId' as an optional second parameter
export const handleFirebaseError = (code, toastId = null) => {
  let message = "Something went wrong. Please try again.";

  // Map error codes to messages
  switch (code) {
    case "auth/invalid-email":
      message = "Invalid email address. Please check your input.";
      break;
    case "auth/user-disabled":
      message = "This account has been disabled. Contact support.";
      break;
    case "auth/user-not-found":
    case "auth/invalid-credential": // Common for login failures
      message = "Invalid email or password.";
      break;
    case "auth/wrong-password":
      message = "Incorrect password.";
      break;
    case "auth/email-already-in-use":
      message = "Email already in use. Try logging in instead.";
      break;
    case "auth/weak-password":
      message = "Password is too weak. Use at least 6 characters.";
      break;
    case "auth/network-request-failed":
      message = "Network error. Check your connection.";
      break;
    case "auth/too-many-requests":
      message = "Too many attempts. Try again later.";
      break;
    // ... add other cases as needed
    default:
      message = "An error occurred. Please try again.";
  }

  // LOGIC: If a toastId is provided, UPDATE it. Otherwise, create NEW.
  if (toastId) {
    toast.error(message, { id: toastId });
  } else {
    toast.error(message);
  }
};