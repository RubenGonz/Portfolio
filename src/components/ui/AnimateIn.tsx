"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Re-hide the element when it scrolls out of viewport */
  animateOut?: boolean;
}

export function AnimateIn({ children, className = "", delay, animateOut = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ animateOut });

  return (
    <div
      ref={ref}
      className={`animate-hidden${inView ? " animate-in" : ""}${delay ? ` delay-${delay}` : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
