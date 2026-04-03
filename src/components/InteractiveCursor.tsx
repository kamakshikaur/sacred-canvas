import { useEffect, useRef } from "react";

/**
 * InteractiveCursor — Soft golden glow that follows the mouse.
 * Uses raw DOM manipulation (no React state per frame) for zero choppiness.
 * The glow expands on interactive elements.
 */
const InteractiveCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Bail on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    // Hide native cursor
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hoveringRef.current = !!el.closest("a, button, [role='button'], .artwork-item, .group");
    };

    const onLeave = () => {
      posRef.current = { x: -100, y: -100 };
    };

    // Animation loop — runs outside React, directly mutating DOM
    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
        dotRef.current.style.opacity = hoveringRef.current ? "0" : "1";
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "radial-gradient(circle, rgba(218,175,100,0.9) 0%, rgba(218,175,100,0.4) 100%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default InteractiveCursor;
