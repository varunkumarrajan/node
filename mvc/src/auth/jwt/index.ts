import {NextFunction, Response} from "express";
import jwt from "jsonwebtoken";

import {algorithm, expiresIn, secretKey} from "../../config/config";
import {IUser} from "../../interfaces/user";

export const jwtSignin = (signInData: IUser) => {
    return jwt.sign(
        {
            email: signInData.email,
            username: signInData.usernname,
        },
        secretKey,
        {
            expiresIn
        }/* ,
        (err: any, token: string) => {
            if (err) {
                return {err, status: false};
            }
            if (token) {
                return {token, status: true};
            }
        } */
    );
};

export const jwtVerify = (token: string) => {
    return jwt.verify(token, secretKey , (err: any, decode: any) => {
        if (err) {
            return {err, status: false};
        }
        if (decode) {
            return {decode, status: true};
        }
    });
};

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    // tslint:disable-next-line:no-string-literal
    const bearerHeader: string = req.headers["authorization"];
    // tslint:disable-next-line:no-console
    console.log(bearerHeader);
    if (typeof bearerHeader === "undefined") {
        res.sendStatus(403);
    } else {
        // tslint:disable-next-line:no-string-literal
        req.token = bearerHeader.split(" ")[1];
        next();
    }
};
