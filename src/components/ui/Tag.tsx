/** Small bordered pill used for project and course tech tags. */
export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="font-inputmono text-[11px] text-faint border border-line/5 bg-line/[0.02] px-2 py-1">
    {children}
  </span>
);
