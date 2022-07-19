import jwt from "jsonwebtoken";

export const generateToken = function (userId: string): string {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
