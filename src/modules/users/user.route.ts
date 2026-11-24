import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

//-------------------//
//  CREATE NEW USER  //
//-------------------//
//-/api/v1/users
router.post("/", userController.createUser);

export const userRoute = router;