import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "../routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api", authRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Evangadi Forum API running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
