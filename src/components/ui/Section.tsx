import type { ReactNode } from "react";

interface Props {
  id: string;
  className?: string;
  children: ReactNode;
}

/** Standard home-page section shell — consistent horizontal padding, vertical rhythm and max width. */
export const Section = ({ id, className = "", children }: Props) => (
  <section id={id} className={`px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto ${className}`.trim()}>
    {children}
  </section>
);
