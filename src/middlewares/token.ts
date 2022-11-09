import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const createToken = (user: any) => {
  const tokenKey = process.env.JWT_SECRET || "";
  const algorithm = process.env.ALGORITHM || "";
  const expire = process.env.JWT_EXPIRES_IN || "";

  const payload = {
    email: user["email"],
    phone: user["phone"],
    name: user["name"],

    //mongoDB 의 ObjectId 는 token 을 만들 수 없다. json 으로 변환하여 토큰을 제작.
    id: user["_id"].toJSON(),
  };

  //algorithm 을 입력할 수 없게 되어 있다. 모듈의 오류인듯 보인다.
  const token = jwt.sign(payload, tokenKey, {
    expiresIn: expire,
  });

  return token;
};

export default { createToken };
