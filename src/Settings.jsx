import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useToast} from "../hooks/use-toast"
export default function Settings() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
//   const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings updated successfully !!",
        description: "",
        variant:"success"
      })
    }, 800);
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 px-4">
      <div className="w-full max-w-2xl  p-8 rounded-xl shadow-lg">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          Account Settings
        </h2>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email*/}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
              value={email}
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
          >
            <Link to="/savedRoutes">View Your Saved Routes</Link>
          </button>
          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Danger Zone */}
        <div className="mt-10 p-4 border border-red-400 rounded-lg bg-red-50">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => {
              if (window.confirm("Do you really want to delete your account?")) {
                alert("Account deletion is not implemented yet.");
              }
            }}
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}
