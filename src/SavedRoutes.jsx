import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SavedRoutes() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this route?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/routes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setRoutes((prev) => prev.filter((route) => route._id !== id));
    } else {
      const data = await res.json();
      console.error("Error deleting route:", data.msg || "Failed");
    }
  } catch (error) {
    console.error("Server error while deleting:", error);
  }
};


  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail || userEmail === "null") {
      setLoading(false);
      return;
    }

    const fetchRoutes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/routes/${userEmail}`);
        if (!res.ok) throw new Error("Failed to fetch routes");
        const data = await res.json();
        setRoutes(data.reverse());
      } catch (error) {
        console.error("Error fetching saved routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-blue-600 text-lg">Loading saved routes...</p>;
  }

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <h2 className="text-3xl font-semibold text-blue-500 text-center p-6">Saved Routes</h2>

      <div className="flex-grow px-4 md:px-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No saved routes found.</p>
          ) : (
            routes.map((route) => (
              <div
                key={route._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-200"
              >
                <h3 className="text-xl font-semibold">{route.title}</h3>
                <p className="text-gray-600 mt-1">
                  <span className="text-lg font-medium">From:</span> {route.start}
                </p>
                <p className="text-gray-600">
                  <span className="text-lg font-medium">To:</span> {route.end}
                </p>
                <div className="mt-3 text-md text-gray-700">
                  <p>🛣️ {route.distance}</p>
                  <p>⏱️ {route.duration}</p>
                  <p>🚀 Mode: {route.mode}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Saved on: {route.savedAt}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
      <button
        onClick={() => navigate("/addRoute", { state: { editRoute: route } })}
        className="px-4 py-1 text-white rounded-xl bg-yellow-400 hover:bg-yellow-600 text-md"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(route._id)}
        className="px-4 py-1 text-white rounded-xl bg-red-500 hover:bg-red-600 text-md"
      >
        Delete
      </button>
    </div>
              </div>
            ))
          )}
        </div>

        <Link to="/addRoute">
          <div className="flex justify-center items-center mt-10">
            <button className="cursor-pointer bg-white border-dashed border-2 border-blue-400 rounded-2xl shadow-sm p-5 hover:shadow-md hover:bg-blue-50 transition-all duration-300">
              <p className="text-4xl text-blue-500 font-bold">+</p>
              <p className="text-lg text-blue-500 mt-2">Add New Route</p>
            </button>
          </div>
        </Link>
      </div>
    </div>
    </>
  );
}
