import { baseApiReturn, Modify } from ".";
import { ICategory } from "./category";

export interface IProduct {
  _id: string;
  productName: string;
  quantity: number;
  img: string;
  category: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IExtendedProduct extends baseApiReturn {
  product: Modify<
    IProduct,
    {
      category: ICategory;
    }
  >;
}

export interface IGetAllProducts extends baseApiReturn {
  products: IProduct[];
}
