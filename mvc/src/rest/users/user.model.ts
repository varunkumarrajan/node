// Password hash
import bcryptjs from "bcryptjs";
// mongoose is middleware from mongo to node
import mongoose from "mongoose";

import {IUser} from "../../interfaces/user";

const saltRounds = 10;
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        required: true,
        trim: true,
        type: String
    },
    password: {
        required: true,
        trim: true,
        type: String
    },
    username: {
        required: true,
        trim: true,
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre<IUser>("save", function(next) {
    this.password = bcryptjs.hashSync(this.password, saltRounds);
    next();
});

export default mongoose.model<IUser>("User", userSchema);
