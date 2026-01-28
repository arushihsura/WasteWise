require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { PORT, NODE_ENV } = require("./config/constants");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cityRoutes = require("./routes/cityRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WasteWise API Server is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      cities: "/api/cities",
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║      WasteWise API Server             ║
╠═══════════════════════════════════════╣
║  Environment: ${NODE_ENV.padEnd(24)}║
║  Port:        ${PORT.toString().padEnd(24)}║
║  URL:         http://localhost:${PORT}    ║
╚═══════════════════════════════════════╝
  `);
});
