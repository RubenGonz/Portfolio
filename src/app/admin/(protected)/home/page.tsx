import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const sections = [
  { label: "Hero",    href: "/admin/home/hero",    description: "Title, tagline and description" },
  { label: "Ticker",  href: "/admin/home/ticker",  description: "Scrolling strip between hero and projects" },
  { label: "Contact", href: "/admin/home/contact", description: "Headline and availability text" },
];

export default function HomeAdminIndex() {
  return (
    <div>
      <AdminPageHeader title="Home — rubengonz.com" />
      <div className="flex flex-col gap-1.5 max-w-2xl">
        {sections.map((s) => (
          <div key={s.href} className="flex items-center justify-between border border-line/10 bg-surface px-5 py-3">
            <div>
              <p className="font-inputmono text-sm text-fg">{s.label}</p>
              <p className="font-inputmono text-[10px] text-subtle">{s.description}</p>
            </div>
            <Link href={s.href} className="font-inputmono text-[11px] tracking-widest uppercase text-subtle hover:text-fg transition-colors">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
