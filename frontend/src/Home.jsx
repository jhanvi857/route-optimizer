// import "./App.css";
// import React, { useState } from "react";
// import axios from "axios";
// import MapView from "./MapView";

// function Home() {
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [startCoords, setStartCoords] = useState(null);
//   const [endCoords, setEndCoords] = useState(null);
//   const [routeCoords, setRouteCoords] = useState([]);
//   const API_BASE = import.meta.env.VITE_API_URL;
//   // console.log("API base :",API_BASE);
//   const handleRouteSearch = async () => {
//     try {
//       const startRes = await axios.post(`${API_BASE}/api/geocode`, {
//         location: startLocation,
//       });
//       const endRes = await axios.post(`${API_BASE}/api/geocode`, {
//         location: endLocation,
//       });

//       const start = startRes.data.features[0].geometry.coordinates; 
//       const end = endRes.data.features[0].geometry.coordinates;

//       const startObj = { lat: start[1], lng: start[0] };
//       const endObj = { lat: end[1], lng: end[0] };
//       console.log("Starting object = ",startObj);
//       console.log("Ending object = ",endObj);

//       setStartCoords(startObj);
//       setEndCoords(endObj);

//       const routeRes = await axios.post(`${API_BASE}/api/get-route`, {
//   start: startObj,
//   end: endObj,
// });

// console.log("Route response:", routeRes.data);

// let raw = routeRes.data.route?.features?.[0]?.geometry?.coordinates;
// if (!raw && routeRes.data.features) {
//   raw = routeRes.data.features[0]?.geometry?.coordinates;
// }
// if (!raw && Array.isArray(routeRes.data.route)) {
//   raw = routeRes.data.route;
// }

// if (!raw || !Array.isArray(raw)) {
//   console.error("Invalid route format:", routeRes.data);
//   return;
// }

// const formatted = raw.map(([lng, lat]) => [lat, lng]);
// setRouteCoords(formatted);

//     } catch (err) {
//       console.error("Error getting route:", err);
//     }
//   };

//   return (
//   <>
//     <div className="flex flex-col items-center mt-6 px-4" data-aos="fade-up">
//       <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
//         Find the Best Route in Seconds
//       </h1>
//       <p className="text-gray-600 text-md sm:text-lg text-center mb-4">
//         Enter your source and destination to get the optimized path.
//       </p>

//       <div className="w-full max-w-md space-y-4 mb-6">
//         <input
//           type="text"
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//           className="w-full rounded-lg py-2 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-blue-300"
//           placeholder="Enter your start location."
//         />
//         <input
//           type="text"
//           value={endLocation}
//           onChange={(e) => setEndLocation(e.target.value)}
//           className="w-full rounded-lg py-2 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-blue-300"
//           placeholder="Enter your end location."
//         />
//         <p className="text-sm text-yellow-600 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300 mb-4 text-center">
//           Please wait a few seconds after clicking "Find Route".<br/> The backend may take time to respond initially.<br/> Avoid multiple clicks to prevent hitting the API rate limit. <br/>Some locations might not be supported or available via OpenRouteService. Please try nearby landmarks or main cities.
//         </p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-4 px-4 mb-6">
//         <button
//           className="bg-blue-500 rounded-lg px-4 py-2 text-white text-md hover:bg-blue-600 transition"
//           onClick={handleRouteSearch}
//         >
//           🔍 Find Route
//         </button>
//         <button className="bg-yellow-400 rounded-lg px-4 py-2 text-white text-md hover:bg-yellow-500 transition"
//         onClick={()=>{alert("Feature coming soon!!")}} >
//           🎤 Voice Search
//         </button>
//         <button
//           className="bg-red-600 rounded-lg px-4 py-2 text-white text-md hover:bg-red-700 transition"
//           onClick={() => {
//             setStartLocation("");
//             setEndLocation("");
//             setRouteCoords([]);
//           }}
//         >
//           Clear Input
//         </button>
//       </div>
//     </div>

//     {/* Map container */}
//     <div className="flex justify-center ml-4 mr-4 items-center px-4 mb-10" data-aos="fade-up">
//       <div className="w-full max-w-6xl h-[70vh] rounded-lg shadow-md overflow-hidden">
//         <MapView
//           routeCoords={routeCoords}
//           startCoords={startCoords}
//           endCoords={endCoords}
//         />
//       </div>
//     </div>
//   </>
// );

// }

// export default Home;
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
  const API_BASE = import.meta.env.VITE_API_URL;

  const handleRouteSearch = async () => {
    try {
      const startRes = await axios.post(`${API_BASE}/api/geocode`, {
        location: startLocation,
      });
      const endRes = await axios.post(`${API_BASE}/api/geocode`, {
        location: endLocation,
      });

      const start = startRes.data.features[0].geometry.coordinates;
      const end = endRes.data.features[0].geometry.coordinates;

      const startObj = { lat: start[1], lng: start[0] };
      const endObj = { lat: end[1], lng: end[0] };

      setStartCoords(startObj);
      setEndCoords(endObj);

      const routeRes = await axios.post(`${API_BASE}/api/get-route`, {
        start: startObj,
        end: endObj,
      });

      console.log("Route response:", routeRes.data);

      const raw = routeRes.data.coordinates;

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
      <div className="flex flex-col items-center mt-6 px-4" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-2">
          Find the Best Route in Seconds
        </h1>
        <p className="text-gray-600 text-md sm:text-lg text-center mb-4">
          Enter your source and destination to get the optimized path.
        </p>

        <div className="w-full max-w-md space-y-4 mb-6">
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="w-full rounded-lg py-2 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-blue-300"
            placeholder="Enter your start location."
          />
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            className="w-full rounded-lg py-2 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-blue-300"
            placeholder="Enter your end location."
          />
          <p className="text-sm text-yellow-600 bg-yellow-100 px-4 py-2 rounded-lg border border-yellow-300 mb-4 text-center">
            Please wait a few seconds after clicking "Find Route".<br />
            The backend may take time to respond initially.<br />
            Avoid multiple clicks to prevent hitting the API rate limit. <br />
            Some locations might not be supported or available via OpenRouteService. Please try nearby landmarks or main cities.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 px-4 mb-6">
          <button
            className="bg-blue-500 rounded-lg px-4 py-2 text-white text-md hover:bg-blue-600 transition"
            onClick={handleRouteSearch}
          >
            🔍 Find Route
          </button>
          <button
            className="bg-yellow-400 rounded-lg px-4 py-2 text-white text-md hover:bg-yellow-500 transition"
            onClick={() => {
              alert("Feature coming soon!!");
            }}
          >
            🎤 Voice Search
          </button>
          <button
            className="bg-red-600 rounded-lg px-4 py-2 text-white text-md hover:bg-red-700 transition"
            onClick={() => {
              setStartLocation("");
              setEndLocation("");
              setRouteCoords([]);
            }}
          >
            Clear Input
          </button>
        </div>
      </div>

      {/* Map container */}
      <div className="flex justify-center ml-4 mr-4 items-center px-4 mb-10" data-aos="fade-up">
        <div className="w-full max-w-6xl h-[70vh] rounded-lg shadow-md overflow-hidden">
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
