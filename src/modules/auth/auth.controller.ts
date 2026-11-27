import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);

        res.status(200).json({
            success: true,
            message: `User Login Successfully Done...`,
            data: result
        });

    } catch (err: unknown) {
        res.status(500).json({
            success: false,
            message: err instanceof Error
                ? err.message
                : "Internal Server Error"
        });
    }
}

export const authController = {
    loginUser
}