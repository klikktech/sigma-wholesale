import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "./session";
import { ADDRESSES_PAGE_ROUTE, CART_LIST_PAGE_ROUTE, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "@/utils/urls";

const authRoutes = [LOGIN_PAGE_ROUTE,SIGNUP_PAGE_ROUTE];
const publicRoutes = ['/',HOME_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE]

export const verifyClient = (request: NextRequest) => {
  try {
    const user = getUser();
    const path = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path)

    if(isPublicRoute){
      return NextResponse.next();
    }
    else if (!isAuthRoute && !user) {
      return NextResponse.redirect(new URL(LOGIN_PAGE_ROUTE, request.url));
    }
    else if (isAuthRoute && user) {
      return NextResponse.redirect(new URL(HOME_PAGE_ROUTE, request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error(e,"middleware error");
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
};
// export const verifyClient = (request: NextRequest) => {
//   try {
//     const user = getUser();
//     const path = request.nextUrl.pathname;

//     // Check if current path is an auth route
//     const isAuthRoute = authRoutes.some(route => path === route);
    
//     // Check if current path is a protected route
//     const isProtectedRoute = protectedPaths.some(route => path.startsWith(route));

//     // Allow public routes to pass through
//     if (!isProtectedRoute && !isAuthRoute) {
//       return NextResponse.next();
//     }

//     // Redirect to login if trying to access protected route without auth
//     if (isProtectedRoute && !user) {
//       const loginUrl = new URL(LOGIN_PAGE_ROUTE, request.url);
//       loginUrl.searchParams.set('from', request.nextUrl.pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Redirect to home if trying to access auth routes while logged in
//     if (isAuthRoute && user) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     return NextResponse.next();
//   } catch (e) {
//     console.error("Middleware error:", e);
//     return NextResponse.next();
//   }
// };
