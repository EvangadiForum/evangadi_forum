import express from "express";
import db from "../config/db.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/answers/:question_id - Get all answers for a specific question
router.get("/:question_id", requireAuth, async (req, res) => {
  try {
    const { question_id } = req.params;

    console.log("=== FETCHING ANSWERS ===");
    console.log("Question ID:", question_id);

    // Validate question_id
    if (!question_id || isNaN(question_id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid question_id",
      });
    }

    // First, check if the question exists
    const [questionRows] = await db.query(
      "SELECT id, title FROM questions WHERE id = ?",
      [question_id]
    );

    if (questionRows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found",
      });
    }

    // Fetch all answers for this question with user information
    const [answerRows] = await db.query(
      `SELECT 
        a.id,
        a.answer,
        a.created_at,
        u.username,
        u.id as user_id
      FROM answers a
      JOIN users u ON a.user_id = u.id
      WHERE a.question_id = ?
      ORDER BY a.created_at DESC`,
      [question_id]
    );

    console.log(" Found answers:", answerRows.length);

    return res.status(200).json({
      question_id: parseInt(question_id),
      question_title: questionRows[0].title,
      total_answers: answerRows.length,
      answers: answerRows,
    });
  } catch (error) {
    console.error(" Error fetching answers:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
});

// POST /api/answers - Create a new answer
router.post("/", requireAuth, async (req, res) => {
  try {
    const { question_id, answer } = req.body;
    const user_id = req.user.id; // From auth middleware

    console.log("=== POSTING ANSWER ===");
    console.log("Question ID:", question_id);
    console.log("User ID:", user_id);

    // Validate input
    if (!question_id || !answer) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide question_id and answer",
      });
    }

    if (answer.trim().length < 10) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Answer must be at least 10 characters long",
      });
    }

    // Check if question exists
    const [questionRows] = await db.query(
      "SELECT id FROM questions WHERE id = ?",
      [question_id]
    );

    if (questionRows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found",
      });
    }

    // Insert the answer
    const [result] = await db.query(
      "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
      [question_id, user_id, answer]
    );

    console.log(" Answer posted, ID:", result.insertId);

    return res.status(201).json({
      message: "Answer posted successfully",
      answer_id: result.insertId,
    });
  } catch (error) {
    console.error(" Error creating answer:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
});

export default router;

// // const express = require("express");
// import express from "express";
// const router = express.Router();

// // GET /api/answer/:question_id
// router.get("/api/answer/:question_id", async (req, res) => {
//   const { question_id } = req.params;

//   // Validate question_id
//   if (!question_id) {
//     return res.status(400).json({ error: "Invalid question_id" });
//   }

//   try {
//     // Example: fetch question
//     const question = await question.findById(question_id);
//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }

//     // Fetch answers
//     const answers = await answers.find({ question_id });

//     return res.status(200).json({
//       question_id,
//       total_answers: answers.length,
//       answers,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       error: "Internal server error",
//     });
//   }
// });

// export default router;
