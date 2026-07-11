import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { authConfig } from "@/auth.config";
import { routing } from "./i18n/routing";

// Edge-safe: authConfig has no Prisma/bcrypt, so the middleware bundle stays light.
const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  // /admin/* was already session-guarded by the `authorized` callback in
  // authConfig; if we reach here the request is allowed, so let it through
  // without locale rewriting (the admin panel is English-only).
  if (req.nextUrl.pathname.startsWith("/admin")) return;

  // Everything else: next-intl handles locale prefixing and negotiation.
  return intlMiddleware(req);
});

export const config = {
  // Match the root and every path except api, next internals, the extensionless
  // metadata route (opengraph-image) and static files (which carry a dot).
  // /admin is intentionally included so NextAuth can guard it.
  matcher: ["/", "/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
