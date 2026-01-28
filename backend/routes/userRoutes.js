const express = require("express");
const { getAllUsers, getUserById } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);

module.exports = router;
