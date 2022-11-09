import { Seller } from "../interfaces/ISeller";
import { Product } from "../interfaces/IProduct";
import Market from "../models/Market";
import User from "../models/User";
import ProductModel from "../models/Product";
import SellerModel from "../models/Seller";

const findMarketByNation = async (nation: string) => {
  return await Market.findOne({ nation: nation }).exec();
};

const findSellerByUserId = async (userId: string) => {
  return await SellerModel.findOne({ userId: userId }).exec();
};

const updateMarket = async (nation: string, productId: string) => {
  return await Market.updateOne({ nation: nation }, { productIds: productId });
};

const createSellerDao = async (data: Seller) => {
  const seller = new SellerModel(data);
  await User.updateOne({ _id: data.userId }, { seller: true });

  return seller.save();
};

const createProductDao = async (data: Product) => {
  const product = new ProductModel(data);
  await product.save();
  return product;
};

export default {
  createSellerDao,
  createProductDao,
  findSellerByUserId,
  updateMarket,
};
