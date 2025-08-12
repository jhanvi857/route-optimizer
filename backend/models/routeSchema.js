const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  title: String,
  start: String,
  end: String,
  distance: String,
  duration: String,
  mode: String,
  userEmail: String,
  savedAt: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toLocaleDateString("en-IN");
    },
  },
});

module.exports = mongoose.model("savedRoute", routeSchema);
