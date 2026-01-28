require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { PORT, NODE_ENV } = require("./config/constants");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const seedDatabase = require("./scripts/seedDatabase");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cityRoutes = require("./routes/cityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const routesRoutes = require("./routes/routesRoutes");
const aiRoutes = require("./routes/aiRoutes");

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
      dashboard: "/api/dashboard/:city",
      routes: "/api/routes/:city",
      ai: "/api/ai/query",
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/routes", routesRoutes);
app.use("/api/ai", aiRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Seed database
    await seedDatabase();
    
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
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
