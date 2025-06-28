import React, { useState } from "react";

export default function AddRoute() {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    distance: "",
    duration: "",
    mode: "Driving",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
    if (!userEmail || userEmail === "null") {
      setMsg("Please log in to save a route.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userEmail }),
      });

      if (res.ok) {
        setMsg("✅ Route saved successfully!");
        setFormData({
          title: "",
          start: "",
          end: "",
          distance: "",
          duration: "",
          mode: "Driving",
        });
      } else {
        const data = await res.json();
        setMsg("❌ Error: " + (data.msg || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error saving route:", err);
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Add New Route</h2>

      {msg && <p className="mb-4 text-center text-md text-red-500">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Route Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="start"
          placeholder="Start Location"
          value={formData.start}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="end"
          placeholder="End Location"
          value={formData.end}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="distance"
          placeholder="Distance (e.g., 12 km)"
          value={formData.distance}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 30 mins)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option>Driving</option>
          <option>Walking</option>
          <option>Cycling</option>
          <option>Public Transport</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Save Route
        </button>
      </form>
    </div>
  );
}
