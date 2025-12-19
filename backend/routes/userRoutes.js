// User routes for admin, manager, and user

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Admin routes
router.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

// Manager routes
router.get(
  "/manager",
  verifyToken,
  checkRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome to the Manager Dashboard" });
  }
);

// User routes
router.get(
  "/user",
  verifyToken,
  checkRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome to the User Dashboard" });
  }
);

module.exports = router;
