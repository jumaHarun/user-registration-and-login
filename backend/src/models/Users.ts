import { Document } from "mongodb";
import db from "../utils/database/mongoConn.ts";

export interface User extends Document {
  email: string;
  password: string;
}

const collectionName = "users";
const usersCollection = db.collection<User>(collectionName);

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return null;
  }

  return user;
};

export const createUser = async (user: User): Promise<User | null> => {
  const results = await usersCollection.insertOne(user);
  if (!results) {
    return null;
  }

  return {
    _id: results.insertedId,
    ...user,
  };
};
