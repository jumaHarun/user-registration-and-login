import express from "express";
import { registerUser } from "src/controllers/authController.ts";

const router = express.Router();

router.post("/register", registerUser);

export default router;
