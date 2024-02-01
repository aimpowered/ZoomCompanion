// Signup Page - User sign up only
"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import Alert from "@/components/Alert"; // Import the Alert component

const SignUp = () => {
    const [busy, setBusy] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isUserCreated, setIsUserCreated] = useState(false); // State variable to track user creation

    const { name, email, password } = userInfo;
    
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        setBusy(true);
        e.preventDefault();
        await fetch("/api/auth/users", { 
            method: "POST",
            body: JSON.stringify(userInfo),
            }).then((res) => res.json());
        setIsUserCreated(true);
        setBusy(false);
    };

return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="max-w-md w-full p-6">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                {isUserCreated && (
                    <Alert value="User created successfully!"  />
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition-colors"
                        type="submit"
                        disabled={busy}
                        style={{ opacity: busy ? 0.5 : 1 }}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
