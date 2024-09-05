import express from "express";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { connectToDatabase } from "./config/database.ts";
import authRoutes from "./routes/authRoutes.ts";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { findUserByEmail } from "./repos/userRepo.ts";

// Emulate __dirname in TypeScript (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../.env") });

const app = express();
app.use(express.json());

main();
async function main() {
  try {
    await connectToDatabase("userAuth");
  } catch (error) {
    console.error(`Error: ${error}`);
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
