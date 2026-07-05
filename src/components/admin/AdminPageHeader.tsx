import Link from "next/link";

interface AdminPageHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
}

export function AdminPageHeader({ title, backHref = "/admin", backLabel }: AdminPageHeaderProps) {
  const label = backLabel ?? (backHref === "/admin" ? "← Admin" : `← ${backHref.split("/").pop()?.replace(/-/g, " ") ?? "Back"}`);
  return (
    <div className="mb-8">
      <Link href={backHref} className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors capitalize">
        {label}
      </Link>
      <h1 className="font-n27 font-bold italic text-2xl text-fg mt-2">{title}</h1>
    </div>
  );
}
