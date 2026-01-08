import { db } from "../config/db.js";

export const postAnswer = async (req, res) => {
  const { questionId, answer } = req.body;

  // Validation should come BEFORE database operations
  if (!answer || answer.trim().length === 0) {
    return res.status(400).json({ error: "Answer cannot be empty" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
      [questionId, req.user.id, answer]
    );
    
    res.json({ 
      msg: "Answer posted", 
      answerId: result.insertId 
    });
    
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  
  try {
    const [rows] = await db.query(
      `SELECT a.answer, u.username 
       FROM answers a
       JOIN users u ON a.user_id = u.id
       WHERE a.question_id = ?
       ORDER BY a.created_at ASC`,
      [questionId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};


