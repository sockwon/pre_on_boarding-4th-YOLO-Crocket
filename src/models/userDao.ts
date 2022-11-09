import User from "../models/User";
import { UserInputDTO } from "../interfaces/IUser";

const createUserDao = async (data: UserInputDTO) => {
  const user = new User(data);
  return user.save();
};

const findUserDao = async (inputEmail: string) => {
  const result = await User.findOne({ email: inputEmail }).exec();
  return result;
};

export default { createUserDao, findUserDao };
