import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

declare module "jsonwebtoken" {
  export interface UserIdJwtPayload extends jwt.JwtPayload {
    userId: ObjectId;
  }
}
