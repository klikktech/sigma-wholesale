export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export interface UserDetails {
  firstname?: string;
  lastname?: string;
  username: string;
  phone: string;
  role: string;
  email: string;
  password?: string;
  storeAddress?: string;
  StoreState?:string;
  StoreCity?:string;
  storeZipcode?:string;
}

export interface ProductDetails {
  id?:number
  name: string;
  salePrice?:number;
  // maxPrice: number;
  // minPrice: number;
  price: number;
  sku: string;
  isOnSale: boolean;
  status: "instock" | "outofstock";
  displayStatus: string;
  details?:string;
  stockQuantity: number;
  // totalSales: string;
  // commentStatus: string;
  displayImage?: any;
  images?: string[]
  category: string;
  brand:string;
  productType:string;
  boxQuantity:number;
  caseQuantity:number;
  description:string;
  variations:Variation[]
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

export interface Variation {
  id: string;
  variationName: string;
  price: string;
  salePrice: string;
  sku: string;
  stockStatus: string;
  displayStatus: string;
  stockQuantity: string;
  isSelected?: boolean;
}