import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublic } from "config/routes";

/**
 * Next.js root Middleware function with Clerk.dev
 * @see {@link https://clerk.dev/docs/nextjs/middleware Clerk - Middleware Setup}
 * @see {@link https://nextjs.org/docs/advanced-features/middleware Next.js - Middleware}
 */
function middleware(req: NextRequest) {
  // if (isPublic(req.nextUrl.pathname)) {
  //   return NextResponse.next();
  // }

  // const { userId } = getAuth(req);

  // //if the user is not authenticated then redirect them to sign-in
  // if (!userId) {
  //   const signInUrl = new URL("/sign-in", req.url);
  //   signInUrl.searchParams.set("redirect_url", req.url);
  //   return NextResponse.redirect(signInUrl);
  // }

  return NextResponse.next();
}

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!.*\\.).*)",
};

export default withClerkMiddleware(middleware);
