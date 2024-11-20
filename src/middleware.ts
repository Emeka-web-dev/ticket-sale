import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { currentUser } from "./lib/auth";
import { apiAuthPrefix, authRoutes, publicRoute } from "./route";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const user = await currentUser();
  const role = user?.role;

  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return;

  if (isPublicRoute) return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
