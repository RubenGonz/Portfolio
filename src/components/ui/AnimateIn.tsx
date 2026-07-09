"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof JSX.IntrinsicElements;
}

export function AnimateIn({ children, className = "", delay, as: Tag = "div" }: Props) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      className={`animate-hidden${inView ? " animate-in" : ""}${delay ? ` delay-${delay}` : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
