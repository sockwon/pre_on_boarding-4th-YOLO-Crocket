import dotenv from "dotenv";
dotenv.config();

import marketService from "../services/marketService";
import { Request, Response, NextFunction } from "express";

const marektCreateControll = async (req: Request, res: Response) => {
  console.log("here create market");
  const { nation, product_id } = req.body;
  const data = { nation, product_id };
  await marketService.createMarket(data);
  res.status(201).json({ message: "success" });
};

const getProductControll = async (req: Request, res: Response) => {
  console.log("here get product");

  const { productId } = req.params;
  const result = await marketService.getProduct(productId);

  res.status(200).json({ result });
};

export default { marektCreateControll, getProductControll };
