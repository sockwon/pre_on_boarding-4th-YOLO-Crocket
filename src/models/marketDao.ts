import { Seller } from "../interfaces/ISeller";
import { Product } from "../interfaces/IProduct";
import { Market, getListInput } from "../interfaces/IMarket";
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

const getListDao = async (data: getListInput) => {
  if (data.inputText !== undefined) {
    data.inputText = JSON.parse(data.inputText);
  }

  if (data.nation !== undefined) {
    data.nation = JSON.parse(data.nation);
  }

  if (data.category !== undefined) {
    data.category = JSON.parse(data.category);
  }
  const name = data.inputText || "";
  const na = data.nation || "";
  const ca = data.category || "";

  console.log("name:", name, "na:", na, "ca:", ca);

  return await ProductModel.aggregate()
    .match({ isdelete: false })
    .match({ product_name: { $regex: name } })
    .match({ nation: { $regex: na } })
    .match({ category: { $regex: ca } })
    .sort({ updated_at: -1 })
    .exec();
};

export default { createMarketDao, getProductDao, getListDao };
