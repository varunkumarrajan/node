import userRouter from "./users/user.route";

const routes = (app: any) => {
    app.use("/api/users", userRouter);
};

export default routes;
