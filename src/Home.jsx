import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import MapView from "./MapView";

function Home() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const handleRouteSearch = async () => {
    try {
      // Step 1: Geocode locations
      const startRes = await axios.post("http://localhost:5000/api/geocode", {
        location: startLocation,
      });
      const endRes = await axios.post("http://localhost:5000/api/geocode", {
        location: endLocation,
      });

      const start = startRes.data.features[0].geometry.coordinates; // [lng, lat]
      const end = endRes.data.features[0].geometry.coordinates;

      const startObj = { lat: start[1], lng: start[0] };
      const endObj = { lat: end[1], lng: end[0] };
      console.log("Starting object = ",startObj);
      console.log("Ending object = ",endObj);

      setStartCoords(startObj);
      setEndCoords(endObj);

      // Step 2: Get Dijkstra-based route from backend
      const routeRes = await axios.post("http://localhost:5000/api/get-route", {
  start: startObj,
  end: endObj,
});

console.log("Route response:", routeRes.data);

// Try multiple fallback formats based on response structure
let raw = routeRes.data.route?.features?.[0]?.geometry?.coordinates;
if (!raw && routeRes.data.features) {
  raw = routeRes.data.features[0]?.geometry?.coordinates;
}
if (!raw && Array.isArray(routeRes.data.route)) {
  raw = routeRes.data.route;
}

if (!raw || !Array.isArray(raw)) {
  console.error("Invalid route format:", routeRes.data);
  return;
}

const formatted = raw.map(([lng, lat]) => [lat, lng]);
setRouteCoords(formatted);

    } catch (err) {
      console.error("Error getting route:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-4xl font-semibold font-sans mb-2">
          Find the Best Route in Seconds
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          Enter your source and destination to get the optimized path.
        </p>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="inline-block w-lg mb-6 rounded-lg py-1.5 pr-3 pl-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md border border-blue-300"
          placeholder="Enter your start location."
        />
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="inline-block w-lg mb-4 rounded-lg py-1.5 pr-3 pl-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-md border border-blue-300"
          placeholder="Enter your end location."
        />
        <div className="flex flex-wrap justify-evenly gap-x-8 p-2">
          <button
            className="bg-blue-500 rounded-lg px-2 py-2 text-white text-lg hover:bg-blue-600"
            onClick={handleRouteSearch}
          >
            🔍 Find Route
          </button>
          <button className="bg-yellow-400 rounded-lg px-2 py-2 text-white text-lg hover:bg-yellow-500">
            🎤 Voice search
          </button>
          <button
            className="bg-red-600 rounded-lg px-2 py-2 text-white text-lg hover:bg-red-700"
            onClick={() => {
              setStartLocation("");
              setEndLocation("");
              setRouteCoords([]);
            }}
          >
            ❎ Clear Input
          </button>
        </div>
        </div>
        <div className="flex justify-center items-center rounded-2xl mb-4">
          <div className="h-[70vh] w-5xl rounded-lg">
        <MapView
          routeCoords={routeCoords}
          startCoords={startCoords}
          endCoords={endCoords}
        />
      </div>
        </div>
    </>
  );
}

export default Home;
