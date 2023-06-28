import { Router } from "express";
import { validateForm } from "../controllers/validateForm";
import pool from "../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  validateForm(req, res);

  const { username, password } = req.body;

  const existingUser = await pool.query(
    "SElECT username FROM users WHERE email = $1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username",
      [username, hashedPassword]
    );
    req.session.user = {
      username,
      id: newUser.rows[0].id,
    };
    res.json({ loggedIn: true, username });
  } else {
    res.json({ loggedIn: false, status: "Username already exists" });
  }
});

router.post("/signin", async (req, res) => {
  validateForm(req, res);

  const { username, password } = req.body;

  const potentialLogin = await pool.query(
    "SELECT id, username, password FROM users WHERE username = $1",
    [username]
  );

  if (potentialLogin.rowCount > 0) {
    const verifiedPassword = await bcrypt.compare(
      password,
      potentialLogin.rows[0].password
    );
    if (verifiedPassword) {
      req.session.user = {
        username,
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username });
    } else {
      res.json({ loggedIn: false, status: "Username does not exist" });
    }
  } else {
    res.json({ loggedIn: false, status: "Username does not exist" });
  }
});

export default router;
