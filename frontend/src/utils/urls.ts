// Routes
export const SIGNUP_PAGE_ROUTE = "/register";
export const LOGIN_PAGE_ROUTE = "/login";
export const HOME_PAGE_ROUTE = "/home";
export const SHOP_PAGE_ROUTE = "/shop";
export const PRODUCTS_PAGE_ROUTE = "/product";

// API Endpoints
export const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL;
export const SIGNUP_URL = `/api/auth/register`;
export const LOGIN_URL = `/api/auth/authenticate`;
export const USERS_URL = `/users`;
export const USER_BY_ID_URL = (id: string) => `/users/${id}`;
export const PRODUCTS_URL = `/products`;
export const PRODUCT_BY_ID_URL = (id: string) => `/products/${id}`;
