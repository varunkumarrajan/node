import * as bodyParser from "body-parser";

export const bParser = (app: any) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
};
