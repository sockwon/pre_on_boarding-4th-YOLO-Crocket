import User from "../models/User";
import { UserInputDTO } from "../interfaces/IUser";

const createUser = async (data: UserInputDTO) => {
  const user = new User(data);
  return user.save();
};

export { createUser };
