/**
 * Module dependencies.
 */
import sellerDao from "../models/sellerDao";
import userDao from "../models/userDao";
import { Seller } from "../interfaces/ISeller";
import { IVeryfied } from "../interfaces/IToken";
import Joi from "joi";
import { erorrGenerator } from "../middlewares/errorGenerator";
import { ProductUpdate, ProductCreate } from "../interfaces/IProduct";

//셀러 등록 validation 스키마 작성
const schemaSeller = Joi.object({
  seller_name: Joi.string().required(),
  userId: Joi.required(),
  account: Joi.string().required(),
  bank: Joi.string().required(),
  contact: Joi.string().required(),
});

//상품 등록 validation 스키마 작성
const schemaProduct = Joi.object({
  product_name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  order_deadline: Joi.string().required(),
  nation: Joi.string().required(),
  userId: Joi.string().required(),
});

//상품 수정 validation 스키마 작성
const schemaUpdate = Joi.object({
  data: Joi.object().required(),
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});

//상품 삭제 validation 스키마 작성
const schemaSoftDelete = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});

//사용자가 셀러로 등록함. 로그인 필수. 토큰 필요.
const createSeller = async (data: Seller, user: IVeryfied) => {
  //validation test
  await schemaSeller.validateAsync(data);

  const value = await userDao.findUserDao(user.email);

  //사용자가 이미 셀러가 아닌지 확인=> seller:false 일때 새로운 셀러로 등록 가능
  if (value?.seller === true) {
    erorrGenerator(409, "이미 셀러로 등록된 사용자");
  }

  const result = await sellerDao.createSellerDao(data);
  return result;
};

//상품 등록. 셀러만 상품 등록 가능.
const createProduct = async (data: ProductCreate) => {
  await schemaProduct.validateAsync(data);

  //사용자의 ObjectId 로 셀러 id 를 로드한다.
  const value = await sellerDao.findSellerByUserId(data.userId);
  //data 객체에 sellerId 를 넣어둔다.
  data.sellerId = value?._id;
  const product = await sellerDao.createProductDao(data);

  const market = await sellerDao.updateMarket(product.nation, product._id);

  return market;
};

//상품 수정. 셀러만 가능하다. 상품을 등록한 셀러만 수정 가능.
const updateProduct = async (
  data: ProductUpdate,
  productId: string,
  userId: string
) => {
  //validation test
  await schemaUpdate.validateAsync({ data, productId, userId });

  const product = await sellerDao.findProductByProductId(productId);
  const seller = await sellerDao.findSellerByUserId(userId);

  if (!product) {
    erorrGenerator(404, "없는 상품입니다");
  }

  //상품에 등록된 셀러의 id 와 수정을 시도한 셀러의 id 를 비교함
  if (JSON.stringify(product?.sellerId) !== JSON.stringify(seller?._id)) {
    erorrGenerator(401);
  }
  const result = await sellerDao.updateProductDao(data, productId);
  return result;
};

//상품 삭제. 소프트 이므로 검색 및 수정이 안되는 것뿐이다. 시간이 부족하여 soft delete 를
//되살리는 기능은 넣지 못했다. 셀러만 가능하고 상품 등록한 샐러만 삭제 가능.
const softDeleteProduct = async (productId: string, userId: string) => {
  //validation test
  await schemaSoftDelete.validateAsync({ productId, userId });

  const product = await sellerDao.findProductByProductId(productId);
  const seller = await sellerDao.findSellerByUserId(userId);

  if (!product) {
    erorrGenerator(404, "없는 상품입니다");
  }

  //상품에 등록된 셀러의 id 와 삭제를 시도한 셀러의 id 를 비교함
  if (JSON.stringify(product?.sellerId) !== JSON.stringify(seller?._id)) {
    erorrGenerator(403, "권한이 없습니다");
  }

  return await sellerDao.softDeleteProductDao(productId);
};

/**
 * Module exports.
 * @public
 */

export default {
  createSeller,
  createProduct,
  updateProduct,
  softDeleteProduct,
};
