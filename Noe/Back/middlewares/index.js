import configMiddleware from "./config-middle.js";

export default (app) => {
    configMiddleware(app);

    // ACA SE AGREGAN OTROS MIDDLE COM AUTH, LOGS...
} 