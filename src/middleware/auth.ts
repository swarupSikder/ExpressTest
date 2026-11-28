import { NextFunction, Request, Response } from "express";

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
    next();
}

export default auth;