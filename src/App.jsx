import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from "../app/login/page"
import About from '../app/about/page';
import Home from '../app/page';
import SignUp from '../app/signup/page';
import SavedRoutes from '../app/saved-routes/page';
import AddRoute from './addRoute';
import CTA from '../app/CTA/page';
import Settings from './Settings';
import HowItWorks from "../app/how-it-works/page"
import { useState, useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import {Toaster} from "../components/ui/toaster"
import {Navbar} from "../components/navbar"
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
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<CTA />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/SavedRoutes' element={<SavedRoutes />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route path='/signup' element={<SignUp setUserEmail={setUserEmail}/>} />
        <Route path='/settings' element={<Settings applyTheme={applyTheme} theme={theme} />} />
        <Route path='/addRoute' element={<AddRoute />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
      </Routes>

      {/* footer. */}
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
  );
}

export default App;
