import sellerDao from "../models/sellerDao";
import userDao from "../models/userDao";
import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { IVeryfied } from "../interfaces/IToken";
import { UserOutPut } from "../interfaces/IUser";
import Joi from "joi";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { Product, ProductUpdate, ProductCreate } from "../interfaces/IProduct";

const schemaSeller = Joi.object({
  seller_name: Joi.string().required(),
  userId: Joi.required(),
  account: Joi.string().required(),
  bank: Joi.string().required(),
  contact: Joi.string().required(),
});

const schemaProduct = Joi.object({
  product_name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  order_deadline: Joi.string().required(),
  nation: Joi.string().required(),
  userId: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  data: Joi.object().required(),
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});

const schemaSoftDelete = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
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

const createProduct = async (data: ProductCreate) => {
  await schemaProduct.validateAsync(data);
  const value = await sellerDao.findSellerByUserId(data.userId);
  data.sellerId = value?._id;
  const product = await sellerDao.createProductDao(data);

  const market = await sellerDao.updateMarket(product.nation, product._id);

  return market;
};

const updateProduct = async (
  data: ProductUpdate,
  productId: string,
  userId: string
) => {
  await schemaUpdate.validateAsync({ data, productId, userId });
  const product = await sellerDao.findProductByProductId(productId);
  const seller = await sellerDao.findSellerByUserId(userId);

  if (!product) {
    erorrGenerator(400, "없는 상품입니다");
  }

  if (JSON.stringify(product?.sellerId) !== JSON.stringify(seller?._id)) {
    erorrGenerator(401);
  }
  const result = await sellerDao.updateProductDao(data, productId);
  return result;
};

const softDeleteProduct = async (productId: string, userId: string) => {
  await schemaSoftDelete.validateAsync({ productId, userId });

  const product = await sellerDao.findProductByProductId(productId);
  const seller = await sellerDao.findSellerByUserId(userId);

  if (!product) {
    erorrGenerator(400, "없는 상품입니다");
  }

  if (JSON.stringify(product?.sellerId) !== JSON.stringify(seller?._id)) {
    erorrGenerator(401, "권한이 없습니다");
  }

  return await sellerDao.softDeleteProductDao(productId);
};

export default {
  createSeller,
  createProduct,
  updateProduct,
  softDeleteProduct,
};
