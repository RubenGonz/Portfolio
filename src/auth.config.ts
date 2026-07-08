import type { NextAuthConfig } from "next-auth";

/** Edge-safe base config — no Prisma, no bcrypt. Used by the middleware to
 *  guard routes. The full config (src/auth.ts) adds the Credentials provider. */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Public (non-admin) routes are always allowed — locale handling runs
      // afterwards in the middleware. Only /admin/* is session-guarded.
      if (!nextUrl.pathname.startsWith("/admin")) return true;

      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/admin/login";

      if (isOnLogin) {
        // Already logged in → bounce away from the login page
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }

      // Everything else under /admin requires a session
      return isLoggedIn;
    },
  },
  providers: [], // added in src/auth.ts (kept out of the edge bundle)
} satisfies NextAuthConfig;
