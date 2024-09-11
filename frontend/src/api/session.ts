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
  refreshToke: string;
}) => {
  const expiresAt = new Date(
    Date.now() + Number(process.env.SESSION_TOKEN_EXPIRATION)
  );
  // const session = await encrypt({ userId, expiresAt })
  cookies().set("session", session.accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = () => {
  cookies().delete('session')
}

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
