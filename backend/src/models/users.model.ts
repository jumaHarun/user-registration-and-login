import { ObjectId } from "mongodb";
import db from "../utils/database/mongo.conn.ts";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

const collectionName = "users";
const usersCollection = db.collection<User>(collectionName);

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await usersCollection.findOne({ email });
  return user;
};

export const createUser = async (user: User): Promise<User | null> => {
  const results = await usersCollection.insertOne(user);
  return {
    _id: results.insertedId,
    ...user,
  };
};
