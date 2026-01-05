import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.js";

const app = express();
const port = import.meta.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
