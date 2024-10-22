import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "./session";
import { LANDING_PAGE_ROUTE, SIGNIN_PAGE_ROUTE } from "@/utils/routes";

const authRoutes = [SIGNIN_PAGE_ROUTE];

export const verifyClient = (request: NextRequest) => {
  try {
    const user = getUser();
    const path = request.nextUrl.pathname;
    const isAuthRoute = authRoutes.includes(path);

    if (!isAuthRoute && !user) {
      return NextResponse.redirect(new URL(SIGNIN_PAGE_ROUTE, request.url));
    }

    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL(LANDING_PAGE_ROUTE, request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error(e);
    return NextResponse.next();
  }
};
