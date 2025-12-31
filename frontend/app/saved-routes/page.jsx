import { Navbar } from "@//components/navbar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, MapPin, Clock, Route, Eye } from "lucide-react";

export default function SavedRoutes() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/api/routes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRoutes((prev) => prev.filter((route) => route._id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
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
        const res = await fetch(`${API_BASE}/api/routes/${userEmail}`);
        const data = await res.json();
        setRoutes(data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm text-muted-foreground">
        Loading saved routes…
      </p>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-muted/30 px-4 md:px-10 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-700">Saved Routes</h1>
            <p className="text-muted-foreground">
              Quickly access your frequently used routes
            </p>
          </div>

          {/* Empty State */}
          {routes.length === 0 ? (
            <div className="border border-blue-300 rounded-xl p-10 text-center text-muted-foreground">
              No saved routes found. Login or Signup to use this feature.
            </div>
          ) : (
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route._id}
                  className="border border-blue-300 rounded-xl p-5 bg-white hover:shadow-md transition"
                >
                  {/* Title + Actions */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600">
                        {route.title}
                      </h3>

                      {/* start -> stop -> end */}
                      <ul className="mt-1 text-sm text-muted-foreground list-disc ml-4">
                        {route.stops?.map((stop, index) => (
                          <li key={index}>
                            {index === 0 && "Start: "}
                            {index === route.stops.length - 1 && "End: "}
                            {index !== 0 &&
                              index !== route.stops.length - 1 &&
                              `Stop ${index}: `}
                            {stop}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      {/* view on map */}
                      <button
                        onClick={() =>
                          navigate("/home", { state: { stops: route.stops } })
                        }
                        className="p-2 border border-blue-300 rounded-md hover:bg-muted"
                        title="View on Map"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* edit */}
                      <button
                        onClick={() =>
                          navigate("/addRoute", { state: { editRoute: route } })
                        }
                        className="p-2 border border-blue-300 rounded-md hover:bg-muted"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      {/* delete */}
                      <button
                        onClick={() => handleDelete(route._id)}
                        className="p-2 border border-blue-300 rounded-md hover:bg-muted"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* route meta */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600">{route.mode}</span>
                    </div>
                  </div>

                  {/* saved at */}
                  <p className="mt-3 text-xs text-muted-foreground">
                    Saved on:{" "}
                    {route.savedAt
                      ? new Date(route.savedAt).toLocaleString()
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* new route add */}
          <Link to="/addRoute">
            <div className="mt-10 border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:bg-muted transition">
              <div className="text-4xl font-bold text-blue-600">+</div>
              <p className="mt-2 text-sm text-blue-600">Add New Route</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
