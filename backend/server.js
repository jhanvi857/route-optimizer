const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware...
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://route-optimizer-one.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// MongoDB connection...
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting MongoDB:", err));

// Routes...
const authRoutes = require("./routes/authRoutes");
const routeRoutes = require("./routes/routeRoutes");
const geocodeRoutes = require("./apiProcess"); 
const apiRoutes = require("./routes"); 

app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/geocode", geocodeRoutes); 
app.use("/api", apiRoutes); 

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
