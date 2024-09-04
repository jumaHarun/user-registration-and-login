import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
}
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("connected to MongoDB");
    return client.db();
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
};

export const closeDatabaseConnection = async () => {
  await client.close();
};
