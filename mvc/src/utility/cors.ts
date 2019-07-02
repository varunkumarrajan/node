import cors from "cors";

export const enableCors = (app: any) => {
    app.use(cors());
};
