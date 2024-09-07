import express from "express";
import { connectToDB } from "../config/database.ts";
import authRoutes from "../routes/authRoutes.ts";
import { errorHandler } from "../middlewares/errorHandler.ts";

export const createTestApp = async () => {
  const app = express();
  app.use(express.json());

  main();
  async function main() {
    try {
      await connectToDB();
    } catch (error) {
      console.error(error);
      process.exit(1);
    } finally {
    }
  }

  app.use("/api/auth", authRoutes);
  app.use(errorHandler);

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  return app;
};
