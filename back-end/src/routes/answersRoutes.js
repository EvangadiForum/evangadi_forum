import express from "express";
const router = express.Router();

// GET /api/answers/:question_id - Get answers for a specific question
router.get("/:question_id", verifyToken, getAnswersForQuestion);

// POST /api/answers - Post an answer for a question
router.post("/", verifyToken, postAnswer);

export default router;