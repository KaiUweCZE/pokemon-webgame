import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/profile", "/road"];
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const { auth: session } = req;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!session?.user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = session?.user as any;

  // first sign in -> intro
  if (user?.chapter === 0 && pathname !== "/intro") {
    return NextResponse.redirect(new URL("/intro", req.url));
  }

  if (user?.chapter !== 0 && pathname === "/intro") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (session?.user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
