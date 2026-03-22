import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect dashboard and API routes
    "/dashboard(.*)",
    "/api(.*)",
    // Skip public routes
    "/((?!_next|sign-in|sign-up|public|.*\\.png|.*\\.svg).*)",
  ],
};
