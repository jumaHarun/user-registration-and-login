import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/Users.ts";
import { hashPassword, isUserPassword } from "../utils/databaseHelpers.ts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authHepers.ts";

config();

const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
  throw new Error("Please set your JWT_SECRET_KEY in the .env file.");
}

const saltOrRounds = 10;

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next) => {
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

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .json({ message: `User registered successfully`, user: newUser });

    // For Production
    // res
    // .status(201)
    // .cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/",
    //   domain: "localhost",
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // })
    // .header("Authorization", `Bearer ${accessToken}`)
    // .json({ message: `User registered successfully`, user: newUser });

    next();
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Please provide an email address" });
      return;
    }
    if (!password) {
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

    // Generate and save tokens to local storage
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .json({
        message: "Login successful",
        accessToken: accessToken,
        refreshToken,
      });
    next();
  }
);

export const refresh = asyncHandler(
  async (req: Request, res: Response, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res
        .status(401)
        .json({ message: "Access Denied. No refresh token provided" });
      return;
    }

    const decoded = <jwt.UserIdJwtPayload>jwt.verify(refreshToken, jwtSecret);

    const accessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    res
      .status(200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .json({ accessToken: accessToken, refreshToken: newRefreshToken });
  }
);
