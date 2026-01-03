import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/DB.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

const router = express.Router();

// * POST /api/register

router.post("/register", async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUserQuery =
    "SELECT * FROM userTable WHERE email = ? OR username = ?";

  db.query(checkUserQuery, [email, username], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO userTable 
      (username, first_name, last_name, email, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertUserQuery,
      [username, first_name, last_name, email, hashedPassword],
      (err) => {
        if (err)
          return res.status(500).json({ message: "User creation failed" });

        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    );
  });
});

// * POST /api/login

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const getUserQuery = "SELECT * FROM userTable WHERE email = ?";

  db.query(getUserQuery, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  });
});


//  * GET /api/checkUser

router.get("/checkUser", authMiddleware, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
});

export default router;
