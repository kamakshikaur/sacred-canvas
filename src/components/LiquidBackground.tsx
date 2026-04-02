import { useEffect, useRef } from "react";

/**
 * LiquidBackground — Dynamic copper/crimson environment that breathes with the cursor.
 * Uses high-performance CSS gradients and an inline SVG noise texture for a metallic canvas feel.
 */
const LiquidBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      // Smooth interpolation for the light
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (bgRef.current) {
        // Convert to percentages for gradient positioning
        const xPercent = (currentX / window.innerWidth) * 100;
        const yPercent = (currentY / window.innerHeight) * 100;

        // Dynamic gradient:
        // 1. A copper/gold highlight that closely follows the mouse
        // 2. A subtle deep crimson shift taking the opposite direction
        // 3. A dark, rich base color
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      {/* SVG Noise filter to give the background a physical canvas/metallic texture */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default LiquidBackground;

