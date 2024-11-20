import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "./session";
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, SIGNUP_PAGE_ROUTE } from "@/utils/urls";

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