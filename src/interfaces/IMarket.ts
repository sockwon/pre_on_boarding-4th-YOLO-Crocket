export interface Market {
  nation: string;
  product_id?: any[];
}

export interface getListInput {
  category: string;
  nation: string;
  inputText: string;
  sortType: string;
}
