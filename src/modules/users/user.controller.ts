import { Request, Response } from "express";
import { userService } from "./user.service";


//-------------------//
//  CREATE NEW USER  //
//-------------------//
const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err?.message,
            error: err,
        });
    }
}

//------------------//
//  SHOW ALL USERS  //
//------------------//
const showAllUser = async (req: Request, res: Response) => {
    try {
        const result  =await userService.showAllUsersFromDB();

        res.status(200).json({
            success: true,
            message: "All Users Displayed Successfully...",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err?.message,
            error: err,
        });
    }
}

//----------------------//
//  SHOW A SINGLE USER  //
//----------------------//
const showSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userService.showSingleUserFromDB(id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `ID: ${id} User Not Found!!!`
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: `ID: ${id} User Displayed Successfully...`,
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



//----------------------//
//  UPDATE SINGLE USER  //
//----------------------//
const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const result = await userService.updateSingleUserFromDB(req.body, id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `ID: ${id} User Not Found!!!`
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: `ID: ${id} User Updated Successfully...`,
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

//------------------------//
//  DELETE A SINGLE USER  //
//------------------------//
const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userService.deleteSingleUserFromDB(id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: `ID: ${id} User Not Found!!!`
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: `ID: ${id} User Deleted Successfully...`,
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



export const userController = {
    createUser,
    showAllUser,
    showSingleUser,
    updateSingleUser,
    deleteSingleUser
}