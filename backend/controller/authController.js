// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signUp = async function (req, res) {
//   try {
//     const { name, email, password } = req.body;
//     const existUser = await User.findOne({ email });
//     if (existUser) return res.status(400).json({ msg: "User already exists" });

//     const user = await User.create({ name, email, password });

//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     //   expiresIn: "1d",
//     // });
//     res
//       .status(201)
//       .json({ user: { name: user.name, email: user.email } });
//   } catch (err) {
//     console.log("Error : ", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// exports.logIn = async function (req, res) {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid email" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     //   expiresIn: "1d",
//     // });

//     res
//       .status(200)
//       .json({ user: { name: user.name, email: user.email } });
//   } catch (err) {
//     console.error("Error occured", err);
//     res.status(500).json({ msg: "Error !!" });
//   }
// };
const routeSchema = require("../models/routeSchema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.signUp = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ hash
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

    const isMatch = await bcrypt.compare(password, user.password); // ✅ secure comparison
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