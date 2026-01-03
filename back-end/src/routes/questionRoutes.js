import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();

// GET /api/questions - Get all questions
router.get("/", verifyToken, getQuestions);

// GET /api/questions/:id - Get single question by ID
router.get("/:id", verifyToken, getQuestionById);

// POST /api/questions - Create new question
router.post("/", verifyToken, createQuestion);

export default router;
