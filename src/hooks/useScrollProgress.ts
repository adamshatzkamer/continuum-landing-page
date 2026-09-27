import { useEffect, useRef, useState } from "react";

type ScrollProgressOptions = {
  /**
   * Pixel offset into the element that acts as the "focus" point the
   * animation is timed around (e.g. where the two hands meet). Progress is
   * measured against this point, not the element's top edge — important for
   * very tall sections where the top scrolls past long before the focal
   * area appears.
   */
  anchor?: number;
  /** Viewport fraction (0=top, 1=bottom) where progress starts. Default 1 (bottom). */
  start?: number;
  /** Viewport fraction where progress reaches 1. Default 0.5 (centre). */
  end?: number;
};

/**
 * Tracks how far an element's focal point has travelled through the viewport.
 *
 * Returns a ref to attach to the element and a `progress` value in [0, 1].
 * Respects `prefers-reduced-motion` by pinning progress to 1 (final state).
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  options: ScrollProgressOptions = {}
) {
  const { anchor = 0, start = 1, end = 0.5 } = options;
  const ref = useRef<T | null>(null);
  // Reduced motion: start in the final state instead of setting it from the effect.
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const focus = rect.top + anchor; // viewport-space y of the focal point
      const startY = vh * start;
      const endY = vh * end;
      const raw = (startY - focus) / (startY - endY);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [anchor, start, end]);

  return { ref, progress };
}
