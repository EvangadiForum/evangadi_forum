import express from "express";
import { db } from "../config/db.js"; // Assuming you have a database connection

const app = express();

// GET /api/question - Fetch all questions
app.get("/api/question", async (req, res) => {
  try {
    // For SQL database (MySQL/PostgreSQL)
    const [questions] = await db.query("SELECT * FROM questions");
    
    // OR if you want specific columns
    // const [questions] = await db.query("SELECT id, title, content FROM questions");

    // Send response
    return res.status(200).json({
      total_questions: questions.length,
      questions: questions
    });

  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default app;



// import express from "express";

// const app = express();

// // GET /api/question - Fetch all questions
// app.get("/api/question", async (req, res) => {
//   try {
//     // Fetch all questions from database
//     const questions = await questions.find();

//     // Send response
//     return res.status(200).json({
//       total_questions: questions.length,
//       questions: questions
//     });

//   } catch (error) {
//     // Handle server error
//     return res.status(500).json({
//       error: "Internal server error"
//     });
//   }
// });

// export default app;




// import express from "express";

// const router = express.Router();

// // GET /api/question - Fetch all questions
// router.get("/api/question", async (req, res) => {
//   try {
//     // Fetch all questions from database
//     const questions = await questions.find();

//     // Send response
//     return res.status(200).json({
//       total_questions: questions.length,
//       questions: questions
//     });

//   } catch (error) {
//     // Handle server error
//     return res.status(500).json({
//       error: "Internal server error"
//     });
//   }
// });

// export default router;
