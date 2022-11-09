import sellerDao from "../models/sellerDao";
import userDao from "../models/userDao";
import { SellerInputDTO, Seller } from "../interfaces/ISeller";
import { IVeryfied } from "../interfaces/IToken";
import Joi from "joi";
import { erorrGenerator } from "../middlewares/errorGenerator";

const schemaSeller = Joi.object({
  seller_name: Joi.string().required(),
  userId: Joi.required(),
  account: Joi.string().required(),
  bank: Joi.string().required(),
  contact: Joi.string().required(),
});

const createSeller = async (data: Seller, user: IVeryfied) => {
  await schemaSeller.validateAsync(data);

  //토큰에 기록된 유저와 셀러로 등록하는 유저가 동일 인물인지 확인
  const value = await userDao.findUserDao(user.email);
  if (value === null) {
    erorrGenerator(401);
  }

  const result = await sellerDao.createSellerDao(data);
  return result;
};

export default { createSeller };
