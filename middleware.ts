import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // Check if the request is for auth pages
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // Check if the request is for studio
  const isStudio = request.nextUrl.pathname.startsWith("/studio");

  // Check if the request is for onboarding
  const isOnboarding = request.nextUrl.pathname.startsWith("/onboarding");

  if (token) {
    // Redirect authenticated users away from auth pages
    if (isAuthPage) {
      const url = new URL("/studio/dashboard", request.url);
      return NextResponse.redirect(url);
    }

    if (isOnboarding && token.isProfileComplete) {
      const url = new URL("/studio/dashboard", request.url);
      return NextResponse.redirect(url);
    }

    // Check if `isProfileComplete` is false and redirect to onboarding
    if (isStudio && !token.isProfileComplete) {
      const url = new URL("/onboarding", request.url);
      return NextResponse.redirect(url);
    }
  } else {
    // Redirect unauthenticated users to login
    if (!isAuthPage) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.url); // Save original URL for redirecting after login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/studio/:path*",
    "/onboarding",
    // Auth pages
    "/login",
    "/register",
  ],
};
