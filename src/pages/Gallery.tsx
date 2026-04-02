import "./Gallery.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import { artworks, type Artwork } from "@/data/artworks";

type ViewMode = "grid" | "list";

const Gallery = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedWork, setSelectedWork] = useState<Artwork | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Gallery — Kamakshi Kaur";
    return () => { document.title = "Kamakshi Kaur"; };
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedWork(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Navigate between works in lightbox
  useEffect(() => {
    if (!selectedWork) return;
    const handleKey = (e: KeyboardEvent) => {
      const idx = artworks.findIndex((a) => a.id === selectedWork.id);
      if (e.key === "ArrowRight" && idx < artworks.length - 1) {
        setSelectedWork(artworks[idx + 1]);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        setSelectedWork(artworks[idx - 1]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedWork]);

  return (
    <PageTransition>
      <div className="gallery-page pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-20">
        {/* Header */}
        <FadeInView>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <div>
              <h1 className="font-heading text-4xl md:text-6xl tracking-[0.05em] text-inherit opacity-85">
                Gallery
              </h1>
              <p className="font-body text-lg text-muted-foreground mt-3 max-w-lg">
                All works, at a glance. Click any painting to look closer.
              </p>
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1 self-start md:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`gallery-view-btn ${viewMode === "grid" ? "active" : ""}`}
                aria-label="Grid view"
                title="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="11" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="1" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`gallery-view-btn ${viewMode === "list" ? "active" : ""}`}
                aria-label="List view"
                title="List view"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="2" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="1" y="8" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="1" y="14" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </FadeInView>

        {/* Divider */}
        <FadeInView delay={0.05}>
          <div className="gallery-divider mb-12 md:mb-16" />
        </FadeInView>

        {/* Count */}
        <FadeInView delay={0.08}>
          <p className="font-body text-sm tracking-[0.25em] uppercase text-muted-foreground mb-10">
            {artworks.length} Works
          </p>
        </FadeInView>

        {/* ─── GRID VIEW ─── */}
        {viewMode === "grid" && (
          <div className="gallery-grid">
            {artworks.map((work, i) => (
              <FadeInView key={work.id} delay={i * 0.04}>
                <div
                  className="gallery-card group"
                  onClick={() => setSelectedWork(work)}
                >
                  {/* Painting */}
                  <div className="gallery-card__image-wrap">
                    <ProtectedImage
                      src={work.image}
                      alt={work.title}
                      className="gallery-card__image"
                      loading="lazy"
                    />
                    {/* Subtle glow on hover */}
                    <div className="gallery-card__glow" />
                  </div>

                  {/* Plaque — always visible, like a museum label */}
                  <div className="gallery-card__plaque">
                    <div className="gallery-card__title-row">
                      <h3 className="gallery-card__title">{work.title}</h3>
                      {work.nativeTitle && (
                        <span className="gallery-card__native">{work.nativeTitle}</span>
                      )}
                    </div>
                    {work.pronunciation && (
                      <span className="gallery-card__pronunciation">[ {work.pronunciation} ]</span>
                    )}
                    <p className="gallery-card__medium">{work.medium}</p>
                    <div className="gallery-card__meta">
                      <span>{work.dimensions}</span>
                      <span className="gallery-card__dot">·</span>
                      <span>{work.year}</span>
                    </div>
                  </div>

                  {/* "View" hint */}
                  <div className="gallery-card__view-hint">
                    <span>View</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        )}

        {/* ─── LIST VIEW ─── */}
        {viewMode === "list" && (
          <div className="gallery-list">
            {artworks.map((work, i) => (
              <FadeInView key={work.id} delay={i * 0.03}>
                <div
                  className="gallery-list-item group"
                  onClick={() => setSelectedWork(work)}
                >
                  <div className="gallery-list-item__thumb-wrap">
                    <ProtectedImage
                      src={work.image}
                      alt={work.title}
                      className="gallery-list-item__thumb"
                      loading="lazy"
                    />
                  </div>
                  <div className="gallery-list-item__info">
                    <div className="gallery-list-item__title-row">
                      <h3 className="gallery-list-item__title">{work.title}</h3>
                      {work.nativeTitle && (
                        <span className="gallery-list-item__native">{work.nativeTitle}</span>
                      )}
                    </div>
                    {work.pronunciation && (
                      <span className="gallery-list-item__pronunciation">[ {work.pronunciation} ]</span>
                    )}
                    <p className="gallery-list-item__medium">{work.medium}</p>
                  </div>
                  <div className="gallery-list-item__right">
                    <span className="gallery-list-item__dims">{work.dimensions}</span>
                    <span className="gallery-list-item__year">{work.year}</span>
                  </div>
                  <div className="gallery-list-item__arrow">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        )}

        {/* Back to Works link */}
        <FadeInView delay={0.1} className="mt-20 text-center">
          <Link
            to="/works"
            className="inline-block px-8 py-3 border border-foreground/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:border-primary/60 slow-transition"
          >
            Immersive View →
          </Link>
        </FadeInView>
      </div>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            ref={lightboxRef}
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => { if (e.target === lightboxRef.current) setSelectedWork(null); }}
          >
            {/* Close button */}
            <button
              className="gallery-lightbox__close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Nav arrows */}
            {(() => {
              const idx = artworks.findIndex((a) => a.id === selectedWork.id);
              return (
                <>
                  {idx > 0 && (
                    <button
                      className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                      onClick={(e) => { e.stopPropagation(); setSelectedWork(artworks[idx - 1]); }}
                      aria-label="Previous work"
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M17 6L9 14L17 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {idx < artworks.length - 1 && (
                    <button
                      className="gallery-lightbox__nav gallery-lightbox__nav--next"
                      onClick={(e) => { e.stopPropagation(); setSelectedWork(artworks[idx + 1]); }}
                      aria-label="Next work"
                    >
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M11 6L19 14L11 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </>
              );
            })()}

            {/* Content */}
            <motion.div
              key={selectedWork.id}
              className="gallery-lightbox__content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="gallery-lightbox__image-section">
                <ProtectedImage
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  className="gallery-lightbox__image"
                />
              </div>

              <div className="gallery-lightbox__details">
                <div className="gallery-lightbox__title-group">
                  <h2 className="gallery-lightbox__title">{selectedWork.title}</h2>
                  {selectedWork.nativeTitle && (
                    <span className="gallery-lightbox__native">{selectedWork.nativeTitle}</span>
                  )}
                </div>
                {selectedWork.pronunciation && (
                  <span className="gallery-lightbox__pronunciation">[ {selectedWork.pronunciation} ]</span>
                )}

                <div className="gallery-lightbox__divider" />

                <div className="gallery-lightbox__field">
                  <span className="gallery-lightbox__label">Medium</span>
                  <span className="gallery-lightbox__value">{selectedWork.medium}</span>
                </div>
                <div className="gallery-lightbox__field">
                  <span className="gallery-lightbox__label">Dimensions</span>
                  <span className="gallery-lightbox__value">{selectedWork.dimensions}</span>
                </div>
                <div className="gallery-lightbox__field">
                  <span className="gallery-lightbox__label">Year</span>
                  <span className="gallery-lightbox__value">{selectedWork.year}</span>
                </div>

                <div className="gallery-lightbox__divider" />

                <p className="gallery-lightbox__meaning">{selectedWork.meaning}</p>

                <Link
                  to={`/works/${selectedWork.id}`}
                  className="gallery-lightbox__link"
                  onClick={() => setSelectedWork(null)}
                >
                  Full Experience →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Gallery;
