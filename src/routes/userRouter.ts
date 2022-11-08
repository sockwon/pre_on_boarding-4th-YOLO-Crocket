import { Router } from "express";
import userController from "../controllers/userController";
import errorHandlerAsync from "../middlewares/errorHandler";

const router = Router();
router.use("/signup", errorHandlerAsync(userController.signup));

export default router;
