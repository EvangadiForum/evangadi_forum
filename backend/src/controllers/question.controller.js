import express from "express";

const router = express.Router();

// GET /api/question - Fetch all questions
router.get("/api/question", async (req, res) => {
  try {
    // Fetch all questions from database
    const questions = await Question.find();

    // Send response
    return res.status(200).json({
      total_questions: questions.length,
      questions: questions,
    });
  } catch (error) {
    // Handle server error
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
