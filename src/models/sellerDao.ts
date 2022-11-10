import { Seller } from "../interfaces/ISeller";
import { Product, ProductUpdate } from "../interfaces/IProduct";
import Market from "../models/Market";
import User from "../models/User";
import ProductModel from "../models/Product";
import SellerModel from "../models/Seller";

const findSellerByUserId = async (userId: string) => {
  return await SellerModel.findOne({ userId: userId }).exec();
};

const findProductByProductId = async (productId: string) => {
  return await ProductModel.findOne({ _id: productId }).exec();
};

const updateMarket = async (nation: string, productId: string) => {
  return await Market.updateOne(
    { nation: nation },
    { $push: { productIds: productId } }
  );
};

const createSellerDao = async (data: Seller) => {
  const seller = new SellerModel(data);
  await User.updateOne({ _id: data.userId }, { seller: true });

  return await seller.save();
};

const createProductDao = async (data: Product) => {
  const product = new ProductModel(data);
  await product.save();
  return product;
};

const updateProductDao = async (data: ProductUpdate, productId: string) => {
  const result = await ProductModel.updateOne(
    { _id: productId, isdelete: false },
    data
  );
  return result;
};

const softDeleteProductDao = async (productId: string) => {
  const result = await ProductModel.updateOne(
    { _id: productId, isdelete: false },
    { isdelete: true }
  );
  return result;
};

export default {
  createSellerDao,
  createProductDao,
  findSellerByUserId,
  updateMarket,
  updateProductDao,
  findProductByProductId,
  softDeleteProductDao,
};
