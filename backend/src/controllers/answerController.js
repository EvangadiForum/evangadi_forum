import { db } from "../config/db.js";
export const postAnswer = async (req, res) => {
  const { questionId, answer } = req.body;
  await db.query(
    "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
    [questionId, req.user.id, answer]
  );
  res.json({ msg: "Answer posted" });
};
export const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  const [rows] = await db.query(
    `SELECT a.answer, u.username 
     FROM answers a
     JOIN users u ON a.user_id = u.id
     WHERE a.question_id = ?
     ORDER BY a.created_at ASC`,
    [questionId]
  );
  res.json(rows);
};


// git checkout main
// git pull origin main
// git checkout Your Branch
// git merge main

// git add .
// git commit -m "Your message"
// git push origin Your branch
