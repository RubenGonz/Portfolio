import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logout } from "@/actions/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-line/10 bg-bg/90 backdrop-blur-md px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className="font-inputmono text-[11px] tracking-[0.2em] uppercase">
            <span className="text-brand">{"//"}</span> <span className="text-fg">Admin</span>
          </p>
          <Link href="/" className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors">
            ← Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-inputmono text-[11px] text-faint hidden sm:block">
            {session.user?.email}
          </span>
          <form action={logout} className="flex items-center">
            <button
              type="submit"
              className="font-inputmono text-[11px] tracking-widest uppercase text-subtle
                hover:text-danger transition-colors leading-none"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="px-6 md:px-10 pt-22 pb-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
