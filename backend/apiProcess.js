// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
// const apiKey = process.env.API_KEY;
// if (!apiKey) alert("No api key found !");
// export async function getData(source, destination) {
//   const response = await axios.post(
//     "https:api.openrouteservice.org/v2/directions/driving-car/geojson",
//     {
//       coordinates: [
//         [source.lng, source.lat],
//         [destination.lng, destination.lat],
//       ],
//     },
//     {
//       headers: {
//         Authorization: apiKey,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   console.log(response.data);
//   return response.data;
// }
// backend/services/geocode.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
// console.log("API KEY:", process.env.API_KEY);

export async function geocodeLocation(location) {
  
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${location}`;

  const response = await axios.get(url);
  return response.data;
}
