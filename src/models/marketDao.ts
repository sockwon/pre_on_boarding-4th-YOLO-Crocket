import { Seller } from "../interfaces/ISeller";
import { Product } from "../interfaces/IProduct";
import Market from "../models/Market";
import User from "../models/User";
import ProductModel from "../models/Product";
import SellerModel from "../models/Seller";

const updateMarket = async (nation: string, productId: string) => {
  await Market.updateOne({ nation: nation }, { productIds: productId });
};

export default {};
