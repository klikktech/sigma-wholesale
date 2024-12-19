// Backend endpoints
export const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL;
export const SIGNIN_ENDPOINT = `api/auth/admin/authenticate`;
export const SIGNOUT_ENDPOINT = `api/auth/logout`;
export const REFRESH_TOKEN_URL = `api/auth/refresh-token`;


export const GET_ALL_USERS_ENDPOINT = `admin/users`;
export const EDIT_USERS_ENDPOINT = `admin/users/update`;
export const ADD_USER_ENDPOINT = `admin/users/register`;
export const GET_USER_ENDPOINT = (email: string) =>
  `admin/users/${email}`;
export const DELETE_USER_ENDPOINT = (email: string) =>
  `admin/users/${email}`;
// export const SEARCH_USERS_URL = (keyword: string) => `users/search/${keyword}`


export const GET_ALL_PRODUCTS_ENDPOINT = `admin/products`;
export const GET_PRODUCT_ENDPOINT = (details: string) =>
  `admin/products/${details}`;
export const ADD_PRODUCT_ENDPOINT = `admin/products`;
export const DELETE_PRODUCT_ENDPOINT = (details: string) =>
  `admin/products/${details}`;
export const SEARCH_PRODUCTS_URL = (keyword: string) => `products/search/${keyword}`


export const GET_ALL_ORDERS_ENDPOINT = `admin/orders`;
export const SEARCH_ORDERS_URL = (keyword: string) => `admin/orders/${keyword}`

export const GET_ORDER_DETAILS_ENDPOINT = (orderId: string) =>
  `orderItems/${orderId}`;
export const EDIT_ORDER_ENDPOINT = `admin/orders/update`;
export const DELETE_ORDER_ENDPOINT = (orderId: string) =>
  `admin/products/${orderId}`;
export const GET_BRANDS_URL = `brands`
export const ADD_OR_UPDATE_BRANDS_URL = `admin/brands`
export const DELETE_BRAND_URL = (name: string) => `admin/brands/${name}`;

export const GET_CATEGORIES_URL = `categories`

export const ADD_OR_UPDATE_BANNERS_URL = `admin/banners`
export const GET_BANNERS_URL = `banners`
export const DELETE_BANNER_URL = (id: string) => `admin/banners/${id}`
