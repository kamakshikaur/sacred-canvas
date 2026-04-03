import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";

interface ArtworkGalleryProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkGallery = ({ images, title, isOpen, onClose }: ArtworkGalleryProps) => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 text-foreground/50 hover:text-foreground slow-transition"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-6 md:left-12 z-10 text-foreground/30 hover:text-foreground/70 slow-transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-6 md:right-12 z-10 text-foreground/30 hover:text-foreground/70 slow-transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Image */}
          <m.div
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ProtectedImage
              src={images[current]}
              alt={`${title} — view ${current + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </m.div>

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full slow-transition ${
                    i === current ? "bg-foreground/60" : "bg-foreground/20"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkGallery;
