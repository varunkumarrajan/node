import path from "path";

export const viewEngine = (app: any, dir: string) => {
    app.set("views", path.join(dir, "views"));
    app.set("view engine", "ejs");
};
