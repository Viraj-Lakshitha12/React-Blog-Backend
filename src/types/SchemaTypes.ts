import mongoose, {Schema} from "mongoose";
import {IUser} from "../models/userModel";

export const userSchema: Schema<IUser> = new mongoose.Schema({
    username: { type: String, required: true },
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});