import express from "express";

import {verifyToken} from "../../auth/jwt";
import {create, deleteUser, findAll, findOne, singIn, updateUser,  } from "./user.controller";
const userRouter = express.Router();

// Create a new User
userRouter.post("/", create);

// Retrieve all users
userRouter.get("/", verifyToken, findAll);

// Retrieve a single Note with noteId
userRouter.get("/:userId", findOne);

// Update a Note with noteId
userRouter.put("/:userId", updateUser);

// Delete a Note with noteId
userRouter.delete("/:userId", deleteUser);

// Signin user
userRouter.post("/signin", singIn);

export default userRouter;
