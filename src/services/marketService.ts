import marketDao from "../models/marketDao";
import { Market } from "../interfaces/IMarket";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { Product } from "../interfaces/IProduct";
import Joi from "joi";

const schemaGetProduct = Joi.object({
  productId: Joi.string().required(),
});

const createMarket = async (data: Market) => {
  await marketDao.createMarketDao(data);
};

const getProduct = async (productId: string) => {
  await schemaGetProduct.validateAsync({ productId });

  const result = await marketDao.getProductDao(productId);
  return result;
};

export default { createMarket, getProduct };
