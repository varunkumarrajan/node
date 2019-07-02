import {bParser} from "./body-parser";
import {enableCors} from "./cors";
import {log} from "./logger";
import {viewEngine} from "./view-engine";

const utility = (app: any, dir: string) => {
    bParser(app);
    enableCors(app);
    log(app);
    viewEngine(app, dir);
};
export default utility;
