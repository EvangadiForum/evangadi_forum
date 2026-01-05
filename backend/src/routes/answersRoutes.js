// const express = require("express");
import express from "express";
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
    const question = await Question.findById(question_id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Fetch answers
    const answers = await Answer.find({ question_id });

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

module.exports = answersRouter;
