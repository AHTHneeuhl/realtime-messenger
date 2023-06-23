import { Router } from "express";
import { validateForm } from "../controllers/validateForm";

const router = Router();

router.post("/signup", (req, res) => {
  validateForm(req, res);
});

router.post("/signin", (req, res) => {
  validateForm(req, res);
});

export default router;
