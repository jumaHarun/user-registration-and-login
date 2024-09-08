import { ObjectId, MongoClient } from "mongodb";
import { config } from "dotenv";
import mockUsers from "./mock_users.json";
import { hashPassword } from "../databaseHelpers.ts";

config({ path: "../.env" });

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
} else if (!dbName) {
  throw new Error("Please provide a MongoDB database name in the .env file");
}

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Error connecting to database.\n${err}`);
    process.exit(1);
  });

const db = client.db(dbName);

export const closeClient = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error(`Error closing connection.\n${error}`);
    process.exit(1);
  }
};

export default db;
