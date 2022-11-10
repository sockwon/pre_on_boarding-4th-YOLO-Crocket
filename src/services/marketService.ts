/**
 * Module dependencies.
 */
import marketDao from "../models/marketDao";
import { Market, getListInput } from "../interfaces/IMarket";
import Joi from "joi";

//상품 상세보기 validation 스키마 작성
const schemaGetProduct = Joi.object({
  productId: Joi.string().required(),
});

//상품 리스트 검색 validation 스키마 작성
const schemaGetList = Joi.object({
  category: Joi.string(),
  nation: Joi.string(),
  inputText: Joi.string(),
  sortType: Joi.string(),
});

//테스트를 위해 만든 마켓 등록
const createMarket = async (data: Market) => {
  await marketDao.createMarketDao(data);
};

//상품 상세보기
const getProduct = async (productId: string) => {
  //validation test
  await schemaGetProduct.validateAsync({ productId });

  const result = await marketDao.getProductDao(productId);
  return result;
};

//상품 리스트 검색
const getList = async (data: getListInput) => {
  //validation test
  await schemaGetList.validateAsync(data);

  return await marketDao.getListDao(data);
};

/**
 * Module exports.
 * @public
 */

export default { createMarket, getProduct, getList };
