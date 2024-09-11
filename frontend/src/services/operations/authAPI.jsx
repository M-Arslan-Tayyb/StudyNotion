
import { toast } from "react-hot-toast"
import { endpoints ,contact} from "../apis"
import { apiConnector } from "../apiConnector"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation } from '@tanstack/react-query';

import { useDispatch } from "react-redux";
import { setToken } from "@/redux/Slices/auth";
import { setUser } from "@/redux/Slices/profile";
import {resetCart} from "@/redux/Slices/cart";


import { useNavigate } from "react-router-dom";



const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints



//login:

export function useLoginMutation() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: ({ email, password }) => {
            return apiConnector('POST', LOGIN_API, {
                email,
                password,
            });
        },
        onMutate: () => {
            toast.loading('Loading...');
        },
        onSuccess: (response) => {
            toast.dismiss();
            if (!response.data.success) {
                throw new Error(response.data.msg);
            }

            toast.success('Login Successful');
            console.log("The response is: ", response);

            // Save the token and user data in local storage
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.user));

            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser(response.data.user));

            // Automatically cache the user data
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
        onError: (error) => {
            toast.dismiss();
            let errorMessage = 'Login failed';

            if (error.response && error.response.data && error.response.data.msg) {
                errorMessage = error.response.data.msg; // Access the message from the response
            } else if (error.message) {
                errorMessage = error.message; // Fallback to the generic error message
            }

            toast.error(errorMessage);
            console.error('LOGIN API ERROR:', error);
        },
    });
}

//send otp:
export function useSendOTPMutation() {
    return useMutation({
        mutationFn: ({ email }) => {
            return apiConnector('POST', SENDOTP_API, {
                email,
            });
        },
        onMutate: () => {
            toast.loading('Loading...');
        },
        onSuccess: (response) => {
            toast.dismiss();
            if (!response.data.success) {
                throw new Error(response.data.msg);
            }

            toast.success('OTP sent successfully');
            console.log("The OTP response is:", response);
        },
        onError: (error) => {
            toast.dismiss();

            console.error('Complete Error Object:', error);

            const errorMessage = error.response?.data?.msg || 'OTP failed';
            toast.error(errorMessage);
            console.error('OTP ERROR:', errorMessage);
        }

    });
}


//signup:

export function useSignUpMutation() {
    return useMutation({
        mutationFn: ({ accountType, firstName, lastName, email, password, confirmPassword, otp }) => {
            return apiConnector('POST', SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
        },
        onMutate: () => {
            toast.loading('Loading...');
        },
        onSuccess: (response) => {
            toast.dismiss();
            if (!response.data.success) {
                throw new Error(response.data.msg);
            }

            toast.success('Registered Successfully');
            console.log("The response is: ", response);
        },
        onError: (error) => {
            toast.dismiss();
            let errorMessage = 'Signup failed';

            if (error.response && error.response.data && error.response.data.msg) {
                errorMessage = error.response.data.msg; // Access the message from the response
            } else if (error.message) {
                errorMessage = error.message; // Fallback to the generic error message
            }

            toast.error(errorMessage);
            console.error('SIGNUP ERROR:', error);
        },
    });
}

//rest pass token:

export function usePasswordResetToken() {
    return useMutation({
        mutationFn: ({ email }) => {
            return apiConnector('POST', RESETPASSTOKEN_API, {
                email,
            });
        },
        onMutate: () => {
            toast.loading('Loading...');
        },
        onSuccess: (response, { setEmailSent }) => {  // Pass setEmailSent here
            toast.dismiss();
            if (!response.data.success) {
                throw new Error(response.data.msg);
            }

            toast.success('Link sent to your email');
            setEmailSent(true);  // Set emailSent to true here
            console.log("The response of reset pass token is:", response);
        },
        onError: (error) => {
            toast.dismiss();

            console.error('Complete Error Object:', error);

            const errorMessage = error.response?.data?.msg || 'OTP failed';
            toast.error(errorMessage);
            console.error('reset pass token ERROR:', errorMessage);
        }
    });
}

//reset pass:
export function usePasswordReset() {
    return useMutation({
        mutationFn: ({ password, confirmPassword, token }) => {
            return apiConnector('POST', RESETPASSWORD_API, {
                password, confirmPassword, token
            });
        },
        onMutate: () => {
            toast.loading('Loading...');
        },
        onSuccess: (response) => {  // Pass setEmailSent here
            toast.dismiss();
            if (!response.data.success) {
                throw new Error(response.data.msg);
            }

            toast.success('Password updated successfully');

            console.log("The response of reset pass is:", response);
        },
        onError: (error) => {
            toast.dismiss();

            console.error('Complete Error Object:', error);

            const errorMessage = error.response?.data?.msg || 'update password failed';
            toast.error(errorMessage);
            console.error('reset pass ERROR:', errorMessage);
        }
    });
}

//logout:
export function logout(navigate) {
    return (dispatch) => {
        try {
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(resetCart());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Logged Out");
            navigate("/"); // Navigate to home after logging out
            console.log("user logged out");
        } catch (error) {
            console.error("LOGOUT ERROR............", error);
            toast.error("Logout Failed");
        }
    }
}

//contact us:





