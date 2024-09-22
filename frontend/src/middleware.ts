import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { LOGIN_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "./utils/urls";
import { decrypt, getAccessToken } from "./api/session";

const protectedRoutes = ["/", PRODUCTS_PAGE_ROUTE];
const publicRoutes = [LOGIN_PAGE_ROUTE, SIGNUP_PAGE_ROUTE];

export default function middleware(req: NextRequest, res: NextFetchEvent) {
  try {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const token = getAccessToken();
    const session = decrypt(token);

    if (isProtectedRoute && !session?.sub) {
      return NextResponse.redirect(new URL(LOGIN_PAGE_ROUTE, req.nextUrl));
    }

    if (
      isPublicRoute &&
      session?.sub &&
      !req.nextUrl.pathname.startsWith(PRODUCTS_PAGE_ROUTE)
    ) {
      return NextResponse.redirect(new URL(PRODUCTS_PAGE_ROUTE, req.nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    // Handle authentication errors
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during authentication." },
      { status: 401 }
    );
  }
  // const session = await getServerSession(req, res, authOptions);

  // if (!session) {
  //   // Access token is expired or not present
  //   const refreshToken = localStorage.getItem('refreshToken');

  //   if (refreshToken) {
  //     try {
  //       // Refresh the access token using the refresh token
  //       const response = await axios.post('/api/auth/refresh', {
  //         refreshToken,
  //       });

  //       const { accessToken } = response.data;

  //       // Store the new access token in local storage
  //       localStorage.setItem('accessToken', accessToken);

  //       // Redirect to the original requested route (if within SSR context and URL is defined)
  //       if (res.redirect && req.url) {
  //         res.redirect(req.url);
  //       } else {
  //         // Handle non-SSR scenarios (e.g., navigate client-side)
  //         console.warn('Non-SSR context detected. Access token refreshed, but redirect not possible.');
  //       }
  //     } catch (error) {
  //       // Handle refresh token expiration or other errors
  //       res.redirect('/signin');
  //     }
  //   } else {
  //     // No refresh token present, redirect to sign in
  //     res.redirect('/signin');
  //   }
  // } else {
  //   // Access token is valid, continue to protected route
  //   // No need for res.next()
  // }
}

export const config = {
  // matcher: "/",
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
