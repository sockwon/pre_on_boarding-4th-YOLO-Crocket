import { ObjectId } from "mongoose";

export interface User {
  email: string;
  name: string;
  password: string;
  phone: string;
  seller: boolean;
}

export interface UserInputDTO {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface UserLogIn {
  email: string;
  password: string;
}

export interface UserOutPut {
  email: string;
  name: string;
  password: string;
  phone: string;
  seller: boolean;
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

export interface UserSearchInput {
  email: string;
}
