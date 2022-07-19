import { Request, Response } from "express";
import { FixtureModel } from "../../models";
import ResponseStatus from "../../utils/response";

export const removeFixtureController = async (req: Request, res: Response) => {
  const response = new ResponseStatus();
  try {
    await FixtureModel.findByIdAndDelete(req.params.id);
    response.setSuccess(200, "Successful!", {
      payload: null,
    });
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error deleting fixture");
    return response.send(res);
  }
};
