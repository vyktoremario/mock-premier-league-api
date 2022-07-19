import { Request, Response } from "express";
import { UserModel } from "../../models";
import { IUser } from "../../types";
import { generateToken } from "../../utils/auth";
import ResponseStatus from "../../utils/response";

const responseStatus = new ResponseStatus();

export const registerUserController = async function (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email, password, first_name, last_name, role, username }: IUser =
      req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      responseStatus.setError(409, "user exist");
      return responseStatus.send(res);
    }

    const newUser = new UserModel({
      email: email.toLowerCase(),
      password,
      first_name,
      last_name,
      username,
      role,
    });
    await newUser.save();

    const token = await generateToken(newUser._id as unknown as string);
    responseStatus.setSuccess(201, "successful", { data: newUser, token });
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(401, "invalid credentials");
    return responseStatus.send(res);
  }
};
