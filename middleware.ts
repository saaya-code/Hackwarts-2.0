import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

async function checkTeam(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/check-team?email=${email}`,
  );
  const data = await response.json();
  return data.hasTeam;
}

export default auth(async (req) => {
  const isAuth = !!req.auth;
  const protectedRoutes = ["/challenges", "/profile", "/submission"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/register", req.nextUrl));
    }

    const userEmail = req.auth?.user?.email;
    if (userEmail && !(await checkTeam(userEmail))) {
      console.log("User does not have a team");
      return NextResponse.redirect(new URL("/create-team", req.nextUrl));
    }
  }

  if (req.nextUrl.pathname === "/register" && isAuth) {
    const userEmail = req.auth?.user?.email;
    if (userEmail) {
      const hasTeam = await checkTeam(userEmail);
      if (hasTeam) {
        return NextResponse.redirect(new URL("/challenges", req.nextUrl));
      }
      return NextResponse.redirect(new URL("/create-team", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
