import { IUser } from "../../src/types";

declare global {
  namespace Express {
    interface Request {
      token: string;
      user: IUser;
    }
  }
}
