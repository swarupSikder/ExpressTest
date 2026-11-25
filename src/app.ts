import express, { Application, Request, Response } from "express";
import { pool } from "../db";
import { userRoute } from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());

//-------------//
//  MAIN ROUTE //
//-------------//
app.use("/api/v1/users", userRoute);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Swarup",
    });
})



export default app;