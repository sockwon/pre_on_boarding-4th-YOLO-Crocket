import dotenv from "dotenv";
dotenv.config();

import { SellerInputDTO, Seller } from "../interfaces/ISeller";
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

export default { sellerCreateControll };
