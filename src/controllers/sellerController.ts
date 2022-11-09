import dotenv from "dotenv";
dotenv.config();

import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { ProductInputDTO, ProductUpdate } from "../interfaces/IProduct";
import { IVeryfied } from "../interfaces/IToken";
import sellerService from "../services/sellerService";
import { Request, Response } from "express";
import { erorrGenerator } from "../middlewares/errorGenerator";

const sellerCreateControll = async (req: Request, res: Response) => {
  const { seller_name, account, bank, contact }: SellerInputDTO = req.body;

  const user: IVeryfied = req.body.user;
  const userId: string = user.id;

  const data: Seller = { seller_name, account, bank, contact, userId };

  const result = await sellerService.createSeller(data, user);
  res.status(201).json(result);
};

const productCreateControll = async (req: Request, res: Response) => {
  const {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
  }: ProductInputDTO = req.body;

  const userId = req.body.user.id;

  const data = {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
    userId,
  };

  const result = await sellerService.createProduct(data);

  if (result.modifiedCount) {
    res.status(201).json({ message: "success" });
  } else {
    erorrGenerator(500);
  }
};

const updateProductControll = async (req: Request, res: Response) => {
  const {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
  }: ProductUpdate = req.body;

  const data = {
    product_name,
    category,
    price,
    description,
    order_deadline,
    nation,
  };

  const { productId } = req.params;
  const { id } = req.body.user;

  await sellerService.updateProduct(data, productId, id);

  res.status(201).json({ massege: "success" });
};

export default {
  sellerCreateControll,
  productCreateControll,
  updateProductControll,
};
