import { Router } from "express";
import { validateForm } from "../controllers/validateForm";
import {
  getSession,
  handleSignIn,
  handleSignUp,
} from "../controllers/authControllers";

const router = Router();

router.post("/signup", validateForm, handleSignUp);

router.post("/signin", validateForm, handleSignIn);

router.get("/signin", getSession);

export default router;
