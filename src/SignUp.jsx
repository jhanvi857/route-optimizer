import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setMsg("Password must contain at least one letter and one number.");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/signup`, {
        name,
        email,
        password,
      });
      console.log("Signup successful", res.data);
      alert("SignUp successful — now please login to the website.");
      setMsg("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Signup failed", err.response?.data || err.message);
      setMsg(err.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <section className="bg-white dark:bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto" data-aos="fade-up">
        <form className="w-full max-w-md" onSubmit={handleSignUp}>
          <div className="flex justify-center items-center">
            <a
              href="#"
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
            >
              Sign Up
            </a>
          </div>

          {msg && (
            <p className="mt-4 text-sm text-red-600 text-center font-medium">
              {msg}
            </p>
          )}

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-blue-500 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
              placeholder="Username"
            />
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 border-blue-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
              placeholder="Email address"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg border-blue-400 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg border-blue-400 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
              placeholder="Confirm Password"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center">
              <Link to="/Login">
                <button className="text-sm text-blue-500 hover:underline">
                  Already have an account? Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
