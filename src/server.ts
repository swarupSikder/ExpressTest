import config from "../config";
import { initDB } from "../db";
import app from "./app";

const main = async () => {
    initDB();

    app.listen(config.port, () => {
        console.log(`Server is running at ${config.port} Port...`)
    })
}

main();