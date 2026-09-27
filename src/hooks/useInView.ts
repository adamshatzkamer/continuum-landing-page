import { useEffect, useRef, useState } from "react";

type InViewOptions = {
  /** Fraction of the element that must be visible to trigger. Default 0.3. */
  threshold?: number;
  /** IntersectionObserver rootMargin, e.g. "0px 0px -10% 0px". */
  rootMargin?: string;
};

/**
 * One-shot "has this element entered the viewport yet?" hook.
 *
 * Returns a ref to attach to the element and an `inView` boolean that flips to
 * true the first time the element intersects, then stays true (the observer
 * disconnects). Drives play-once entrance animations.
 *
 * Respects `prefers-reduced-motion` by reporting `inView` immediately so
 * elements render in their final state without movement.
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: InViewOptions = {}
) {
  const { threshold = 0.3, rootMargin } = options;
  const ref = useRef<T | null>(null);
  // Reduced motion: start in the final state instead of setting it from the effect.
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
