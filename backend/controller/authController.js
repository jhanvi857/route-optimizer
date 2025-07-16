const routeSchema = require("../models/routeSchema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.signUp = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await User.create({ name, email, password: hashedPassword });

    console.log("✅ User saved:", user);
    res.status(201).json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logIn = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log("Incoming login:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found for email:", email);
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      console.log("Invalid password for:", email);
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};