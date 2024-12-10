import { auth } from "./app/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
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

