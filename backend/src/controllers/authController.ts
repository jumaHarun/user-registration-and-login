import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.ts";

const saltOrRounds = 10;

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ message: "Please provide an email address" });
      return;
    } else if (!password) {
      res.status(400).json({ message: "Please provide a password" });
      return;
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }
);
