import sellerDao from "../models/sellerDao";
import userDao from "../models/userDao";
import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { IVeryfied } from "../interfaces/IToken";
import { UserOutPut } from "../interfaces/IUser";
import Joi from "joi";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { Product } from "../interfaces/IProduct";

const schemaSeller = Joi.object({
  seller_name: Joi.string().required(),
  userId: Joi.required(),
  account: Joi.string().required(),
  bank: Joi.string().required(),
  contact: Joi.string().required(),
});

const schemaProduct = Joi.object({
  sellerId: Joi.required(),
  product_name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  order_deadline: Joi.string().required(),
  nation: Joi.string().required(),
});

const createSeller = async (data: Seller, user: IVeryfied) => {
  await schemaSeller.validateAsync(data);

  const value = await userDao.findUserDao(user.email);

  //사용자가 이미 셀러가 아닌지 확인=> seller:false 일때 새로운 셀러로 등록 가능
  if (value?.seller === true) {
    erorrGenerator(409, "이미 셀러로 등록된 사용자");
  }

  const result = await sellerDao.createSellerDao(data);
  return result;
};

const createProduct = async (data: Product) => {
  await schemaProduct.validateAsync(data);

  const product = await sellerDao.createProductDao(data);

  const market = await sellerDao.updateMarket(product.nation, product._id);

  return market;
};

export default { createSeller, createProduct };
