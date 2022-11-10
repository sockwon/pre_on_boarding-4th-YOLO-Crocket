/**
 * Module dependencies.
 */
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { erorrGenerator } from "./errorGenerator";
import { Request, Response, NextFunction } from "express";

//토큰 생성. 로그인 하면 토큰을 생성한다.
const createToken = (user: any) => {
  //아래의 처리는 undefined 를 피하기 위함이다.
  const tokenKey = process.env.JWT_SECRET || "";
  const algorithm = process.env.ALGORITHM || "";
  const expire = process.env.JWT_EXPIRES_IN || "";

  const payload = {
    email: user["email"],
    phone: user["phone"],
    name: user["name"],
    seller: user["seller"],
    //mongoDB 의 ObjectId 는 token 을 만들 수 없다. json 으로 변환하여 토큰을 제작.
    id: user["_id"].toJSON(),
  };

  //algorithm 을 입력할 수 없게 되어 있다. 모듈의 오류인듯 보인다.
  const token = jwt.sign(payload, tokenKey, {
    expiresIn: expire,
  });

  return token;
};

//인가를 위한 함수. 토큰이 있어야만 특정 자원에 접근할 수 있다.
const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization || null;
  const secretKey: string = process.env.JWT_SECRET || "none";

  if (accessToken === null) {
    erorrGenerator(400, "토큰 없음");
  } else {
    const veryfied = jwt.verify(accessToken, secretKey);
    req.body.user = veryfied;
    next();
  }
};

/**
 * Module exports.
 * @public
 */
export default { createToken, auth };
