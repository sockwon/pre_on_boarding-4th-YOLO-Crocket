import { Router } from "express";
import userRouter from "./userRouter";
import sellerRouter from "./sellerRouter";
import marketRouter from "./marketRouter";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/seller", sellerRouter);
router.use("/api/v1/market", marketRouter);

export default router;
