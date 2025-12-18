const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: `User "${username}" created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const ifUser = await User.findOne({ username });
    if (!ifUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, ifUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: ifUser._id, role: ifUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
