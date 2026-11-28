import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../db";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.headers.authorization);
    //1-> Check if the token exists
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorized access detected!!!"
        });
    }

    //2-> Check validity of the token
    const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload;
    // console.log(decode);
    const user = await pool.query(
        `SELECT * FROM users WHERE email=$1;
        `, [decode.email]
    );
    if(user.rowCount === 0){
        res.status(404).json({
            success: false,
            message: "User Not Found!!!"
        });
    }

    if(!user.rows[0].is_active){
        res.status(403).json({
            success: false,
            message: "Forbidden!!!"
        });
    }


    next();
}

export default auth;