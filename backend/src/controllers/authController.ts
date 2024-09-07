import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { getDB } from "../config/database.ts";
import { createUser } from "../repos/userRepo.ts";

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

    const userColl = (await getDB()).collection("users");
    const existingUser = await userColl.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await createUser(email, hashedPassword);

    res.status(201).json({
      message: `User registered successfully with _id ${newUser._id}`,
    });
  }
);
