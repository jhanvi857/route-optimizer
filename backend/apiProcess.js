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
