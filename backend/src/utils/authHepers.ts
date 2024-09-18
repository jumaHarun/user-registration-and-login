import { ObjectId } from "mongodb";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config({ path: "../.env" });

const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
  throw new Error("Please set your JWT_SECRET_KEY in the .env file.");
}

export const generateAccessToken = (userId: ObjectId) => {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (userId: ObjectId) => {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });
};
