export interface Product {
  sellerId: string;
  product_name: string;
  category: string;
  price: number;
  description?: string;
  order_deadline: Date;
  nation: string;
}

export interface ProductInputDTO {
  product_name: string;
  category: string;
  price: number;
  description?: string;
  order_deadline: Date;
  nation: string;
}
