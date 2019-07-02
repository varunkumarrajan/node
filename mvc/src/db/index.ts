import mongoose from "mongoose";

export const connect = (url: string) => {
    mongoDB(url as string);
};

const mongoDB = (url: string) => {
    // create mongoose promise
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
        useNewUrlParser: true
    }).then(() => {
        // tslint:disable-next-line:no-console
        console.log("Successfully connected to the database");
    }).catch((err: Error) => {
        // tslint:disable-next-line:no-console
        console.log(err.message);
        process.exit();
    });
};
