"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';        
import LoginAesthetics from "./aesthetics";
import React, { useState } from 'react';
import { auth } from '@/firebaseConfig'; 
import LogoMotto from "./logo-motto";
import Link from 'next/link';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';


export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();                     // Initialize the router


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Attempt to sign in with Firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            // Redirect or handle login success (e.g., push to homepage)
            router.push('/home');
        } catch (error) {
            setError("Failed to log in. Please check your email and password.");
            console.error(error);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative">
            <div className="mt-20 xl:mt-0 xl:flex xl:h-screen">
                <div className="xl:basis-2/3 flex items-center justify-center">
                    < LogoMotto />
                    < LoginAesthetics />
                </div>

                {/* Login Form */}
                <div className="flex mx-10 md:mx-auto md:w-[70%] xl:flex-grow xl:items-center xl:justify-center xl:bg-red-400">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4 w-full xl:mx-12 xl:bg-white xl:p-8 xl:rounded-lg xl:shadow-md 2xl:mx-16"
                    >
                        {/* Header */}
                        <div className="hidden xl:block">
                            <h2 className="mb-6 text-4xl text-center text-red-500">Login</h2>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="text-sm md:text-lg font-medium text-red-500">
                                Email
                            </label>
                            <div>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                        value={email}
                                        autoComplete="Yes"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md 
                                                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent 
                                                    placeholder:text-gray-500"
                                    />
                                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm md:text-lg font-medium text-red-500">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="passwordMobile"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={8}
                                    className="mt-1 block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-500"
                                />
                                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeIcon className="h-5 w-5 text-red-500" /> : <EyeSlashIcon className="h-5 w-5 text-red-500" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="text-red-500 text-sm flex items-center">
                                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}

                        {/* Log In Button */}
                        <button
                            type="submit"
                            className="w-full py-2 font-semibold text-red-500 border border-gray-300 rounded-md 
                                        hover:bg-red-700 hover:outline-none hover:text-white transition duration-300"
                        >
                            Log In
                        </button>

                        {/* Links */}
                        <div className="flex flex-col items-start">
                            <div>
                                <Link href="/signup" className="text-sm text-red-500 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div>
                                <span className="mr-3 text-sm text-gray-500">Don't have an account?</span>
                                <Link href="/signup" className="text-sm text-red-500 hover:underline">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

