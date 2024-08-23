import { INavbarMenuItem } from "./types";
import { HOME_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, SHOP_PAGE_ROUTE } from "./urls";

export const SIGMA_WHOLESALE = "Sigma Wholesale";
export const DESCRIPTION =
  "Sigmawholesale TX: Top-quality smoking Vape products, enhancing your experience with premium selections and unbeatable wholesale prices.";

export const NAV_MENU_ITEMS: INavbarMenuItem[] = [
  {
    label: "Home",
    path: HOME_PAGE_ROUTE,
  },
  {
    label: "Shop",
    path: SHOP_PAGE_ROUTE,
  },
  {
    label: "Products",
    path: PRODUCTS_PAGE_ROUTE,
  },
];
