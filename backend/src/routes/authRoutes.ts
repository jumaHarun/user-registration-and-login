import express from "express";
import {
  registerUser,
  loginUser,
  refresh,
} from "../controllers/authController.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/refresh", refresh);

export default router;
