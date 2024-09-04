import express from "express";
import { connectToDatabase } from "../config/database.ts";

export const createTestApp = async () => {
  const app = express();

  await connectToDatabase();

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  return app;
};
