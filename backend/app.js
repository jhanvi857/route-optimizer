const express = require("express");
const cors = require("cors");
const router = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});