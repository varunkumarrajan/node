import express from "express";

import {db, dbHost, dbName, dbPassword, dbPort,  dbUsername, port} from "./config/config";
import {connect} from "./db";
import restRoutes from "./rest/routes";
import utility from "./utility";

const app = express();

connect(`${db}://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
utility(app, __dirname);
restRoutes(app);

// Initial app routes show sample message
app.get("/", (req, res) => {
    res.render("index");
});

// Listen server as particular server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});
