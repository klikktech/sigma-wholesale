import { NextRequest } from "next/server";
import { verifyClient } from "./lib/axios/middleware";

export default function middleware(request: NextRequest) {
    return verifyClient(request); 
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
],
};
