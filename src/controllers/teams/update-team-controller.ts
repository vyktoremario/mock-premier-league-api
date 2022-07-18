import { Request, Response } from 'express';
import { TeamModel } from "../../models";
import ResponseStatus from "../../utils/response";


export const updateTeamController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const updatedTeam = await TeamModel.findByIdAndUpdate(req.params.id, req.body);
        if (updatedTeam) {
            response.setSuccess(200, "Successful!", {
                payload: updatedTeam.toJSON(),
            });
            return response.send(res);
        }
        response.setError(404, "Team not found");
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error updating team");
        return response.send(res);
    }
}