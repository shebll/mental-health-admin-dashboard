import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./utlis/auth";
import { authRoutes, protectedRoutes } from "./data/routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let isAdmin = false;
  if (token) {
    const adminData = decodeToken(token);
    if (adminData.roles === "Admin") isAdmin = true;
    // console.log(adminData);
  }

  const loginUrl = new URL("/login", request.url);

  if (protectedRoutes.includes(request.nextUrl.pathname) && !isAdmin) {
    loginUrl.searchParams.set("callback", request.nextUrl.href);
    // loginUrl.searchParams.set("callback", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authRoutes.includes(request.nextUrl.pathname) && isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users", "/doctors", "/dashboard", "/login"],
};
