/** Large decorative section number (01, 02…) ghosted into the background.
 *  Rendered via CSS ::before so axe-core skips contrast checks on decorative content. */
export const GhostNumber = ({ children }: { children: string }) => (
  <span
    aria-hidden="true"
    data-n={children}
    className="ghost-number absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none select-none pointer-events-none"
  />
);
