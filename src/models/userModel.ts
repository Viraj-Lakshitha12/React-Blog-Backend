import mongoose, {Schema, Document} from "mongoose";
import {userSchema} from "../types/SchemaTypes";

export interface IUser extends Document {
    username: string;
    f_name: string;
    l_name: string;
    email: string;
    password: string;
}


const userModel: any = mongoose.model<IUser>("User", userSchema);
export default userModel;
