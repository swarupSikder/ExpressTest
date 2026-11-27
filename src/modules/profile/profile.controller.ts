import { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.createProfileIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: `Profile Created Successfully...`,
            data: result.rows[0]
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

export const profileController = {
    createProfile
}