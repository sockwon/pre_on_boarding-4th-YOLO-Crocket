/**
 * Module dependencies.
 */
import dotenv from "dotenv";
dotenv.config();

import marketService from "../services/marketService";
import { Request, Response } from "express";

//테스트에 필요한 마켓을 제작하는 컨트롤러. 데이터 유출입을 담당함.
const marektCreateControll = async (req: Request, res: Response) => {
  const { nation, product_id } = req.body;
  const data = { nation, product_id };
  await marketService.createMarket(data);
  res.status(201).json({ message: "success" });
};

//상품 상세보기 컨트롤러. 데이터 유출입을 담당함.
const getProductControll = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await marketService.getProduct(productId);

  res.status(200).json({ result });
};

//상품 리스트 검색 컨트롤러. 데이터 유출입을 담당함.
const getListControll = async (req: Request, res: Response) => {
  const { inputText, category, nation, sortType, page } = req.query;

  const data = {
    inputText: JSON.stringify(inputText),
    category: JSON.stringify(category),
    nation: JSON.stringify(nation),
    sortType: JSON.stringify(sortType),
    page: JSON.stringify(page),
  };

  const result = await marketService.getList(data);
  res.status(200).json({ result });
};

/**
 * Module exports.
 * @public
 */
export default { marektCreateControll, getProductControll, getListControll };
