export interface INavbarMenuItem {
  label: string
  path: string
}
export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export interface RegisterDetails {
  "firstname": string,
  "lastname": string,
  "nickname": string,
  "email": string,
  "password": string,
  "phone": string,
  "storeAddress": string,
  "storeCity": string,
  "storeState": string,
  "storeZip": string,
  "shippingAddress": string,
  "shippingCity": string,
  "shippingState": string,
  "shippingZip": string
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