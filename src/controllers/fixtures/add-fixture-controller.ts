import { Request, Response } from "express";
import { FixtureModel } from "../../models";
import { IFixture } from "../../types";
import ResponseStatus from "../../utils/response";

export const addFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture: IFixture = req.body;
        const newFixture = await FixtureModel.create(fixture);

        if (newFixture) {
            response.setSuccess(201, "Successful!", {
                payload: newFixture.toJSON(),
            });
            return response.send(res);
        }
        response.setError(400, "Invalid input data");
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error creating fixture");
        return response.send(res);
    }
}