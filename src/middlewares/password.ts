import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { erorrGenerator } from "./errorGenerator";

const getSalt = (saltRound: number): number => {
  const salt = bcrypt.genSalt(saltRound);
  return Number(salt);
};

const passwordToHash = async (password: string): Promise<string> => {
  const saltRound = getSalt(Number(process.env.SALT_ROUND));
  const hashed = await bcrypt.hash(password, saltRound);
  return hashed;
};

const isRightPassword = async (inputPassword: string, userPassword: string) => {
  const result = await bcrypt.compare(inputPassword, userPassword);
  return result;
};

export { passwordToHash, isRightPassword };
