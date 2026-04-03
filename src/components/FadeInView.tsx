import { m } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  style?: CSSProperties;
}

const FadeInView = ({ children, delay = 0, className = "", y = 30, style }: FadeInViewProps) => (
  <m.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={style}
  >
    {children}
  </m.div>
);

export default FadeInView;
