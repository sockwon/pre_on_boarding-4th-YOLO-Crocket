import marketDao from "../models/marketDao";
import { Market, getListInput } from "../interfaces/IMarket";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { Product } from "../interfaces/IProduct";
import Joi from "joi";

const schemaGetProduct = Joi.object({
  productId: Joi.string().required(),
});

const schemaGetList = Joi.object({
  category: Joi.string(),
  nation: Joi.string(),
  inputText: Joi.string(),
  sortType: Joi.string(),
});

const createMarket = async (data: Market) => {
  await marketDao.createMarketDao(data);
};

const getProduct = async (productId: string) => {
  await schemaGetProduct.validateAsync({ productId });

  const result = await marketDao.getProductDao(productId);
  return result;
};

const getList = async (data: getListInput) => {
  await schemaGetList.validateAsync(data);

  return await marketDao.getListDao(data);
};

export default { createMarket, getProduct, getList };
