export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

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
