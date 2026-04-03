import { m } from "framer-motion";
import type { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <m.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </m.div>
);

export default PageTransition;
