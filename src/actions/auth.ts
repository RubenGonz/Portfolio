"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { signIn, signOut } from "@/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  // Throttle login attempts by IP: 8 per 10 minutes.
  if (!rateLimit(`login:${clientIp(await headers())}`, 8, 10 * 60_000)) {
    return "Too many attempts. Please try again later.";
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid email or password.";
    }
    // Re-throw so Next's redirect (NEXT_REDIRECT) propagates on success
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}
