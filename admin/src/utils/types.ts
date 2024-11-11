export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export interface UserDetails {
  firstName?: string;
  lastName?: string;
  username: string;
  phone: string;
  role: string;
  email: string;
  password: string;
  address?: string;
}

export interface ProductDetails {
  name: string;
  maxPrice: number;
  minPrice: number;
  // price: number;
  sku: string;
  isOnSale: boolean;
  status: "instock" | "outofstock";
  displayStatus: string;
  // stockQuantity: number;
  // totalSales: string;
  commentStatus: string;
  displayImage?: string;
  images?: string[]
  // category: string;
}

export interface ITableColumn {
  key: string;
  label: string;
  isSortable?: boolean;
  isSearchable?: boolean;
}

export interface IUser {
  image?: string;
  name: string;
  email: string;
}

export interface INavItem {
  label: string;
  path?: string;
  icon?: string;
}

export interface AxiosErrorResponse {
  status: number | null;
  error: {
    message: string;
  };
}

export type AxiosResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  status: number | null;
  error?: {
    message: string;
  };
};
