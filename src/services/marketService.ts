import marketDao from "../models/marketDao";
import { Market } from "../interfaces/IMarket";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { Product } from "../interfaces/IProduct";

const createMarket = async (data: Market) => {
  await marketDao.createMarketDao(data);
};

export default { createMarket };
