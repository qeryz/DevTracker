import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, refreshAccessToken } from "@/lib/api/auth";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access")?.value;
  const refreshToken = req.cookies.get("refresh")?.value;

  // If access token exists, verify it
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      console.error("Access token verification failed:", error);
      // Continue to refresh attempt
    }
  }

  // Try to refresh if we have a refresh token
  if (refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);

      // Create a response that continues to the requested page
      const response = NextResponse.next();

      // Set the new access token in cookies
      response.cookies.set({
        name: "access",
        value: newAccessToken,
        path: "/",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
      });

      return response;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      // Clear invalid tokens and redirect
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("access");
      response.cookies.delete("refresh");
      return response;
    }
  }

  // No valid tokens - redirect to login
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.delete("access");
  response.cookies.delete("refresh");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
