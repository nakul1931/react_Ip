export const domain =
  process.env.NODE_ENV === "production"
    ? "https://api-stockman.herokuapp.com"
    : "https://127.0.0.1:5000";

export interface IEndpoint {
  url: string;
  method: "get" | "post";
}

export const endpoints = {
  login: {
    url: "/auth/login",
    method: "post",
  } as IEndpoint,
  signup: {
    url: "/auth/signup",
    method: "post",
  } as IEndpoint,
  requestRefresh: {
    url: "/auth/requestRefresh",
    method: "post",
  } as IEndpoint,
  logout: {
    url: "/auth/logout",
    method: "post",
  } as IEndpoint,
  getCategories: {
    url: "/categories",
    method: "get",
  } as IEndpoint,
  categoryId: {
    url: "/categories/",
    method: "get",
  } as IEndpoint,
  addCategory: {
    url: "/categories/add",
    method: "post",
  } as IEndpoint,
  updateCategory: {
    url: "/categories/update/",
    method: "post",
  } as IEndpoint,
  deleteCategory: {
    url: "/categories/delete/",
    method: "post",
  } as IEndpoint,
  getProducts: {
    url: "/products",
    method: "get",
  } as IEndpoint,
  productId: {
    url: "/products/",
    method: "get",
  } as IEndpoint,
  addProduct: {
    url: "/products/add",
    method: "post",
  } as IEndpoint,
  updateProduct: {
    url: "/products/update/",
    method: "post",
  } as IEndpoint,
  deleteProduct: {
    url: "/products/delete/",
    method: "post",
  } as IEndpoint,
  inventoryId: {
    url: "/inventory/",
    method: "get",
  } as IEndpoint,
  addInventory: {
    url: "/inventory/add",
    method: "post",
  } as IEndpoint,
  getInventory: {
    url: "/inventory",
    method: "get",
  } as IEndpoint,
  deleteInventory: {
    url: "/inventory/delete/",
    method: "post",
  } as IEndpoint,
  updateInventory: {
    url: "/inventory/update/",
    method: "post",
  } as IEndpoint,
};
