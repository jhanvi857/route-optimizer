import React from "react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="flex justify-center">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-blue-600 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Track Every Route. Plan Every Journey. Travel Like a Pro.
                </h1>
                <p className="mb-12 text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                  Capture the routes that matter. From daily commutes to long drives, RouteSaver helps you save time and travel smarter.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link to="/login">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 transition transform duration-300 ease-in hover:-translate-y-1.5 hover:scale-110">
                      Log In or Sign Up
                    </button>
                  </Link>
                  <Link to="/home">
                    <button className="bg-white border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-500 hover:text-white transition-transform duration-300 ease-in hover:-translate-y-1.5 hover:scale-110">
                      View Demo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <div className="bg-gray-50 p-4">
        <h1 className="text-3xl font-semibold text-center mt-10 mb-6 text-blue-600">Key Features ✨</h1>
      <div className="grid md:grid-cols-3 gap-8 px-10 md:px-24 mb-12">
        <FeatureCard icon="🚗" title="Save Routes" text="Store frequently used travel routes with distance and duration." />
        <FeatureCard icon="🧭" title="Visualize Navigation" text="Preview your route on a live map with waypoints and direction flow." />
        <FeatureCard icon="📊" title="Optimize Travel" text="Compare modes (driving, walking, cycling) and pick the best one." />
        <FeatureCard icon="🔄" title="Reorder Stops" text="Add multiple locations and reorder them as needed with ease." />
        <FeatureCard icon="📍" title="Geocode Integration" text="Powered by OpenRouteService to get accurate location data." />
        <FeatureCard icon="🌐" title="Cross-Platform" text="Access your saved routes anytime from any device." />
      </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 mt-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">About RouteSaver</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            RouteSaver is your personal route planning assistant built with simplicity and productivity in mind.
            Whether you're a student commuting daily, a traveler mapping out your next trip, or someone who just wants
            to save time — this app is for you. Built using modern tools like React, Tailwind CSS, Node.js and OpenRouteService,
            it's lightweight, fast, and user-friendly.
          </p>
        </div>
      </section>
      {/* feedback form */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-blue-600 mb-4">Got Feedback or Questions?</h2>
    <p className="text-gray-700 mb-6">
      We'd love to hear from you! Send us your thoughts, feedback, or queries below.
    </p>
    <form className="space-y-4 text-left">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-blue-400"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-blue-400"
      />
      <textarea
        rows="4"
        placeholder="Your Message"
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
      >
        Send Message
      </button>
    </form>
  </div>
</section>

      {/* footer */}
    {/* <footer className="bg-blue-600 text-white py-10">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <div className="mb-4 md:mb-0">
      <h4 className="text-lg font-semibold">RouteSaver</h4>
      <p className="text-sm text-blue-100">Built with ❤️ using React, Tailwind & Node.js</p>
    </div>
    <div className="flex space-x-6">

      <a href="/home" className="hover:underline text-blue-100">Home</a>
      <a href="/about" className="hover:underline text-blue-100">About</a>
      <a href="/login" className="hover:underline text-blue-100">Login</a>
      <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-100">GitHub</a>
    </div>
  </div>
</footer> */}

    </>
  );
}

// Reusable FeatureCard component
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">
        {icon} {title}
      </h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
