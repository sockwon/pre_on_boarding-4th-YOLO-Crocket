/**
 * Module dependencies.
 */
import dotenv from "dotenv";
dotenv.config();

import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { ProductInputDTO, ProductUpdate } from "../interfaces/IProduct";
import { IVeryfied } from "../interfaces/IToken";
import sellerService from "../services/sellerService";
import { Request, Response } from "express";
import { erorrGenerator } from "../middlewares/errorGenerator";

//컨트롤러는 데이터를 유입, 유출한다. 사용자가 셀러로 등록할 때 사용하는 함수
const sellerCreateControll = async (req: Request, res: Response) => {
  const { seller_name, account, bank, contact }: SellerInputDTO = req.body;

  const user: IVeryfied = req.body.user;
  const userId: string = user.id;

  const data: Seller = { seller_name, account, bank, contact, userId };

  const result = await sellerService.createSeller(data, user);
  res.status(201).json(result);
};

//컨트롤러는 데이터를 유입, 유출한다. 셀러가 상품을 등록할 때 사용하는 함수
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

  //modifiedCount 값은 영향을 받은 콜렉션의 개수. 없다면 0이다.
  if (result.modifiedCount) {
    res.status(201).json({ result, message: "success" });
  } else {
    erorrGenerator(500);
  }
};

//컨트롤러는 데이터를 유입, 유출한다. 셀러가 상품을 수정할 때 사용하는 함수
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

//컨트롤러는 데이터를 유입, 유출한다. 셀러가 상품을 삭제할 때 사용하는 함수
const softDeleteControll = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { id } = req.body.user;
  await sellerService.softDeleteProduct(productId, id);

  res.status(204).end();
};

/**
 * Module exports.
 * @public
 */
export default {
  sellerCreateControll,
  productCreateControll,
  updateProductControll,
  softDeleteControll,
};
