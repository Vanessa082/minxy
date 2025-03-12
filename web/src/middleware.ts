import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/app",
  "/app/sign-in(.*)",
  "/app/sign-up(.*)",

  /**
   * API ROUTES
   */
  "/auth/current-user",
];

const isPublicRoute = createRouteMatcher(publicRoutes);

const isSignInOrSignUpRoute = (url: string) => {
  return url.includes("sign-in") || url.includes("sign-up");
};

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) await auth.protect();

    if (isSignInOrSignUpRoute(req.url)) {
      // const url = new URL(req.url);
      // const _url = req.nextUrl.clone();
      // if (_url.searchParams.has('redirect_url')) {
      //   _url.searchParams.delete('redirect_url');
      //   console.log('\n_Request URL', _url.toString(), '\n');
      //   /**
      //    * @see https://nextjs.org/docs/messages/middleware-relative-urls
      //   */
      //   return NextResponse.rewrite(url);
      // }
      // if (url.searchParams.has('redirect_url')) {
      //   /**
      //    * Attempting to remove the `redirect_url` search param
      //    * for how redirect_url works, @see https://clerk.com/docs/guides/custom-redirects#redirect-url-props
      //   */
      //   url.searchParams.delete('redirect_url');
      //   console.log('\nRequest URL', url.toString(), '\n');
      //   const redirectTo = `${url.pathname}?${url.searchParams.toString()}`;
      //   console.log('\RIDIRECT TO URL', redirectTo, '\n');
      //   redirect(redirectTo);
      // }
    }
  },
  {
    debug: false, // process.env.NODE_ENV === "development",
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
