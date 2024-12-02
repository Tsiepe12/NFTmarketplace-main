//src/app/login/page.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  //
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('User logged in:', result.user);
    router.push("/dashboard"); // Redirect to dashboard after successful login
  } catch (error) {
    console.error('Google login error:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      setError("The popup was closed before completing the sign-in. Please try again.");
    } else if (error.code === 'auth/cancelled-popup-request') {
      setError("Popup request was cancelled. Please try again.");
    } else {
      setError("Google login failed. Please try again.");
    }
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-customGrey p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Login
        </h2>
        {error && (
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-black dark:text-white"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-white text-black dark:text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-black dark:text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-white text-black dark:text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
        <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded mt-4">Login with Google</button>
        <Link href="/register" className="text-blue-500 dark:text-blue-300 hover:underline mt-4 block">Register here</Link>
      </div>
    </div>
  );
};

export default Login;