import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from "./Login";
import About from './About';
import Home from './Home';
import SignUp from './SignUp';
import SavedRoutes from './SavedRoutes';
import AddRoute from './addRoute';
import CTA from './CTA';
import Settings from './Settings';
import { useState, useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
    
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

  }, []);

  const applyTheme = (themeValue) => {
  setTheme(themeValue);
  localStorage.setItem("theme", themeValue);

  if (themeValue === "dark") {
    document.documentElement.classList.add("dark");
  } else if (themeValue === "light") {
    document.documentElement.classList.remove("dark");
  } else if (themeValue === "system") {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (systemDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }
};


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setShowMenu(false);
    navigate("/");
  };

  return (
    <>
      <nav className=" text-white relative z-30" data-aos="fade-down">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">RouteOptimizer</Link>

          {/* Mobile menu..*/}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* nav links.*/}
          <div className="hidden md:flex justify-evenly gap-6 items-center">
            <Link to="/home" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition duration-300 hover:-translate-y-1 hover:scale-110">
              Home
            </Link>
            <Link to="/about" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition duration-300 hover:-translate-y-1 hover:scale-110">
              About
            </Link>
            <Link to="/SavedRoutes" className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition duration-300 hover:-translate-y-1 hover:scale-110">
              Saved Routes
            </Link>
          </div>

          {/* login or user. */}
          <div className="hidden md:flex items-center">
            {userEmail ? (
              // USER AVATAR CIRCLE
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 rounded-full border border-white text-white font-bold flex items-center justify-center text-lg"
                >
                  {userEmail.charAt(0).toUpperCase()}
                </button>

                {showMenu && (
                  <div className="bg-white absolute right-0 mt-2 w-40  text-black shadow-lg rounded-md p-2 z-50">
                    <Link
                      to="/SavedRoutes"
                      className="block px-3 py-2 hover:bg-gray-200 rounded"
                      onClick={() => setShowMenu(false)}
                    >
                      Saved Routes
                    </Link>

                    <Link
                      to="/settings"
                      className="block px-3 py-2 hover:bg-gray-200 rounded"
                      onClick={() => setShowMenu(false)}
                    >
                      Settings
                    </Link>

                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // When user NOT logged in
              <div className="flex gap-6 items-center">
                <Link to="/signup">
                  <button className=" text-blue-500 px-4 py-1.5 rounded-md font-medium transition hover:-translate-y-1.5 hover:scale-110 shadow">
                    Sign Up
                  </button>
                </Link>

                <Link to="/login">
                  <button className=" text-blue-500 px-4 py-1.5 rounded-md font-medium transition hover:-translate-y-1.5 hover:scale-110 shadow">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* mobile dropdown */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3">

            <Link to="/home" className="block hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block hover:underline" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/SavedRoutes" className="block hover:underline" onClick={() => setIsOpen(false)}>Saved Routes</Link>

            {!userEmail ? (
              <>
                <Link to="/signup">
                  <button className="w-full  text-blue-500 px-4 py-2 rounded-md mt-2">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full  text-blue-500 px-4 py-2 rounded-md">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-white mt-3">
                  Logged in as <b>{userEmail}</b>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full  text-blue-500 px-4 py-2 rounded-md mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<CTA />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/SavedRoutes' element={<SavedRoutes />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route path='/signup' element={<SignUp setUserEmail={setUserEmail}/>} />
        <Route path='/settings' element={<Settings applyTheme={applyTheme} theme={theme} />} />
        <Route path='/addRoute' element={<AddRoute />} />
      </Routes>

      {/* footer. */}
      <footer className="bg-blue-600 text-white py-10">
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
  );
}

export default App;
