import { baseApiReturn, typeInv } from ".";
import { ICategory } from "./category";
import { IProduct } from "./product";

export interface IExtendedInventory {
  _id: string;
  userId: string;
  category: ICategory;
  product: IProduct;
  type: typeInv;
  customer: string;
  quantity: number;
  date: string;
  __v: number;
}

export interface IGetAllInventory extends baseApiReturn {
  inventory: IExtendedInventory[];
}

export interface IGetInventoryId extends baseApiReturn {
  inventory: IExtendedInventory;
}
