import { ORDERS_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, REVIEWS_PAGE_ROUTE, USERS_PAGE_ROUTE } from "./routes";
import { INavItem, IUser } from "./types";

export const SIGMA_WHOLESALE = "Sigma Wholesale"

export const SAMPLE_NAV_USER: IUser = {
    image: "https://i.pravatarcc/150?u=a04258a2462d826712d",
    name: "Ravi Kalyan",
    email: "ravi@gmail.com",
  };
  
  export const SIDENAV_ITEMS: INavItem[] = [
    {
      icon: "group",
      label: "Users",
      path: USERS_PAGE_ROUTE,
    },
    {
      icon: "shopping_cart",
      label: "Products",
      path: PRODUCTS_PAGE_ROUTE,
    },
    {
      icon: "local_shipping",
      label: "Orders",
      path: ORDERS_PAGE_ROUTE,
    },
    {
      icon: "reviews",
      label: "Reviews",
      path: REVIEWS_PAGE_ROUTE,
    },
  ];