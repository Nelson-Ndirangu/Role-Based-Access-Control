const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(authRoutes);

// db connection
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("RBAC is up and running...");
});

// Routes
app.use("/api/auth", authRoutes);

// Listening to the port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
