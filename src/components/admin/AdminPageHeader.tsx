import Link from "next/link";

interface AdminPageHeaderProps {
  title: string;
}

export function AdminPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href="/admin"
        className="font-inputmono text-[11px] text-subtle hover:text-fg transition-colors"
      >
        ← Admin
      </Link>
      <h1 className="font-n27 font-bold italic text-2xl text-fg mt-2">{title}</h1>
    </div>
  );
}
