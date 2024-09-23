import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const jwtSecret = process.env.JWT_SECRET_KEY;
if (!jwtSecret) {
  throw new Error("Please set your JWT_SECRET_KEY in the .env file.");
}

interface IMyRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export const authenticateToken = (
  req: IMyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ message: "No token provided. Authorization denied." });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    req.user = decodedToken;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Invalid token. Authorization denied.", error: err });
  }
};
