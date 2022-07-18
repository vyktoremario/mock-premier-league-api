import { Schema, model } from "mongoose";
import { ITeam } from "../types";

const teamSchema =  new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    size:{
        type:Number,
        required:true
    },
    coach:{
        type:String,
        required:true
    }
})

export const TeamModel = model<ITeam>("Team", teamSchema);