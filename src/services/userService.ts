import { UserInputDTO, UserLogIn } from "../interfaces/IUser";
import { passwordToHash, isRightPassword } from "../middlewares/password";
import { erorrGenerator } from "../middlewares/errorGenerator";
import tokenFn from "../middlewares/token";
import userDao from "../models/userDao";
import Joi from "joi";

const schemaSignUp = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),

  //영문, 특수문자, 숫자 8-20개로 패스워드를 구성
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$")
    )
    .required(),

  //숫자10-12개로 전화번호를 구성
  phone: Joi.string().pattern(new RegExp("^[0-9]{10,12}$")).required(),
  name: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const createUser = async (input: UserInputDTO) => {
  await schemaSignUp.validateAsync(input);

  //패스워드 암호화
  input.password = await passwordToHash(input.password);
  const result = await userDao.createUserDao(input);

  return result;
};

const logIn = async (input: UserLogIn) => {
  await schemaLogin.validateAsync(input);

  const user = await userDao.findUserDao(input.email);

  if (user === null) {
    erorrGenerator(401, "등록되지 않은 사용자");
  } else {
    const isUser = await isRightPassword(input.password, user.password);

    if (isUser === false) {
      erorrGenerator(400, "잘못된 비밀번호");
    }
    return tokenFn.createToken(user);
  }
};

export default { createUser, logIn };
