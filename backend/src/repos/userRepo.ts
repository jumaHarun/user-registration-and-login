import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/database.ts";

interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string) => {
  const db = await connectToDatabase("userAuth");
  if (!db) {
    throw new Error("Error: Could not get the database.");
  }
  const user = await db.collection<User>("users").findOne({ email });
  return user;
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const db = await connectToDatabase("userAuth");
  if (!db) {
    throw new Error("Could not get the database");
  }
  const result = await db
    .collection<User>("users")
    .insertOne({ email, password });

  return { _id: result.insertedId, email, password };
};
