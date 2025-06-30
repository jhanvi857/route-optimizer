// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const PORT = 5000;

// const app = express();
// app.use(cors());
// app.use(express.json());

// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth",authRoutes);

// const routeRoutes = require("./routes/routeRoutes");
// app.use("/api/routes", routeRoutes);

// const geocodeRoutes = require("./apiProcess");
// app.use("/api/geocode", geocodeRoutes); // ✅ ADD this line

// mongoose.connect("mongodb://127.0.0.1:27017/routOptimiizer",{useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(()=>console.log("MongoDb connected !!"))
//     .catch(()=>console.log("Error in connecting mongoDB"));


// app.listen(PORT,()=>{
//     console.log(`Server running on PORT ${PORT}`);
// })
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", // 👈 this is required for local dev
    "https://route-optimizer-mwyknbmvc-jhanvi857s-projects.vercel.app" // 👈 production frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Error connecting MongoDB:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
const routeRoutes = require("./routes/routeRoutes");
const geocodeRoutes = require("./apiProcess"); // this should be a router file
const apiRoutes = require("./routes"); // contains /geocode and /get-route

app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/geocode", geocodeRoutes); // POST /api/geocode
app.use("/api", apiRoutes); // POST /api/get-route etc.

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
