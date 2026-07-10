import { auth } from "@/auth";

/**
 * Guard for admin-only server actions. Next.js resolves a server action by its
 * id regardless of which route the POST hits, so the middleware `/admin` guard
 * is not sufficient on its own — every mutating action must verify the session
 * itself. Throws when there is no authenticated user.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}
