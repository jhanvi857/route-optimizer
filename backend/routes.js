import express from "express";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/geocode", async (req, res) => {
  try {
    const { location } = req.body;
    const geoRes = await axios.get(
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${location}`
    );
    res.json(geoRes.data);
  } catch (err) {
    console.error("Error in /geocode:", err.message);
    res.status(500).json({ error: "Geocoding failed" });
  }
});

router.post("/get-route", async (req, res) => {
  try {
    const { start, end } = req.body;
    if (!start?.lng || !end?.lng) {
      return res.status(400).json({ error: "Start or end location is missing" });
    }

    // Example ORS call
    const routeRes = await axios.post(
      `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
      {
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat]
        ]
      },
      {
        headers: {
          Authorization: process.env.API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(routeRes.data);
  } catch (err) {
    console.error("Error in /get-route:", err.message);
    res.status(500).json({ error: "Route fetch failed" });
  }
});

export default router;
