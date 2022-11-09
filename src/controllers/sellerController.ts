import dotenv from "dotenv";
dotenv.config();

import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { ProductInputDTO } from "../interfaces/IProduct";
import { IVeryfied } from "../interfaces/IToken";
import sellerService from "../services/sellerService";
import { Request, Response } from "express";

const sellerCreateControll = async (req: Request, res: Response) => {
  const { seller_name, account, bank, contact }: SellerInputDTO = req.body;

  const user: IVeryfied = req.body.user;
  const userId: string = user.id;

  const data: Seller = { seller_name, account, bank, contact, userId };

  const result = await sellerService.createSeller(data, user);
  res.status(201).json(result);
};

const productCreateController = async (req: Request, res: Response) => {
  const {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
  }: ProductInputDTO = req.body;

  const sellerId = req.body.user.id;

  const data = {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
    sellerId,
  };

  const result = await sellerService.createProduct(data);
  console.log(result);

  res.status(201).json(result);
};

export default { sellerCreateControll, productCreateController };
