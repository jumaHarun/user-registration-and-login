import express from "express";
import { connectToDB } from "../config/database.ts";

export const createTestApp = async () => {
  const app = express();

  await connectToDB();

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  return app;
};
