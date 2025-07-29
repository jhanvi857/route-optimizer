// const express = require("express");
// const axios = require("axios");
// const dotenv = require("dotenv");
// const graphBuilder = require("./graphBuilder");
// const dijkstra = require("./Dijkstra");
// dotenv.config();

// const router = express.Router();

// router.post("/geocode", async (req, res) => {
//   try {
//     const { location } = req.body;
//     const geoRes = await axios.get(
//       `https://api.openrouteservice.org/geocode/search?api_key=${process.env.API_KEY}&text=${location}`
//     );
//     res.json(geoRes.data);
//   } catch (err) {
//     console.error("Error in /geocode:", err.message);
//     res.status(500).json({ error: "Geocoding failed" });
//   }
// });

// router.post("/get-route", async (req, res) => {
//   try {
//     const { start, end } = req.body;
//     if (!start?.lng || !end?.lng) {
//       return res.status(400).json({ error: "Start or end location is missing" });
//     }

//     // Example ORS call
//     const routeRes = await axios.post(
//       `https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
//       {
//         coordinates: [
//           [start.lng, start.lat],
//           [end.lng, end.lat]
//         ]
//       },
//       {
//         headers: {
//           Authorization: process.env.API_KEY,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     res.json(routeRes.data);
//   } catch (err) {
//     console.error("Error in /get-route:", err.message);
//     res.status(500).json({ error: "Route fetch failed" });
//   }
// });

// module.exports= router;
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const graphBuilder = require("./graphBuilder"); 
const dijkstra = require("./Dijkstra"); 
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

    const coords = routeRes.data.features[0].geometry.coordinates;

    const graph = graphBuilder(coords);

    const startKey = coords[0].join(",");
    const endKey = coords[coords.length - 1].join(",");
    const distances = dijkstra(graph, startKey);

    let path = [endKey];
    let current = endKey;

    while (current !== startKey) {
      let found = false;
      for (let node in graph) {
        if (
          graph[node].some(
            neighbor => neighbor.node === current &&
              distances[node] + neighbor.weight === distances[current]
          )
        ) {
          path.unshift(node);
          current = node;
          found = true;
          break;
        }
      }
      if (!found) break; 
    }

    const optimizedCoords = path.map(key => key.split(',').map(Number));
    res.json({ coordinates: optimizedCoords });

  } catch (err) {
    console.error("Error in /get-route (Dijkstra):", err.message);
    res.status(500).json({ error: "Custom Dijkstra route fetch failed" });
  }
});

module.exports = router;
