import { Schema, model } from "mongoose";
import { IFixture } from "../types";

const fixtureSchema = new Schema<IFixture>(
  {
    home_team: {
      type: String,
      required: true,
    },
    away_team: {
      type: String,
      required: true,
    },
    fixture: String,
    match_date: String,
    match_link: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

fixtureSchema.index({ home_team: "text", away_team: "text" });

export const FixtureModel = model<IFixture>("Fixture", fixtureSchema);
