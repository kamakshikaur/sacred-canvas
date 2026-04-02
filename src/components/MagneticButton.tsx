import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  pull?: number; // How strong the magnetic pull is
}

/**
 * Magnetic Button.
 * Gently pulls the button towards the cursor when hovered.
 */
const MagneticButton = ({ children, className = "", pull = 30 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Use springs to make the magnetic snap and release feel highly organic
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * (pull / 100));
    y.set(distanceY * (pull / 100));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
