import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login";
import About from './About';
import { Link } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SavedRoutes from './SavedRoutes';
import AddRoute from './addRoute';
import CTA from './CTA';
import { useState } from "react";

// bg-[#4285F4]
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">RouteOptimizer</Link>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="hidden md:flex justify-evenly gap-6 items-center">
          <Link to="/home" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">Home</Link>
          <Link to="/about" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">About</Link>
          <Link to="/SavedRoutes" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">Saved Routes</Link>
        </div>
        <div className='hidden md:flex justify-evenly gap-6 items-center'>
          <Link to="/signup">
            <button className="bg-white text-blue-500 px-4 py-1.5 font-medium rounded-md shadow transition transform duration-300 ease-in hover:-translate-y-1.5 hover:scale-110">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-blue-500 px-4 py-1.5 rounded-md font-medium transition transform duration-300 ease-in hover:-translate-y-1.5 hover:scale-110">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/home" className="block hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:underline" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/SavedRoutes" className="block hover:underline" onClick={() => setIsOpen(false)}>Saved Routes</Link>
          <Link to="/signup">
            <button className="w-full mt-2 mb-4 bg-white text-blue-500 px-4 py-2 rounded-md font-medium hover:scale-105 transition">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="w-full bg-white text-blue-500 px-4 py-2 rounded-md font-medium hover:scale-105 transition">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
    
    <Routes>
      <Route path='/' element={< CTA/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/SavedRoutes' element={<SavedRoutes/>}/>
      <Route path="/login" element={< Login />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/addRoute' element={<AddRoute/>} />
    </Routes>
    <footer className="bg-blue-600 text-white py-10">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <div className="mb-4 md:mb-0">
      <h4 className="text-lg font-semibold">RouteSaver</h4>
      <p className="text-sm text-blue-100">Built with ❤️ using React, Tailwind & Node.js</p>
    </div>
    <div className="flex space-x-6">

      <a href="/home" className="hover:underline text-blue-100">Home</a>
      <a href="/about" className="hover:underline text-blue-100">About</a>
      <a href="/login" className="hover:underline text-blue-100">Login</a>
      <a href="https://github.com/jhanvi857/route-optimizer" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-100">GitHub</a>
    </div>
  </div>
</footer>
    </>
  )
}

export default App