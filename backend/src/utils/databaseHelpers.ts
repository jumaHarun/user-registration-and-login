import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

// Hash password - return user with hashed password
type THashPassword = (
  password: string,
  saltOrRounds: number
) => Promise<string>;
export const hashPassword: THashPassword = async (password, saltOrRounds) => {
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  return hashedPassword;
};

// Compare password
type TComparePassword = (
  userPassword: string,
  hash: string
) => Promise<boolean>;
export const isUserPassword: TComparePassword = async (userPassword, hash) => {
  const compareResults = await bcrypt.compare(userPassword, hash);

  return compareResults;
};
