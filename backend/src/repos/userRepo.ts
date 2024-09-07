import { ObjectId, MongoClient, Db } from "mongodb";
import { config } from "dotenv";
import { getDB } from "../config/database.ts";

config({ path: "../../../.env" });

// Set up Mongo
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("Please provide a MongoDB URL in the .env file");
}
const client = new MongoClient(uri);
const collectionName = "users";

interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string) => {
  const userColl = await getDB();
  if (!userColl) {
    throw new Error("Could not get the database.");
  }
  const user = await userColl
    .collection<User>(collectionName)
    .findOne({ email });
  return user;
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const db = await getDB();
  if (!db) {
    throw new Error("Could not get the database");
  }
  const result = await db
    .collection<User>(collectionName)
    .insertOne({ email, password });

  return { _id: result.insertedId, email, password };
};

export const deleteMany = async () => {
  const db = await getDB();
  if (!db) {
    throw new Error("Could not get the database");
  }

  const result = await db.collection<User>(collectionName).deleteMany({});

  return { deleteCount: result.deletedCount };
};
