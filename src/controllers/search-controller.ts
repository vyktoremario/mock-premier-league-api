import { Request, Response } from "express";
import { FixtureModel, TeamModel } from "../models";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();
export const searchController = async (req: Request, res: Response) => {
  try {
    const { searchValue } = req.params;
    const results = {
      teams: [] as any[],
      fixtures: [] as any[],
    };
    const teams = await TeamModel.find({
      $text: { $search: `${searchValue}` },
    });
    const fixtures = await FixtureModel.find({
      $text: { $search: `${searchValue}` },
    });
    results.fixtures = fixtures;
    results.teams = teams;

    responseStatus.setSuccess(200, "successful", { payload: results });
    return responseStatus.send(res);
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
