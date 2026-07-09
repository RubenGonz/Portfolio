"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof JSX.IntrinsicElements;
  /** Re-hide the element when it scrolls out of viewport */
  animateOut?: boolean;
}

export function AnimateIn({ children, className = "", delay, as: Tag = "div", animateOut = false }: Props) {
  const { ref, inView } = useInView({ animateOut });

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      className={`animate-hidden${inView ? " animate-in" : ""}${delay ? ` delay-${delay}` : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
