/**
 * Module dependencies.
 */
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

//bcrypt 로 사용자의 패스워드를 암호화 하기 위해 salt 값을 만드는 함수
const getSalt = (saltRound: number): number => {
  const salt = bcrypt.genSalt(saltRound);
  return Number(salt);
};

//사용자의 패스워드를 암호화한다. 단방향 암호화.
const passwordToHash = async (password: string): Promise<string> => {
  const saltRound = getSalt(Number(process.env.SALT_ROUND));
  const hashed = await bcrypt.hash(password, saltRound);
  return hashed;
};

//사용자가 로그인 할때 패스워드가 맞는지 검증한다.
const isRightPassword = async (inputPassword: string, userPassword: string) => {
  const result = await bcrypt.compare(inputPassword, userPassword);
  return result;
};

/**
 * Module exports.
 * @public
 */
export { passwordToHash, isRightPassword };
