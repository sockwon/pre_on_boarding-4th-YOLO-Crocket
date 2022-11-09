import { Router } from "express";
import sellerController from "../controllers/sellerController";
import errorHandlerAsync from "../middlewares/errorHandler";
import token from "../middlewares/token";

const router = Router();
router.post(
  "/product",
  errorHandlerAsync(token.auth),
  errorHandlerAsync(sellerController.productCreateControll)
);
router.patch(
  "/product/:productId",
  errorHandlerAsync(token.auth),
  errorHandlerAsync(sellerController.updateProductControll)
);
export default router;
