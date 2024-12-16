'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { auth, db } from '@/firebaseConfig';
import SuccessAccount from './successful';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    AtSymbolIcon, KeyIcon, UserCircleIcon, CheckCircleIcon,
    XCircleIcon, EyeIcon, EyeSlashIcon
} from '@heroicons/react/24/outline';
import { doc, setDoc } from "firebase/firestore";
import LogoMotto from '../login/logo-motto';
import SignUpAesthetics from './aesthetics';

export default function SignUpForm() {
    const router = useRouter(); // Initialize the router

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [passwordConditions, setPasswordConditions] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false, // Add password length condition
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState<string | null>(null); // To handle errors
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showSuccess, setShowSuccess] = useState(false); // New state to show success message

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$*&]/.test(password);
        const hasMinLength = password.length >= 8; // Check if password length is >= 8

        setPasswordConditions({
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            hasMinLength, // Update state with length condition
        });

        setIsPasswordValid(
            hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (isPasswordValid) {
            try {
                // Firebase authentication
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;
                //console.log("User signed up:", user);

                // Update profile to include the name
                await updateProfile(user, {
                    displayName: formData.name,
                });
                //console.log("User signed up and profile updated:", user);

                // Store user metadata in Firestore
                const userRef = doc(db, "users", user.uid); // Reference to the user's document
                await setDoc(userRef, {
                    uid: user.uid,
                    name: formData.name,
                    email: formData.email,
                    userType: 1,
                    createdAt: new Date(),
                });
                console.log("User data stored in Firestore");
                setShowSuccess(true);

            } catch (error: any) {
                if (error.code === "auth/email-already-in-use") {
                    setError("This email is already registered. Please use a different email or log in.");
                } else {
                    setError(error.message);
                }
                console.log("Error signing up:", error.message);
            }
        } else {
            console.log("Password is invalid");
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const goToLogin = () => {
        router.push('/login');
    };

    // If sign-up is successful, show the Successful component
    if (showSuccess) {
        return <SuccessAccount onGoToLogin={goToLogin} />;
    }

    return (
        <div>
            <div className="xl:flex xl:h-screen md:mt-20 xl:mt-0">
                {/* Header */}
                <div className="xl:basis-2/5 xl:pt-40">
                    < LogoMotto />
                    < SignUpAesthetics />
                </div>

                {/* Create Account Form */}
                <div className="flex flex-col mb-10 mx-10 space-y-3 md:mx-24 lg:space-y-5 xl:flex-grow xl:my-16">
                    <div className="mt-4 text-xl text-red-500 lg:text-2xl">
                        <h2>Create Account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">

                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="text-gray-500 lg:text-xl">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                    placeholder="Your Name"
                                    autoComplete='No'
                                />
                                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="text-gray-600 lg:text-xl">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                    placeholder="you@example.com"
                                    autoComplete='No'
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="text-gray-500 lg:text-xl">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder:text-gray-500"
                                    placeholder="Your Password"
                                    minLength={8}
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500 peer-focus:text-gray-900" />
                                {/* Toggle password visibility icon */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeIcon className="h-5 w-5 text-red-500" /> : <EyeSlashIcon className="h-5 w-5 text-red-500" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        
                        {/* Password requirement hints with icons */}
                        <div>
                            <div className="text-sm text-gray-500 space-y-2">
                                <span className="text-red-500 lg:text-xl">Requirements:</span>
                                <ul className="list-none space-y-2">

                                    <li className="flex items-center lg:text-lg">
                                        {passwordConditions.hasUpperCase ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        At least one uppercase letter
                                    </li>

                                    <li className="flex items-center lg:text-lg">
                                        {passwordConditions.hasLowerCase ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        At least one lowercase letter
                                    </li>

                                    <li className="flex items-center lg:text-lg">
                                        {passwordConditions.hasNumber ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        At least one number
                                    </li>

                                    <li className="flex items-start lg:text-lg">
                                        {passwordConditions.hasSpecialChar ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        <div>
                                            <span>At least one special character <span className="hidden text-red-500 md:inline-block ml-1">(!, @, #, $, *, &)</span></span>
                                        </div>
                                        <span className="block text-red-500 md:hidden">(!, @, #, $, *, &)</span>
                                    </li>
                                    <li className="flex items-center lg:text-lg">
                                        {passwordConditions.hasMinLength ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        At least 8 characters
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <div>
                            <button
                                type="submit"
                                className={`w-full bg-red-500 text-white py-2 mt-4 rounded-md font-semibold hover:bg-red-700 transition duration-300 lg:text-lg ${!isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={!isPasswordValid}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>


                    {/* Other Options */}
                    <div className="space-x-3 lg:text-lg">
                        <span className="text-gray-600">
                            Already have an account?
                        </span>
                        <Link href="/login" className="text-red-600 hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

