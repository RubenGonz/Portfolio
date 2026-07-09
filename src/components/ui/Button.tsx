import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "font-inputmono text-xs px-5 py-3 tracking-wide inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "font-bold bg-linear-to-r from-brand-sec to-brand text-on-accent hover:opacity-90 transition-opacity",
  outline: "border border-line/30 text-muted hover:border-brand/50 hover:text-fg transition-colors shadow-raised",
  ghost: "border border-line/16 text-subtle hover:border-brand/40 hover:text-fg transition-colors",
};

interface Props {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Renders an <a>. Add `external` for target=_blank, or `download`. */
  href?: string;
  external?: boolean;
  download?: boolean | string;
  /** Renders a <button> when no href is given. */
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

/** Shared CTA button — renders an <a> when `href` is given, otherwise a <button>. */
export const Button = ({
  variant = "primary",
  className = "",
  children,
  href,
  external,
  download,
  type = "button",
  disabled,
  onClick,
}: Props) => {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href !== undefined) {
    return (
      <a
        href={href}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
};
