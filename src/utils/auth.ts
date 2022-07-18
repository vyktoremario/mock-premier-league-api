import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = function (userId: Types.ObjectId): string {
  return jwt.sign({ id: userId, }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "20d",
  });
};