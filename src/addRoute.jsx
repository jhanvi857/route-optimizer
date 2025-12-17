import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddRoute() {
  const [formData, setFormData] = useState({
    title: "",
    stops: ["", ""], 
    distance: "",
    duration: "",
    mode: "Driving",
  });
  const API_BASE = import.meta.env.VITE_API_URL;

  const [msg, setMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.editRoute || null;

  useEffect(() => {
    if (editData) {
      if (editData.stops && Array.isArray(editData.stops)) {
        setFormData({ ...editData });
      } else {
        setFormData({
          ...editData,
          stops: [editData.start || "", editData.end || ""],
        });
      }
    }
  }, [editData]);

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedStops = [...formData.stops];
      updatedStops[index] = e.target.value;
      setFormData((prev) => ({ ...prev, stops: updatedStops }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const addStop = () => {
    setFormData((prev) => ({
      ...prev,
      stops: [...prev.stops.slice(0, -1), "", prev.stops[prev.stops.length - 1]],
    }));
  };

  const removeStop = (index) => {
    if (formData.stops.length <= 2) return; 
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail || userEmail === "null") {
      setMsg(" Please log in to save a route.");
      return;
    }

    try {
      const url = editData
        ? `${API_BASE}/api/routes/${editData._id}`
        : `${API_BASE}/api/routes`;
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
        setMsg(editData ? " Route updated!" : " Route saved!");
        setTimeout(() => navigate("/savedRoutes"), 1200);
      } else {
        const data = await res.json();
        setMsg(" Error: " + (data.msg || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error saving/updating route:", err);
      setMsg(" Server error");
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
        <InputField
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        {formData.stops.map((stop, index) => (
          <div key={index} className="flex gap-2 items-center">
            <InputField
              name={`stop-${index}`}
              value={stop}
              onChange={(e) => handleChange(e, index)}
              placeholder={
                index === 0
                  ? "Start location"
                  : index === formData.stops.length - 1
                  ? "End location"
                  : `Stop ${index}`
              }
              required
            />
            {index !== 0 && index !== formData.stops.length - 1 && (
              <button
                type="button"
                className="px-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => removeStop(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addStop}
          className="w-full py-2 border border-dashed border-gray-300 rounded-md hover:bg-gray-100"
        >
          + Add Stop
        </button>

        <InputField
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          placeholder="Distance (km)"
        />
        <InputField
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
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
          {editData ? "Update Route" : "Save Route"}
        </button>
      </form>
    </div>
  )
}
const InputField = ({ name, value, onChange, placeholder, required = false }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
  />
);
