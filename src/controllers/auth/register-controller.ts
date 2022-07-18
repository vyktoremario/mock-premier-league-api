import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateToken } from "../../utils/auth";
import ResponseStatus from "../../utils/response";

const responseStatus = new ResponseStatus();

export const registerUserController = async function (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email, password, firstName, lastName, roles, gender } =
      req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      responseStatus.setError(409, "user exist");
      return responseStatus.send(res);
    }

    const newUser = new UserModel({
        email: email.toLowerCase(),
        password,
        firstName,
        lastName,
        gender,
        roles
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    responseStatus.setSuccess(201, "successful", { data: newUser, token });
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(401, "invalid credentials");
    return responseStatus.send(res);
  }
};