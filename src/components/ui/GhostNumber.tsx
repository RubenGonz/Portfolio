/** Large decorative section number (01, 02…) ghosted into the background. */
export const GhostNumber = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none ghost-number select-none pointer-events-none"
  >
    {children}
  </span>
);
