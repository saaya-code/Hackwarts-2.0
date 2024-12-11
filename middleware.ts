import { auth } from "./app/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  req.headers.set("X-Forwarded-Host", process.env.AUTH_TRUST_HOST as string)
  req.headers.set("X-Forwarded-Proto", process.env.AUTH_TRUST_HOST as string) 
  const protectedRoutes = [
    "/challenges",
    "/profile",
    "/create-team",
    "/submission",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/register", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

