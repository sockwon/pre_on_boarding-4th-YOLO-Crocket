import { Seller } from "../interfaces/ISeller";
import { Product } from "../interfaces/IProduct";
import { Market } from "../interfaces/IMarket";
import MarketModel from "../models/Market";
import User from "../models/User";
import ProductModel from "../models/Product";
import SellerModel from "../models/Seller";

const createMarketDao = async (data: Market) => {
  const market = new MarketModel(data);
  await market.save();

  return market;
};

const getProductDao = async (productId: string) => {
  return await ProductModel.findOne({ _id: productId, isdelete: false }).exec();
};

export default { createMarketDao, getProductDao };
