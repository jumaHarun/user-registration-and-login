import { MongoClient, Db, Collection } from "mongodb";
import { config } from "dotenv";

config({ path: "../.env" });

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
}
const client = new MongoClient(uri);

const dbName = "userAuth";
let db: Db;

export const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);

    console.log(`Connected to the ${dbName} database.`);
  } catch (error) {
    console.error(`Error connecting to database:\n${error}`);
  }
};

export const getDB = async (): Promise<Db> => {
  if (db == undefined) {
    await connectToDB();
  }
  return db;
};
