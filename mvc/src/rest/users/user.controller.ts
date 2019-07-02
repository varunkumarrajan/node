import bcryptjs from "bcryptjs";
import {Request, Response} from "express";

import {jwtSignin, jwtVerify} from "../../auth/jwt";
import User from "./user.model";

// Create and Save a new user
export const create = (req: Request, res: Response) => {
    // Validate request
    if (!req.body.username && !req.body.password && !req.body.email) {
        return res.status(400).send({
            message: "user, password and email can't be empty"
        });
    }

    // Create a user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });

    // Save user in the database
    user.save()
    .then((userData: any) => {
        res.send({status: "success", message: "User Successfully Added", userData});
    }).catch((err: Error) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
export const findAll = async (req: any, res: Response) => {
    const auth: any = await jwtVerify(req.token);
    // tslint:disable-next-line:no-console
    console.log(auth);
    if (!auth.status) {
        res.sendStatus(403);
    } else {
        User.find()
        .then((users: any) => {
                res.status(200).send({users, auth: auth.decode});
        }).catch((err: Error) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
    }
};

// Find a single user with a userId
export const findOne = (req: Request, res: Response) => {
    User.findById(req.params.userId)
    .then((user: any) => {
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch((err: any) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
export const updateUser = (req: Request, res: Response) => {
    // Validate Request
    if (!req.body.username) {
        return res.status(400).send({
            message: "user can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        password: req.body.password,
        username: req.body.username
    }, {new: true})
    .then((user: any) => {
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch((err: any) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
export const deleteUser = (req: Request, res: Response) => {
    User.findByIdAndRemove(req.params.userId)
    .then((user: any) => {
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch((err: any) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
export const singIn = (req: Request, res: Response) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "email can't be empty"
        });
    }
    User.findOne({email: req.body.email})
    .exec()
    .then((user: any) => {
        bcryptjs.compare(req.body.password, user.password , (err: any, userData: any) => {
            if (err) {
                return res.status(401).json({
                    failed: "Unauthorized Access"
                });
            }
            if (userData) {
                const token: string = jwtSignin(user);
                return res.status(200).send({user, token});
            }
       });
    })
    .catch((error: any) => {
       res.status(500).send(error);
    });
 };
