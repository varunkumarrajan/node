import logger from "morgan";

export const log = (app: any) => {
    app.use(logger("dev"));
};
