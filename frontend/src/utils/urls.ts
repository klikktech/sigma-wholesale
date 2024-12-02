// Routes
export const SIGNUP_PAGE_ROUTE = "/register";
export const LOGIN_PAGE_ROUTE = "/login";
export const HOME_PAGE_ROUTE = "/home";
export const PRODUCT_VIEW_PAGE_ROUTE = (id: string) =>  `/products/${id}`;
export const PRODUCTS_PAGE_ROUTE = "/products";
export const CART_LIST_PAGE_ROUTE = "/cart-list";
export const CHECKOUT_PAGE_ROUTE = "/check-out";
export const ORDERS_PAGE_ROUTE = "/orders";
export const ADDRESSES_PAGE_ROUTE ='/address'
export const ACCOUNT_PAGE_ROUTE = '/account'


// API Endpoints
export const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL;

export const SIGNUP_URL = `/api/auth/register`;
export const LOGIN_URL = `/api/auth/authenticate`;
export const LOGOUT_URL = `/api/auth/logout`;
export const REFRESH_TOKEN_URL = `/api/auth/refresh-token`;
export const USERS_DETAILS_URL = `/users/details`;
export const USER_BY_ID_URL = (id: string) => `/users/${id}`;
export const PRODUCTS_URL = '/products';
export const NEW_ARRIVALS_URL = '/products/new-arrivals';
export const PRODUCT_BY_ID_URL = (id: string) => `/products/${id}`;
export const CART_URL = '/cart';
export const DELETE_CART_ITEM_URL = (variation:string) => `/cart/${variation}`;
export const CHECK_OUT_URL = '/checkout';
export const ORDERS_URL = '/orders/userOrders';
export const ORDER_PRODUCTS_URL = (id: string) => `/orderItems/${id}`;
export const SEARCH_PRODUCTS_URL = (keyword: string) => `/products/search/${keyword}`
export const USER_UPDATE_URL = '/users/update'
export const PRODUCT_BY_CATEGORY_URL = (category: string) => `/categories/${category}/products`;
export const PRODUCT_BY_BRAND_URL = (brand:string) => `/categories/tag/${brand}/products`;
export const ADDRESS_URL = (type: string) => `/users/addresses?type=${type}`;
export const DELETE_ADDRESS_URL = (address: string) =>`/address?address=${address}`;
export const GET_BRANDS_URL = `/brands`
