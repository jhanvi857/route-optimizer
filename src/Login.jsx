import React from "react";
import axios from "axios";
import { useState } from "react";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { Routes, Link, Route } from "react-router-dom";
function Login() {
  const API_BASE = import.meta.env.VITE_API_URL;
  // console.log(API_BASE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      // localStorage.setItem("token", res.data.token);
      if((await res).status===200) {
        localStorage.setItem("userEmail",(await res).data.user.email);
        alert("Log in successful !!");
        navigate("/SavedRoutes");

      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-32 w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg lg:max-w-4xl mb-8" data-aos="fade-up">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <p className="mt-3 text-xl text-center text-blue-400">
            Welcome back!
          </p>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-blue-400 transition-colors duration-300 transform border rounded-lg hover:bg-blue-400 hover:text-white"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-900 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <form onSubmit={handleLogin}>
              <label
                className="block mb-2 text-sm font-medium text-blue-500"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:border-blue-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                required
              />
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-blue-500"
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-blue-500  hover:underline"
                  >
                    Forget Password?
                  </a>
                </div>

                <input
                  id="loggingPassword"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:border-blue-300 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-400"
                  type="password"
                  required
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4285F4] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center mt-4">
            {/* <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> */}
            <Link to="/SignUp">
              <button className="text-xs text-gray-700 uppercase dark:text-gray-400 hover:underline">
                Don't have an account ? sign up
              </button>
            </Link>
            {/* <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
