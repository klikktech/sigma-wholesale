import "server-only";

import { cookies } from "next/headers";
import { axios } from ".";

interface JwtPayload {
  sub: string;
  name: string;
  username: string;
  email: string;
  exp: number;
}

export const createSession = (session: {
  accessToken: string;
  refreshToken: string;
}) => {
  setAccessToken(session.accessToken);
  setRefreshToken(session.refreshToken);
};

export const deleteSession = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCartCount = async () => {
  const { data, error } = await axios.products.getCartList();
  if (error) {
    if (error.message?.includes('Unauthorised')) {
      throw new Error('UNAUTHORIZED', { 
        cause: {
          code: 'Unauthorised',
          message: 'Your session has expired. Please log in again.'
        }
      });
    } else {
      throw new Error('ERROR', { 
        cause: {
          code: 'UNKNOWN',
          message: error.message
        }
      });
    }
}
  if(!data.cartItems || data.cartItems.length === 0){
    return {cartCount:0,cartPrice:0};
  }
  const cartCount = data.cartItems.reduce((acc:any, item:any) => acc + item.quantity, 0);
  const cartPrice = data.cartItems.reduce((acc:any, item:any) => acc + (item.variation?(item.variation.price * item.quantity):(parseInt(item.product.price)* item.quantity)) , 0);
  return {cartCount,cartPrice};
}

export const getUser = () => {
  try {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();
    if (token && refreshToken) {
      const payload = decodeToken(token);
      const refreshPayload = decodeToken(refreshToken);
      if (refreshPayload) return payload;
    }
  } catch (error) {}
  return null;
};

export const getAccessToken = () => {
  return cookies().get("accessToken")?.value;
};

export const getRefreshToken = () => {
  return cookies().get("refreshToken")?.value;
};

const setAccessToken = (token: string) => {
  const tokenExpiresAt = new Date(
    Date.now() + Number(process.env.SESSION_TOKEN_EXPIRATION)
  );
  cookies().set("accessToken", token, {
    httpOnly: true,
    secure: true,
    expires: tokenExpiresAt,
    sameSite: "lax",
    path: "/",
  });
};

const setRefreshToken = (token: string) => {
  const refreshExpiresAt = new Date(
    Date.now() + Number(process.env.SESSION_REFRESH_TOKEN_EXPIRATION)
  );
  cookies().set("refreshToken", token, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: "lax",
    path: "/",
  });
};

const decodeToken = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const setAgeVerification = () =>{
  cookies().set('isVerified', 'true');
}
export const getAgeVerification = () => {
  return cookies().get("isVerified")?.value;
};