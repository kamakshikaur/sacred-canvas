import { useEffect, useRef } from "react";

/**
 * LiquidBackground — Updated to use the portfolio PDF cover as the background.
 * Uses a fixed background with overlays to preserve atmosphere and text readability.
 * The atmospheric wash now slightly follows the user's mouse for a dynamic feel.
 */
const LiquidBackground = () => {
  const washRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Mouse tracking for dynamic lighting
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates precisely from -1.0 to 1.0 based on screen center
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth interpolation for the lighting shift
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (washRef.current) {
        // Shift light centers by up to 15% based on mouse position
        const xOffset = currentX * 15;
        const yOffset = currentY * 15;

        washRef.current.style.background = `
          radial-gradient(ellipse at ${20 + xOffset}% ${20 + yOffset}%, hsla(350, 100%, 12%, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse at ${80 - xOffset}% ${70 - yOffset}%, hsla(20, 80%, 15%, 0.3) 0%, transparent 60%),
          linear-gradient(to bottom, transparent, hsla(350, 40%, 5%, 0.8))
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
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Target background image from the PDF */}
      <div 
        className="absolute inset-0 opacity-80 transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage: 'url("/assets/portfolio-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Protective overlay to ensure typography remains legible over the image */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      
      {/* Deep red/amber atmosphere wash matching the PDF colors */}
      <div
        ref={washRef}
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsla(350, 100%, 12%, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 70%, hsla(20, 80%, 15%, 0.3) 0%, transparent 60%),
            linear-gradient(to bottom, transparent, hsla(350, 40%, 5%, 0.8))
          `,
        }}
      />
    </div>
  );
};

export default LiquidBackground;

