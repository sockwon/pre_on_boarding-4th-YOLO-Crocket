import dotenv from "dotenv";
dotenv.config();

import marketService from "../services/marketService";
import { Request, Response, NextFunction } from "express";
import { Market, getListInput } from "../interfaces/IMarket";

const marektCreateControll = async (req: Request, res: Response) => {
  const { nation, product_id } = req.body;
  const data = { nation, product_id };
  await marketService.createMarket(data);
  res.status(201).json({ message: "success" });
};

const getProductControll = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await marketService.getProduct(productId);

  res.status(200).json({ result });
};

const getListControll = async (req: Request, res: Response) => {
  const { inputText, category, nation } = req.query;

  const data = {
    inputText: JSON.stringify(inputText),
    category: JSON.stringify(category),
    nation: JSON.stringify(nation),
  };

  const result = await marketService.getList(data);
  res.status(200).json({ result });
};

export default { marektCreateControll, getProductControll, getListControll };
