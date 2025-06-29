// // import axios from "axios";
// // import dotenv from "dotenv";
// // dotenv.config();
// // const apiKey = process.env.API_KEY;
// // if (!apiKey) alert("No api key found !");
// // export async function getData(source, destination) {
// //   const response = await axios.post(
// //     "https:api.openrouteservice.org/v2/directions/driving-car/geojson",
// //     {
// //       coordinates: [
// //         [source.lng, source.lat],
// //         [destination.lng, destination.lat],
// //       ],
// //     },
// //     {
// //       headers: {
// //         Authorization: apiKey,
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );
// //   console.log(response.data);
// //   return response.data;
// // }
// // backend/services/geocode.js
// const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();

// const apiKey = process.env.API_KEY;
// // console.log("API KEY:", process.env.API_KEY);

// async function geocodeLocation(location) {
  
//   const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${location}`;

//   const response = await axios.get(url);
//   return response.data;
// }
// module.exports = geocodeLocation;
// apiProcess.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const apiKey = process.env.API_KEY;

router.post("/", async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${location}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("Geocode API error:", err.message);
    res.status(500).json({ error: "Failed to fetch geocode" });
  }
});

module.exports = router;
