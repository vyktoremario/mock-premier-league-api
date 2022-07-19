import { Request, Response } from "express";
import { TeamModel } from "../../models";
import { ITeam } from "../../types";
import ResponseStatus from "../../utils/response";

export const addTeamController = async (req: Request, res: Response) => {
  const response = new ResponseStatus();
  try {
    const team: ITeam = req.body;
    const newTeam = await TeamModel.create(team);

    if (newTeam) {
      response.setSuccess(201, "Successful!", {
        payload: newTeam.toJSON(),
      });
      return response.send(res);
    }
    response.setError(400, "Invalid input data");
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error creating team");
    return response.send(res);
  }
};
