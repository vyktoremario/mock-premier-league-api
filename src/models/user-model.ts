import { Schema, model } from "mongoose";
import { IUser } from "../types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gender: { type: String, require: true },
    password: {
      type: String,
    },
    roles: { 
        type: String, 
        enum: ['admin','user',], 
        default: 'user' 
    },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};
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
// verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};
export const UserModel = model("User", userSchema);