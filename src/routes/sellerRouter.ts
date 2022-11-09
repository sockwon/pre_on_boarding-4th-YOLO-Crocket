import { Router } from "express";
import sellerController from "../controllers/sellerController";
import errorHandlerAsync from "../middlewares/errorHandler";
import token from "../middlewares/token";

const router = Router();
router.use(
  "/product",
  errorHandlerAsync(token.auth),
  errorHandlerAsync(sellerController.productCreateController)
);
export default router;
