import "server-only";
import { decodeJwt, JWTPayload, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET as string;
const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey)
// }

export const createSession = (session: {
  accessToken: string;
  refreshToken: string;
}) => {
  setAccessToken(session.accessToken)
  setRefreshToken(session.refreshToken)
};

export const deleteSession = () => {
  cookies().delete("session");
  cookies().delete("refresh");
};

export const getAccessToken = () => {
  return cookies().get("accessToken")?.value
};

export const getRefreshToken = () => {
  return cookies().get("refreshToken")?.value
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

export const isTokenExpired = (token: string): boolean => {
  const decodedToken: JWTPayload = decodeJwt(token);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp) {
    return decodedToken.exp < currentTime;
  } else {
    return false;
  }
};

// export const getUser = async () => {
//   try {
//     // console.log(session, encodedKey, secretKey);
//     // console.log(jwt.verify(session, secretKey as string));

//     const payload = decodeJwt(token);
//     // const { payload } = await jwtVerify(session, encodedKey, {
//     //   algorithms: ["HS256"],
//     // });
//     console.log(payload);
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session", error);
//   }
//   return null;
// };

export const decrypt = (token: string | undefined = "") => {
  try {
    // console.log(session, encodedKey, secretKey);
    // console.log(jwt.verify(session, secretKey as string));
    const payload: JWTPayload = decodeJwt(token);
    // const { payload } = await jwtVerify(session, encodedKey, {
    //   algorithms: ["HS256"],
    // });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
};
