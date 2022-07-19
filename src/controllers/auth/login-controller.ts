import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models";
import { LogHelper } from "../../utils";
import { generateToken } from "../../utils/auth";
import ResponseStatus from "../../utils/response";

const responseStatus = new ResponseStatus();

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      // eslint-disable-next-line consistent-return
      bcrypt.compare(password, user.password, (err, _) => {
        if (err) {
          responseStatus.setError(401, `${err.message}`);
          return responseStatus.send(res);
        }
      });
      const data = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      responseStatus.setSuccess(200, "success", {
        data,
        token: generateToken(user._id as unknown as string),
      });
      return responseStatus.send(res);
    }
    responseStatus.setError(400, "Invalid Credentials");
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(400, "Invalid Credentials");
    return responseStatus.send(res);
  }
};
