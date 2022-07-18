import { Request, Response } from 'express';
import { FixtureModel } from "../../models";
import { IFixture } from "../../types";
import ResponseStatus from "../../utils/response";


export const updateFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture: IFixture = req.body;
        const updatedFixture = await FixtureModel.findByIdAndUpdate(req.params.id, fixture);

        if (updatedFixture) {
            response.setSuccess(200, "Successful!", {
                payload: updatedFixture.toJSON(),
            });
            return response.send(res);
        }
        response.setError(400, "Invalid input data");
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error updating fixture");
        return response.send(res);
    }
}