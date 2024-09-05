import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Emulate __dirname in TypeScript (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../../.env") });

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
}
const client = new MongoClient(uri);

export const connectToDatabase = async (dbName: string) => {
  try {
    await client.connect();
    console.log("connected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
};
