// Backend endpoints
export const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL;
export const SIGNIN_ENDPOINT = `api/auth/admin/authenticate`;
export const SIGNOUT_ENDPOINT = `api/auth/authenticate`;
export const GET_ALL_USERS_ENDPOINT = `users`;
export const ADD_USER_ENDPOINT = `users`;
export const GET_ALL_PRODUCTS_ENDPOINT = `admin/products`;
export const GET_PRODUCT_ENDPOINT = (details: string) =>
  `admin/products/${details}`;
export const ADD_PRODUCT_ENDPOINT = `admin/products`;
export const REFRESH_TOKEN_URL = `api/auth/refresh-token`;
