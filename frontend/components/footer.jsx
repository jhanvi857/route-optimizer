import React from "react";
import { Link } from "react-router-dom";
export function Footer() {
    return(
        <>
        <footer className="bg-blue-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h4 className="text-white text-lg font-semibold">RouteSaver</h4>
            <p className="text-sm text-blue-100">Built with ❤️ using React, Tailwind & Node.js</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/home" className="hover:underline text-blue-100">Home</Link>
            <Link to="/about" className="hover:underline text-blue-100">About</Link>
            <Link to="/login" className="hover:underline text-blue-100">Login</Link>
            <a href="https://github.com/jhanvi857/route-optimizer" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-100">GitHub</a>
          </div>
        </div>
      </footer>
        </>
    )
}