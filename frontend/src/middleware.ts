import { NextRequest } from "next/server";
import { verifyClient } from "./lib/axios/middleware";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api') ||
    path.includes('.') ||
    path === '/favicon.ico'
  ) {
    return;
  }
  
  return verifyClient(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};
