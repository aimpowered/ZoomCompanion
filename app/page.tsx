// Homepage - User login and signup
"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

const Login = () => {
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    const { email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) return setError(res.error);
        router.replace("/main");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    {error ? <Alert value={error} /> : null}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700">
                          Email
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={userInfo.email}
                          onChange={handleChange}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    I am new,{" "}
                    <a href="/sign-up" className="text-blue-500 underline">
                        sign up only
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
