import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const checkUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    req.token = token;
  } else {
    responseStatus.setError(403, "No Token Found");
    return responseStatus.send(res);
  }
  return next();
};

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded = <any>jwt.verify(req.token, JWT_SECRET);
    if (!decoded) {
      responseStatus.setError(400, "Invalid Token");
      return responseStatus.send(res);
    }
    const user = await UserModel.findById(decoded.id);
    if (user) {
      req.user = user;
    }
    return next();
  } catch (error) {
    responseStatus.setError(401, "UnAuthorized");
    return responseStatus.send(res);
  }
};

export const verifyUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    responseStatus.setError(403, "You are not authorized. Contact the Admin");
    return responseStatus.send(res);
  }
  return next();
};
