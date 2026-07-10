"use client";

import { useEffect, useRef, useState } from "react";

interface Options extends IntersectionObserverInit {
  /** If true, element re-hides when it leaves the viewport */
  animateOut?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>({
  animateOut = false,
  ...observerOptions
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!animateOut) observer.disconnect();
        } else if (animateOut) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...observerOptions }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOut]);

  return { ref, inView };
}
