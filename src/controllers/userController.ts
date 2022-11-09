import dotenv from "dotenv";
dotenv.config();

import { UserInputDTO, UserLogIn } from "../interfaces/IUser";
import userService from "../services/userService";
import { Request, Response } from "express";

const signUpControll = async (req: Request, res: Response) => {
  const { email, password, phone, name }: UserInputDTO = req.body;
  const data = { email, password, phone, name };

  const result = await userService.createUser(data);

  if (typeof result === "object") {
    res.status(201).json({ message: "success" });
  }
};

const logInControll = async (req: Request, res: Response) => {
  const { email, password }: UserLogIn = req.body;
  const data = { email, password };

  const result = await userService.logIn(data);

  if (result) {
    res.status(200).json({ message: "success", authorization: result });
  }
};

export default { signUpControll, logInControll };
