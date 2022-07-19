import { Schema, model } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, require: true, unique: true },
    first_name: String,
    last_name: String,
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
// hash password
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
  }
});
export const UserModel = model<IUser>("User", userSchema);
