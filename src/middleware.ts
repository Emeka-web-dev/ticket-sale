import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { currentUser } from "./lib/auth";
import { apiAuthPrefix, authRoutes, publicRoute } from "./route";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const user = await currentUser();
  // const role = user?.role;
  const isLoggedIn = req.auth;

  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return;

  if (isPublicRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      // If user is admin or moderator
      // if (isAdminOrModerator) {
      //   return Response.redirect(new URL("/admin/dashboard", nextUrl));
      // }

      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  // Check if session expires
  if (
    isLoggedIn &&
    (user?.customExpiration as number) < Math.floor(Date.now() / 1000)
  ) {
    if (nextUrl.pathname !== "/logout") {
      return Response.redirect(new URL("/logout", nextUrl));
    }
  }

  // check if user is not logged in

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
