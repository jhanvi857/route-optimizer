import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation(); // to get route state
  const navigate = useNavigate();
  const editData = location.state?.editRoute || null;

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail || userEmail === "null") {
      setMsg("❌ Please log in to save a route.");
      return;
    }

    try {
      const url = editData
        ? `http://localhost:5000/api/routes/${editData._id}`
        : "http://localhost:5000/api/routes";
      const method = editData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userEmail,
        }),
      });

      if (res.ok) {
        setMsg(editData ? "✅ Route updated!" : "✅ Route saved!");
        setTimeout(() => navigate("/savedRoutes"), 1200);
      } else {
        const data = await res.json();
        setMsg("❌ Error: " + (data.msg || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error saving/updating route:", err);
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        {editData ? "Edit Route" : "Add New Route"}
      </h2>

      {msg && (
        <p className="mb-4 text-center text-md text-green-500 transition">
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "start", "end", "distance", "duration"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required={["title", "start", "end"].includes(field)}
          />
        ))}

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
          {editData ? "Update Route" : "Save Route"}
        </button>
      </form>
    </div>
  );
}
