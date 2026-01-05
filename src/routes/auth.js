import express from "express";
import { register, login, checkUser } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/checkUser", requireAuth, checkUser);

export default router;
