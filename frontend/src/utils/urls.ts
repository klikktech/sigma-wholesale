// Routes
export const SIGNUP_PAGE_ROUTE = "/register";
export const LOGIN_PAGE_ROUTE = "/login";
export const HOME_PAGE_ROUTE = "/home";
export const PRODUCT_VIEW_PAGE_ROUTE = (id: string) =>  `/products/${id}`;
export const PRODUCTS_PAGE_ROUTE = "/products";
export const CART_LIST_PAGE_ROUTE = "/cart-list";
export const CHECKOUT_PAGE_ROUTE = "/check-out";
export const ORDERS_PAGE_ROUTE = "/orders";
export const ADDRESSES_PAGE_ROUTE ='/addresses'



// API Endpoints
export const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL;
// export const BASE_BACKEND_URL = "https://a179-104-244-243-241.ngrok-free.app";

export const SIGNUP_URL = `/api/auth/register`;
export const LOGIN_URL = `/api/auth/authenticate`;
export const LOGOUT_URL = `/api/auth/logout`;
export const REFRESH_TOKEN_URL = `/api/auth/refresh-token`;
export const USERS_URL = `/users`;
export const USER_BY_ID_URL = (id: string) => `/users/${id}`;
export const PRODUCTS_URL = '/products';
export const NEW_ARRIVALS_URL = '/products/new-arrivals';
export const PRODUCT_BY_ID_URL = (id: string) => `/products/${id}`;
export const CART_URL = '/cart';
export const CHECK_OUT_URL = '/checkout';
export const ORDERS_URL = '/orders/userOrders';
export const ORDER_ITEMS_URL = (id: string) => `/orderItems/${id}`;
export const SEARCH_ITEMS_URL = (keyword: string) => `/products/search/${keyword}`



