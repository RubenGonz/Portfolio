"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
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
