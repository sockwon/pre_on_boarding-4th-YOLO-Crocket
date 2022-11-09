export interface IToken {
  email: string;
  name: string;
  seller: boolean;
  phone: string;
}

export interface IVeryfied {
  email: string;
  phone: string;
  name: string;
  id: string;
  iat: number;
  exp: number;
  seller: boolean;
}
