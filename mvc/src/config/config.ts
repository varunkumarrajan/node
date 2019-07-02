import dotenv from "dotenv";

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.SERVER_PORT;
export const db = process.env.DB;
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbName = process.env.DB_NAME;
export const secretKey = process.env.SECRET_KEY;
export const expiresIn = process.env.EXPIRE_TIME;
export const algorithm = process.env.ALGO;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
