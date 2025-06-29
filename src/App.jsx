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
function App() {
  return (
    <>
    <nav className='bg-[#4285F4] text-xl text-white h-20 flex justify-between items-center'>
    <div className='flex justify-evenly content-center gap-x-6 px-4 py-4 items-center'>
      <h1 className='text-xl font-bold text-white'>RouteOptimizer</h1>
    <Link to="/home">
    <button className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">
      Home
    </button>
    </Link>
    <Link to="/About">
    <button className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">
      About
    </button>
    </Link>
    <Link to="/SavedRoutes">
    <button className="flex justify-center items-center text-white border border-white rounded-full px-4 py-1.5 text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#4285F4] hover:shadow-md hover:scale-110">
      Saved Routes
    </button>
    </Link>
    </div>
    <div className='px-4 py-4 flex flex-wrap justify-center content-center gap-x-4'>
      <Link to="/signup">
      <button className="bg-white text-blue-500 shadow-lg shadow-cyan-500/50 px-2 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110">
        Sign Up
      </button>
      </Link>
      <Link to="/Login">
      <button className="bg-white text-blue-500 shadow-lg shadow-cyan-500/50 px-2 py-2 rounded-md text-lg font-medium transition transform duration-400 ease-in-out hover:-translate-y-1 hover:scale-110">
        Login
      </button>
      </Link>
    </div>
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