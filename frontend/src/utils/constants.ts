import { INavbarMenuItem } from "./types";
import { HOME_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, SHOP_PAGE_ROUTE } from "./urls";

export const SIGMA_WHOLESALE = "Sigma Wholesale";
export const DESCRIPTION =
  "Sigmawholesale TX: Top-quality smoking Vape products, enhancing your experience with premium selections and unbeatable wholesale prices.";

export const NAV_MENU_ITEMS: INavbarMenuItem[] = [
  {
    label: "Products",
    path: PRODUCTS_PAGE_ROUTE,
  },
  {
    label: "New Arrivals",
    path: SHOP_PAGE_ROUTE,
  },
  {
    label: "Categories",
    path: PRODUCTS_PAGE_ROUTE,
  },
  {
    label: "Brands",
    path: SHOP_PAGE_ROUTE,
  },
  {
    label: "contact",
    path: PRODUCTS_PAGE_ROUTE,
  },
];

export const TABS_LIST = [
  {
    title: "Kratom",
    key: "kratom",
  },
  {
    title: "Coils/Pods",
    key: "coils",
  },
  {
    title: "Detox",
    key: "detox",
  },
  {
    title: "E Juice",
    key: "ejuice",
  },
  {
    title: "Papers/Wraps",
    key: "papers",
  },
  {
    title: "THC",
    key: "thc",
  },
  {
    title: "Necotine Disposables",
    key: "necotine",
  },
  {
    title: "CBD",
    key: "cbd",
  },
];