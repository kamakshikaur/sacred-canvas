import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";

import MagneticButton from "@/components/MagneticButton";
import { useUI } from "@/context/UIContext";

const navLinks = [
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isGalleryOpen, toggleGallery } = useUI();



  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8">
          <Link
            to="/"
            className="text-base sm:text-lg tracking-[0.12em] sm:tracking-[0.2em] uppercase font-serif text-secondary"
          >
            Kamakshi Kaur
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-12 mr-4">
              {navLinks.map((link) => (
                <MagneticButton key={link.to} pull={30}>
                  <Link
                    to={link.to}
                    className={`font-body text-sm tracking-[0.15em] uppercase slow-transition hover:opacity-60 rounded-none shadow-none ${
                      location.pathname === link.to
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </MagneticButton>
              ))}
              <MagneticButton pull={30}>
                <button
                  onClick={toggleGallery}
                  className={`font-body text-sm tracking-[0.15em] uppercase slow-transition hover:opacity-60 rounded-none shadow-none ${
                    isGalleryOpen ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {isGalleryOpen ? "Close Gallery" : "Gallery View"}
                </button>
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground ml-2"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <m.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-px bg-foreground"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <m.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-px bg-foreground"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <m.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-px bg-foreground"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <m.div
                key={link.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-3xl tracking-[0.15em] text-foreground hover:text-primary slow-transition"
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: navLinks.length * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  toggleGallery();
                }}
                className={`font-heading text-3xl tracking-[0.15em] hover:text-primary slow-transition ${
                  isGalleryOpen ? "text-secondary" : "text-foreground"
                }`}
              >
                {isGalleryOpen ? "Close Gallery" : "Gallery View"}
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
