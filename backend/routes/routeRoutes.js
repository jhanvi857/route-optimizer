const express = require("express");
const router = express.Router();
const savedRoute = require("../models/routeSchema"); 

router.post("/", async (req, res) => {
  const { title, start, end, distance, duration, mode, userEmail } = req.body;

  try {
    const newRoute = new savedRoute({ title, start, end, distance, duration, mode, userEmail });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(500).json({ msg: "Error saving route" });
  }
});

router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
  console.log("recieved GET req from user",userEmail);

  try {
    const routes = await savedRoute.find({ userEmail });
    console.log("fetching data for..",routes);
    res.json(routes);
  } catch (err) {
    console.error("Error in GET /api/routes/:email", err);
    res.status(500).json({ msg: "Error fetching routes" });
  }
});

router.put("/:id",async (req,res)=> {
  try {
    const updatedata =await savedRoute.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    res.json(updatedata);
  } catch(err) {
    console.log("Error in updating route",err);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await savedRoute.findByIdAndDelete(req.params.id);
    res.json({ msg: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting route" });
  }
});

module.exports = router;
