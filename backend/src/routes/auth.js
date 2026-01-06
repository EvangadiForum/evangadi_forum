import express from "express";
import { register, login, checkUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkUser", requireAuth, checkUser);

export default router;
