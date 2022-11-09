import dotenv from "dotenv";
dotenv.config();

import marketService from "../services/marketService";
import { Request, Response, NextFunction } from "express";

const marektCreateControll = async (req: Request, res: Response) => {
  const { nation, product_id } = req.body;
  const data = { nation, product_id };
  await marketService.createMarket(data);
  res.status(201).json({ message: "success" });
};

export default { marektCreateControll };
