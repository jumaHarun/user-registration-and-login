import express from "express";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.ts";
import {
  closeDatabaseConnection,
  connectToDatabase,
} from "./config/database.ts";

config();

const app = express();
app.use(express.json());

main().catch((err) => {
  console.error(err);
});
async function main() {
  try {
    await connectToDatabase();
  } finally {
    await closeDatabaseConnection();
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
