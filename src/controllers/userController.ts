import dotenv from "dotenv";
dotenv.config();

import { UserInputDTO } from "../interfaces/IUser";
import { createUser } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { passwordToHash } from "../middlewares/password";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),

  //영문 소문자와 숫자 4-10개로 패스워드를 구성
  password: Joi.string().pattern(new RegExp("^[a-z0-9]{4,10}$")).required(),

  //숫자10-12개로 전화번호를 구성
  phone: Joi.string().pattern(new RegExp("^[0-9]{10,12}$")).required(),
  name: Joi.string().required(),
});

const signup = async (req: Request, res: Response) => {
  const { email, password, phone, name }: UserInputDTO = req.body;
  const data = { email, password, phone, name };

  await schema.validateAsync(data);

  //패스워드 암호화
  data.password = await passwordToHash(password);
  await createUser(data);

  res.status(201).json({ message: "success" });
};

export default { signup };
