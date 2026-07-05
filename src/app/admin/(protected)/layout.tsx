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
      <header className="border-b border-line/10 px-6 md:px-10 py-4 flex items-center justify-between">
        <p className="font-inputmono text-[11px] tracking-[0.2em] uppercase">
          <span className="text-brand">{"//"}</span> <span className="text-fg">Admin</span>
        </p>
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

      <main className="px-6 md:px-10 py-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
