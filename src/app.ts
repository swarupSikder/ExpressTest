import express, { Application, Request, Response } from "express";
import { pool } from "../db";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}`;
    fs.appendFile("logger.txt", log, (err) => {
        console.log(err);
    });
    next();
});

//-------------//
//  All ROUTEs //
//-------------//
app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Swarup",
    });
})



export default app;