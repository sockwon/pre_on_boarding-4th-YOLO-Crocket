import { Router } from "express";
import marketController from "../controllers/marketController";
import errorHandlerAsync from "../middlewares/errorHandler";

const router = Router();

router.post("/", errorHandlerAsync(marketController.marektCreateControll));
export default router;