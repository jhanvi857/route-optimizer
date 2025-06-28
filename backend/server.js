const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

const routeRoutes = require("./routes/routeRoutes");
app.use("/api/routes", routeRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/routOptimiizer",{useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("MongoDb connected !!"))
    .catch(()=>console.log("Error in connecting mongoDB"));


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})