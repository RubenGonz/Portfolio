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
    // observerOptions is spread into a fresh object each render; adding it as a
    // dep would re-create the observer on every render. Callers pass static
    // options, so keying only on animateOut is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOut]);

  return { ref, inView };
}
