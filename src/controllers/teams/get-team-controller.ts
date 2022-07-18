import { Request, Response } from 'express';
import { TeamModel } from "../../models";
import ResponseStatus from "../../utils/response";


const response = new ResponseStatus();
export const getATeamController = async (req: Request, res: Response) => {
    try {
        const team = await TeamModel.findById(req.params.id);
        if (team) {
            response.setSuccess(200, "Successful!", {
                payload: team,
            });
            return response.send(res);
        }
        response.setError(404, "Team not found");
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting team");
        return response.send(res);
    }
}

export const getAllTeamController = async (req: Request, res: Response) => {
    try {
        const team = await TeamModel.find();
        response.setSuccess(200, "Successful!", {
            payload: team,
        });
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting team");
        return response.send(res);
    }
}