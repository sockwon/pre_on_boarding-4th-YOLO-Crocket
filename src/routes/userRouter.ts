import { Router } from "express";
import userController from "../controllers/userController";
import errorHandlerAsync from "../middlewares/errorHandler";
import token from "../middlewares/token";

const router = Router();
router.use("/signup", errorHandlerAsync(userController.signUpControll));
router.use("/login", errorHandlerAsync(userController.logInControll));

export default router;
