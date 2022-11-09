export interface Product {
  sellerId?: string;
  product_name: string;
  category: string;
  price: number;
  description?: string;
  order_deadline: Date;
  nation: string;
  userId?: string;
}

export interface ProductCreate {
  sellerId?: string;
  product_name: string;
  category: string;
  price: number;
  description?: string;
  order_deadline: Date;
  nation: string;
  userId: string;
}

export interface ProductInputDTO {
  product_name: string;
  category: string;
  price: number;
  description?: string;
  order_deadline: Date;
  nation: string;
}

export interface ProductUpdate {
  product_name?: string;
  category?: string;
  price?: number;
  description?: string;
  order_deadline?: Date;
  nation?: string;
}
