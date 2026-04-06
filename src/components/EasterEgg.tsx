import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import "./EasterEgg.css";

/**
 * EasterEgg Component
 * Listens for the secret passphrase "lightwithin" typed anywhere on the site.
 * Triggers a sacred visual moment with the Ek Onkar symbol (ੴ).
 */
const EasterEgg: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buffer, setBuffer] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lockRef = useRef(false);

  const TARGET_WORD = "lightwithin";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if currently showing or if it's a modifier key
      if (lockRef.current || e.key.length > 1) return;

      const newBuffer = (buffer + e.key.toLowerCase()).slice(-TARGET_WORD.length);
      setBuffer(newBuffer);

      if (newBuffer === TARGET_WORD) {
        triggerEgg();
      }

      // Clear buffer if no key is pressed for 3 seconds
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setBuffer(""), 3000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [buffer]);

  const triggerEgg = () => {
    if (lockRef.current) return;
    
    lockRef.current = true;
    setIsVisible(true);
    setBuffer(""); // Reset buffer

    // Automatically hide after the animation sequence
    setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to finish before unlocking
      setTimeout(() => {
        lockRef.current = false;
      }, 2000);
    }, 5500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div 
          className={`ee-overlay ${isVisible ? 'ee-overlay--visible' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <m.div 
            className="ee-container"
            initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.05, opacity: 0, filter: "blur(15px)" }}
            transition={{ 
              duration: 2, 
              ease: [0.22, 1, 0.36, 1], // Divine ease-out
              opacity: { duration: 1.5 },
              filter: { duration: 2 }
            }}
          >
            {/* The Breathing Aura */}
            <div className="ee-aura" />
            
            {/* The Ek Onkar Symbol */}
            <div className="ee-symbol">
              ੴ
              {/* Shimmer Effect */}
              <div className="ee-shimmer">ੴ</div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
