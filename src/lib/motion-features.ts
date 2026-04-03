/**
 * Async Framer Motion feature loader.
 * By using dynamic import with domAnimation, we code-split the animation
 * runtime so it doesn't block the critical rendering path.
 *
 * domAnimation (~17KB) covers: animate, exit, variants, whileInView,
 * whileHover, whileTap, whileFocus, and AnimatePresence.
 *
 * If we ever need drag, layout animations, or useScroll viewport detection,
 * switch to domMax (~29KB).
 */
export { domAnimation as default } from "framer-motion";
