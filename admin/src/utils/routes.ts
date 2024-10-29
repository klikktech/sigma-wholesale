// Frontend page routes
export const BASE_FRONTEND_URL = process.env.BASE_FRONTEND_URL
export const SIGNIN_PAGE_ROUTE = "/sign-in";
export const USERS_PAGE_ROUTE = "/users";
export const ADD_USER_PAGE_ROUTE = USERS_PAGE_ROUTE + "/add-user";
export const PRODUCTS_PAGE_ROUTE = "/products";
export const ADD_PRODUCT_PAGE_ROUTE = PRODUCTS_PAGE_ROUTE + "/add-product";
export const EDIT_PRODUCT_PAGE_ROUTE = (details: string) =>
  PRODUCTS_PAGE_ROUTE + "/edit-product/" + details;
export const ORDERS_PAGE_ROUTE = "/orders";
export const REVIEWS_PAGE_ROUTE = "/reviews";
export const LANDING_PAGE_ROUTE = USERS_PAGE_ROUTE;
