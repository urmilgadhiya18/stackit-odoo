import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/public", "/api/auth/login"];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  try {
    // Get the session using getSession
    const { data: session, error } = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    // If there's an error or no session, treat it as invalid
    if (error || !session || !session.session) {
      if (!isPublicRoute) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("better-auth.session_data");
        return response;
      }
      return NextResponse.next();
    }

    // Check session expiration using expiresAt
    const expiresAt = new Date(session.session.expiresAt).getTime();
    const currentTime = Date.now();
    const isSessionValid = expiresAt > currentTime;

    // If session is expired and not a public route, redirect to login
    if (!isSessionValid && !isPublicRoute) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("better-auth.session_data");
      return response;
    }

    // If authenticated and trying to access login, redirect to dashboard
    if (isSessionValid && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isSessionValid && request.nextUrl.pathname.startsWith("/internal/login")) {
      return NextResponse.redirect(new URL("/internal/dashboard/users", request.url));
    }
  } catch (error) {
    // Handle errors (e.g., network issues)
    console.error("Session validation error:", error);
    if (!isPublicRoute) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("better-auth.session_data");
      return response;
    }
  }

  // Continue the request for authenticated users or public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes except specified exceptions
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};