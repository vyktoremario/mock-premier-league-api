import { Request, Response } from "express";
import { UserModel } from "../../models";
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
      const user = await UserModel.findOne({ email });
      if (user && (await user.isPasswordMatch(password))) {
        const data = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          roles: user.roles
        };
        responseStatus.setSuccess(200, "success", {
          data,
          token: generateToken(user._id),
        });
        return responseStatus.send(res);
      }
      responseStatus.setError(400, "Invalid Credentials");
      return responseStatus.send(res);
    } catch (error) {
      responseStatus.setError(400, "Invalid Credentials");
      return responseStatus.send(res);
    }
  }