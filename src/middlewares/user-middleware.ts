import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

async function verifyUserToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = <any>(
        jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      );
      const user = await UserModel.findById(decoded.id);
      if (!user || user.roles !== 'user') {
        responseStatus.setError(401, "Unauthorized");
        return responseStatus.send(res);
      }
      return next();
    } catch (error) {
      responseStatus.setError(401, "Bearer token is missing");
      return responseStatus.send(res);
    }
  } else {
    responseStatus.setError(401, "Authentication Unsuccessful");
    return responseStatus.send(res);
  }
}
export default verifyUserToken;