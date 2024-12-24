import { BANNERS_PAGE_ROUTE, BRANDS_PAGE_ROUTE, CATEGORIES_PAGE_ROUTE, ORDERS_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, USERS_PAGE_ROUTE } from "./routes";
import { INavItem, IUser } from "./types";

export const SIGMA_WHOLESALE = "Sigma Wholesale"

export const SAMPLE_NAV_USER: IUser = {
    image: "https://i.pravatarcc/150?u=a04258a2462d826712d",
    name: "User Name",
    email: "user@gmail.com",
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
      icon: "category",
      label: "Categories",
      path: CATEGORIES_PAGE_ROUTE,
    },
    {
      icon: "local_shipping",
      label: "Orders",
      path: ORDERS_PAGE_ROUTE,
    },
    {
      icon: "branding_watermark",
      label: "Brands",
      path: BRANDS_PAGE_ROUTE,
    },
    {
      icon: "campaign",
      label: "Banners",
      path: BANNERS_PAGE_ROUTE,
    },
  ];