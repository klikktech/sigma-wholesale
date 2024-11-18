import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "./session";
import { LOGIN_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "@/utils/urls";

const authRoutes = [LOGIN_PAGE_ROUTE, SIGNUP_PAGE_ROUTE];
const protectedPaths = ['/cart-list', '/check-out', '/orders', '/account', '/address'];

export const verifyClient = (request: NextRequest) => {
  try {
    const user = getUser();
    const path = request.nextUrl.pathname;

    // Check if current path is an auth route
    const isAuthRoute = authRoutes.some(route => path === route);
    
    // Check if current path is a protected route
    const isProtectedRoute = protectedPaths.some(route => path.startsWith(route));

    // Allow public routes to pass through
    if (!isProtectedRoute && !isAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to login if trying to access protected route without auth
    if (isProtectedRoute && !user) {
      const loginUrl = new URL(LOGIN_PAGE_ROUTE, request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect to home if trying to access auth routes while logged in
    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
};
