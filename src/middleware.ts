import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./utlis/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let isAdmin = false;
  if (token) {
    const adminData = decodeToken(token);
    if (adminData.roles === "User") isAdmin = true;
    console.log(adminData);
  }

  const protectedRoutes = ["/", "/users", "/doctors", "/dashboard"];
  const loginUrl = new URL("/login", request.url);

  if (protectedRoutes.includes(request.nextUrl.pathname) && !isAdmin) {
    loginUrl.searchParams.set("callback", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname === "/login" && isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users", "/doctors", "/dashboard", "/login"],
};
