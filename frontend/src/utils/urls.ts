// Routes
export const HOME_PAGE_ROUTE = "/home"
export const SHOP_PAGE_ROUTE = "/shop"
export const PRODUCTS_PAGE_ROUTE = "/products"

// API Endpoints
export const BASE_URL = "http://localhost:1234"
export const USERS_URL = `${BASE_URL}/users`
export const USER_BY_ID_URL = (id: string) => `${BASE_URL}/users/${id}`
export const PRODUCTS_URL = `${BASE_URL}/products`
export const PRODUCT_BY_ID_URL = (id: string) => `${BASE_URL}/products/${id}`
