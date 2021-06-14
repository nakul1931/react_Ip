import { baseApiReturn } from ".";
import { IProduct } from "./product";

export interface ICategory {
  _id: string;
  categoryName: string;
  userId: string;
  img: string;
  __v: number;
}
export interface IGetAllCategories extends baseApiReturn {
  categories: ICategory[];
}
export interface IGetCategoryId extends baseApiReturn {
  products: IProduct[];
  category: ICategory;
}
