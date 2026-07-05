interface Props {
  /** Text after the `//` prefix, e.g. "Projects" → "// Projects". */
  label: string;
  /** Optional visually-hidden heading for the section (home sections). */
  srTitle?: string;
}

/** `// Label` eyebrow + gradient divider, shared across every section and detail page. */
export const SectionHeader = ({ label, srTitle }: Props) => (
  <>
    {srTitle && <h2 className="sr-only">{srTitle}</h2>}
    <p
      className="font-inputmono text-[11px] tracking-[0.2em] uppercase mb-1"
      aria-hidden="true"
    >
      <span className="text-brand">{"//"}</span> <span className="text-fg">{label}</span>
    </p>
    <div className="w-5 h-px bg-linear-to-r from-brand-sec to-brand mb-8 md:mb-10" />
  </>
);
