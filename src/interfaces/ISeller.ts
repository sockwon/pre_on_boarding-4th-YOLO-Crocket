export interface Seller {
  userId: string;
  seller_name: string;
  account: string;
  bank: string;
  contact: string;
}

export interface SellerInputDTO {
  seller_name: string;
  account: string;
  bank: string;
  contact: string;
  userId?: string;
}
