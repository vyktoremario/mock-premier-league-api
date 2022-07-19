import { Request, Response } from "express";
import { TeamModel } from "../../models";
import ResponseStatus from "../../utils/response";

export const removeTeamController = async (req: Request, res: Response) => {
  const response = new ResponseStatus();
  try {
    await TeamModel.findByIdAndDelete(req.params.id);
    response.setSuccess(200, "Successful!", {
      payload: null,
    });
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error deleting team");
    return response.send(res);
  }
};
