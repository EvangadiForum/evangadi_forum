const express = require("express");
// import express from "express";
const router = express.Router();

// GET /api/answer/:question_id
router.get("/api/answer/:question_id", async (req, res) => {
  const { question_id } = req.params;

  // Validate question_id
  if (!question_id) {
    return res.status(400).json({ error: "Invalid question_id" });
  }

  try {
    // Example: fetch question
    const question = await question.findById(question_id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Fetch answers
    const answers = await answers.find({ question_id });

    return res.status(200).json({
      question_id,
      total_answers: answers.length,
      answers
    });

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});


export default router;




// ===== FILE: src/routes/answersRouter.js =====
// import express from "express";
// const router = express.Router();

// // GET /api/questions/:questionId/answers - Get all answers for a question
// router.get("/", verifyToken, getAnswers);

// // GET /api/answers/:id - Get single answer by ID
// router.get("/:id", verifyToken, getAnswerById);

// // POST /api/questions/:questionId/answers - Create new answer for a question
// router.post("/", verifyToken, createAnswer);

// export default router;