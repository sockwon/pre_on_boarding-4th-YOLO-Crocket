/**
 * Module dependencies.
 */
import dotenv from "dotenv";
dotenv.config();

import { UserInputDTO, UserLogIn } from "../interfaces/IUser";
import userService from "../services/userService";
import { Request, Response } from "express";

//회원가입에 필요한 데이터를 유입, 유출한다.
const signUpControll = async (req: Request, res: Response) => {
  const { email, password, phone, name }: UserInputDTO = req.body;
  const data = { email, password, phone, name };

  const result = await userService.createUser(data);

  if (typeof result === "object") {
    res.status(201).json({ message: "success" });
  }
};

//컨트롤러는 데이터의 유출입을 담당한다. 로그인에 필요한 데이터를 추출하고 입력하며
//결과값을 전달한다.
const logInControll = async (req: Request, res: Response) => {
  const { email, password }: UserLogIn = req.body;
  const data = { email, password };

  const result = await userService.logIn(data);

  if (result) {
    res.status(200).json({ message: "success", authorization: result });
  }
};

/**
 * Module exports.
 * @public
 */
export default { signUpControll, logInControll };
