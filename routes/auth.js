import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/DB.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

const router = express.Router();

//* POST /api/user/register

router.post("/user/register", async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Password must be at least 8 characters",
    });
  }

  const checkUserQuery =
    "SELECT * FROM userTable WHERE email = ? OR username = ?";

  db.query(checkUserQuery, [email, username], async (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }

    if (result.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: "User already existed",
      });
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
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred.",
          });
        }

        return res.status(201).json({
          message: "User registered successfully",
        });
      }
    );
  });
});

//* POST /api/user/login

router.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  const getUserQuery = "SELECT * FROM userTable WHERE email = ?";

  db.query(getUserQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userid: user.user_id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  });
});

//* GET /api/user/checkUser

router.get("/user/checkUser", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Valid user",
    username: req.user.username,
    userid: req.user.userid,
  });
});

export default router;
