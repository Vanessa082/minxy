import { connectDB } from "@/server/config/database";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = ["/app", "/app/sign-in(.*)", "/app/sign-up(.*)"];

const isPublicRoute = createRouteMatcher(publicRoutes);

connectDB().then(console.log);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) await auth.protect();
  },
  {
    debug: false,
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
