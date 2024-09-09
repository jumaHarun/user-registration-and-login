import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/users.model.ts";
import { hashPassword, isUserPassword } from "../utils/databaseHelpers.ts";

config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
  throw new Error("Please set your JWT_SECRET_KEY in the .env file.");
}

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

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await hashPassword(password, saltOrRounds);

    const newUser = await createUser({ email, password: hashedPassword });

    if (!newUser) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: `User registered successfully`,
      user: newUser,
      token,
    });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ message: "Please provide an email address" });
    return;
  } else if (!password) {
    res.status(400).json({ message: "Please provide a password" });
    return;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  const isMatch = await isUserPassword(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
});
