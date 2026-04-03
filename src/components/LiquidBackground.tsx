import { useEffect, useRef, useState } from "react";

/**
 * LiquidBackground — Dynamic copper/crimson environment that breathes with the cursor.
 * Uses high-performance CSS gradients and an inline SVG noise texture for a metallic canvas feel.
 */
const LiquidBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      if (bgRef.current) {
        const xPercent = (currentX / window.innerWidth) * 100;
        const yPercent = (currentY / window.innerHeight) * 100;

        bgRef.current.style.background = `
          radial-gradient(circle at ${xPercent}% ${yPercent}%, hsla(25, 45%, 15%, 0.8) 0%, transparent 40%),
          radial-gradient(ellipse at ${100 - xPercent * 0.3}% ${100 - yPercent * 0.3}%, hsla(350, 80%, 10%, 0.9) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 50%, hsla(20, 20%, 5%, 1) 0%, hsla(0, 0%, 2%, 1) 100%)
        `;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#0a0505]" aria-hidden="true">
      {/* Background gradients layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, hsla(25, 45%, 15%, 0.8) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, hsla(350, 80%, 10%, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, hsla(20, 20%, 5%, 1) 0%, hsla(0, 0%, 2%, 1) 100%)
          `
        }}
      />
    </div>
  );
};

export default LiquidBackground;

