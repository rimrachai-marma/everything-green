import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { serverEnv } from "./data/env";
import { User } from "./types";
import { getAuthToken, validateUser } from "./lib/actions/auth";

const TOKEN_COOKIE_NAME = serverEnv.TOKEN_COOKIE_NAME || "access_token";

const protectedRoutes = ["/profile"];
const authRoutes = ["/auth/login", "/auth/signup"];
const publicRoutes = ["/"];

export async function proxy(req: NextRequest) {
  console.log("FROM PROXY");

  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // PUBLIC ROUTES → ALWAYS ALLOW
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const authToken = await getAuthToken();

  let user: User | null = null;
  if (authToken) {
    user = await validateUser(authToken);
  }

  // Logged-in user visiting login/signup
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protected routes require auth
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);
    if (authToken) response.cookies.delete(TOKEN_COOKIE_NAME);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
