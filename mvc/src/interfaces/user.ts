// mongoose is middleware from mongo to node
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    usernname: string;
    password: string;
    email: string;
}
