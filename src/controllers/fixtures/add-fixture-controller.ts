import { Request, Response } from "express";
import { FixtureModel } from "../../models";
import { v4 as uuidV4 } from "uuid";
import ResponseStatus from "../../utils/response";

export const addFixtureController = async (req: Request, res: Response) => {
  const response = new ResponseStatus();
  try {
    const { home_team, away_team } = req.body;
    const fixture = {
      ...req.body,
      fixture: `${home_team} vs ${away_team}`,
      match_link: `${home_team.trim().toLowerCase()}-vs-${away_team
        .trim()
        .toLowerCase()}-${uuidV4()}`,
    };

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
};
