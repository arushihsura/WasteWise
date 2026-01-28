const express = require("express");
const cityData = require("../cities.json");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all cities
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: cityData,
  });
});

// Get specific city
router.get("/:cityName", (req, res) => {
  const cityName = req.params.cityName;
  const city = cityData[cityName];

  if (city) {
    res.json({
      success: true,
      data: { name: cityName, ...city },
    });
  } else {
    res.status(404).json({
      success: false,
      error: "City not found",
    });
  }
});

module.exports = router;
