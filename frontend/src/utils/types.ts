export interface INavbarMenuItem {
  label: string
  path: string
}
export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export interface RegisterDetails {
  firstname: string
  lastname: string
  nickname: string
  email: string
  password: string
  phone: string
  storeAddress: string
  storeCity: string
  storeState: string
  storeZip: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
}

export interface AxiosErrorResponse {
  status: number | null;
  error: {
    message: string;
  };
}

export type AxiosResponse = {
  data?: any;
  status: number | null;
  error?: {
    message: string;
  };
};

export interface IUser {
  image?: string;
  name: string;
  email: string;
}

export interface Product {
  name: string;
  status:string;
  category: string[];
  sku:string;
  price: number;
  displayImage: any;
  variations:string[];
  details:string;
}

export interface ProdDetails {
  name: string;
  price:string;
  status:string;
  category: string[];
  sku:string;
  displayImage: any;
  variations:variation[];
  details:string;
  images:[]
}

export interface ProductResponse {
  products: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface variation {
  typeInfo: string;
  variationName: string;
  sku: string;
  price:number
  details: string;
  stockStatus: string;
}

export interface FormState {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  storeAddress: string;
  storeCity: string;
  storeState: string;
  storeZip: string;
  error?: string;
}

export interface CartItem {
  product:any
  variation: cartvariation
  quantity: number;
}
export interface cartvariation {
  variationName: string;
  price: number;
}
export interface orderDetails{
  paymentMethod: string;
  orderTotal: number;
  id: string;
  orderCreatedAt: string;
  itemsList:orderItemsDetails[];
  totalCount:number;
}
export interface orderItemsDetails{
  variation: variation,
  quantity: number
}
export interface AddressProps {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  phone: string;
  isDefault?: boolean;
}

export interface UserDetails {
  currentPassword: string;
  newPassword: string;
  phone: string;
}

export interface UserDetailsResponse {
  name: string;
  email: string;
  phone: string;
  role: string;
}
export interface Brand {
  name: string;
  image: string;
}