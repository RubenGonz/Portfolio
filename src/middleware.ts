import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge-safe: authConfig has no Prisma/bcrypt, so the middleware bundle stays light.
export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: ["/admin/:path*"],
};
