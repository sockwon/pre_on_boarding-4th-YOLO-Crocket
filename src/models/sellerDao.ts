import { Seller } from "../interfaces/ISeller";
import SellerModel from "../models/Seller";

const createSellerDao = async (data: Seller) => {
  const seller = new SellerModel(data);

  return seller.save();
};

export default { createSellerDao };
