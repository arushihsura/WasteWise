const express = require("express");
const app = express();
app.use(require("cors")());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const cityData = require("./cities.json");
