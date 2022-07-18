import { Schema, model } from "mongoose";
import { IFixture } from "../types";

const fixtureSchema = new Schema(
    {
        home_team: {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        },
        away_team: {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: "pending"
        },
        match_link: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
)

export const FixtureModel = model<IFixture>("Fixture", fixtureSchema);