import express from "express";
import cors from "cors";
import helmet from "helmet";
import db from "./database/mongoConn.ts";
import authRoutes from "../routes/authRoutes.ts";
import { errorHandler } from "../middlewares/errorHandler.ts";

export const createTestApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  app.use("/api/auth", authRoutes);
  app.use(errorHandler);

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  return app;
};

export const deleteMany = async () => {
  const res = await db.collection("users").deleteMany({});

  return { deleteCount: res.deletedCount };
};
