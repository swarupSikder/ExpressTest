import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

//------------------//
//  USER SUB-ROUTE  //
//------------------//
//-/api/v1/users
router.post("/", userController.createUser);
router.get("/", auth, userController.showAllUser);
router.get("/:id", userController.showSingleUser);
router.put("/:id", userController.updateSingleUser);
router.delete("/:id", userController.deleteSingleUser);

export const userRoute = router;