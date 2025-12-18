// Auth Logic
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // If details are missing
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Missing Credentials" });
    }
    // Hashing password
    const hashedpassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User.create({
      username,
      password: hashedpassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: `User ${username} has been created` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Enter the missing credentials" });
    }
    // find if the user exist in the database
    const ifUser = await User.findOne({ username });
    if (!ifUser) {
      res.status(404).json({ message: `User "${username}" does not exist` });
    }
    const passwordMatch = await bcrypt.compare(password, User.password);
    if (!passwordMatch) {
      res.status(400).json({ message: "Wrong Password" });
    }

    // Generate a token
    const token = jwt.sign(
      { user: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
  } catch (error) {
    res.status(500).json({message: message.error})
  }
};

module.exports= {
    register,
    login
}
