import express from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { connectToDB } from "./config/database.ts";
import authRoutes from "./routes/authRoutes.ts";

config({ path: "../.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

main();
async function main() {
  try {
    await connectToDB();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
