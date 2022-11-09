import { Router } from "express";
import sellerController from "../controllers/sellerController";
import userController from "../controllers/userController";
import errorHandlerAsync from "../middlewares/errorHandler";
import token from "../middlewares/token";

const router = Router();
router.use("/signup", errorHandlerAsync(userController.signUpControll));
router.use("/login", errorHandlerAsync(userController.logInControll));
router.use(
  "/seller",
  errorHandlerAsync(token.auth),
  errorHandlerAsync(sellerController.sellerCreateControll)
);

export default router;
