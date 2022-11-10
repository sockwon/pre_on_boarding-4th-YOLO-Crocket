import { Router } from "express";
import marketController from "../controllers/marketController";
import errorHandlerAsync from "../middlewares/errorHandler";

const router = Router();

router.get(
  "/product/:productId",
  errorHandlerAsync(marketController.getProductControll)
);

router.post("/", errorHandlerAsync(marketController.marektCreateControll));

router.get("/list", errorHandlerAsync(marketController.getListControll));

export default router;
