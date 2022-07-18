import { Request, Response } from "express";
import { FixtureModel } from "../../models";
import ResponseStatus from "../../utils/response";


export const getAFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture = await FixtureModel.findById(req.params.id);
        if (fixture) {
            response.setSuccess(200, "Successful!", {
                payload: fixture.toJSON(),
            });
            return response.send(res);
        }
        response.setError(404, "Fixture not found");
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting fixture");
        return response.send(res);
    }
}

export const getAllFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture = await FixtureModel.find();
        response.setSuccess(200, "Successful!", {
            payload: fixture,
        });
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting fixture");
        return response.send(res);
    }
}

export const getAllPendingFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture = await FixtureModel.find({ status: "pending" });
        response.setSuccess(200, "Successful!", {
            payload: fixture,
        });
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting fixture");
        return response.send(res);
    }
}

export const getAllCompletedFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture = await FixtureModel.find({ status: "completed" });
        response.setSuccess(200, "Successful!", {
            payload: fixture,
        });
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting fixture");
        return response.send(res);
    }
}

export const getAllCancelledFixtureController = async (req: Request, res: Response) => {
    const response = new ResponseStatus();
    try {
        const fixture = await FixtureModel.find({ status: "cancelled" });
        response.setSuccess(200, "Successful!", {
            payload: fixture,
        });
        return response.send(res);
    } catch (error) {
        response.setError(400, "Error getting fixture");
        return response.send(res);
    }
}