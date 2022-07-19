import { Schema, model } from "mongoose";
import { ITeam } from "../types";

const teamSchema = new Schema<ITeam>(
  {
    full_name: {
      type: String,
      required: true,
    },
    short_name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    coach: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

teamSchema.index({ full_name: "text", short_name: "text", coach: "text" });

export const TeamModel = model<ITeam>("Team", teamSchema);
