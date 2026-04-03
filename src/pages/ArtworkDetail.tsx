import "./ArtworkDetail.css";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ArtworkGallery from "@/components/ArtworkGallery";
import { useSound } from "@/context/SoundContext";
import { useUI } from "@/context/UIContext";
import ProtectedImage from "@/components/ProtectedImage";
import { artworks } from "@/data/artworks";
import MagneticButton from "@/components/MagneticButton";

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { toggleGallery } = useUI();

  const currentIndex = artworks.findIndex((a) => a.id === id);
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  // Parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7, 1], [1, 0.6, 0.2]);
  const overlayOpacity = useTransform(heroProgress, [0, 0.5, 1], [0.15, 0.4, 0.8]);

  useEffect(() => {
    document.title = "Kamakshi Kaur";
  }, []);

  const { playVoiceover, stopVoiceover } = useSound();

  useEffect(() => {
    if (artwork?.voiceover) {
      playVoiceover(artwork.voiceover);
    }
    return () => {
      stopVoiceover();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artwork?.voiceover]);

  if (!artwork) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl text-foreground mb-4">
              Work not found
            </h1>
            <Link
              to="/works"
              className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground slow-transition"
            >
              Return to Works
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const artworkNumber = String(currentIndex + 1).padStart(2, "0");

  return (
    <PageTransition>
      <ArtworkGallery
        images={artwork.images}
        title={artwork.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      {/* ═══ HERO: Full-viewport painting ═══ */}
      <div ref={heroRef} className="ad-hero">
        {/* Atmospheric background */}
        <div className="ad-hero__atmosphere">
          <div className="ad-hero__atmos-layer ad-hero__atmos-layer--1" />
          <div className="ad-hero__atmos-layer ad-hero__atmos-layer--2" />
          <div className="ad-hero__atmos-layer ad-hero__atmos-layer--3" />
        </div>

        {/* Painting with parallax */}
        <motion.div
          className="ad-hero__painting-wrap"
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          onClick={() => setGalleryOpen(true)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ProtectedImage
              src={artwork.image}
              alt={artwork.title}
              className="ad-hero__painting"
            />
          </motion.div>
          {/* Click hint */}
          <motion.div
            className="ad-hero__click-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
            </svg>
            <span>Click to expand</span>
          </motion.div>
        </motion.div>

        {/* Dark gradient overlay that intensifies on scroll */}
        <motion.div
          className="ad-hero__overlay"
          style={{ opacity: overlayOpacity }}
        />

        {/* Artwork number removed */}

        {/* Title floating at bottom of hero */}
        <motion.div
          className="ad-hero__title-float"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="ad-hero__title">
            {artwork.title}
          </h1>
          {artwork.nativeTitle && (
            <span className="ad-hero__native">{artwork.nativeTitle}</span>
          )}
        </motion.div>

        {/* Scroll indicator removed per user request */}
      </div>

      {/* ═══ DETAILS SECTION: Editorial split layout ═══ */}
      <div className="ad-details">
        {/* Left column — sticky painting (desktop) */}
        <div className="ad-details__left">
          <div className="ad-details__sticky-image">
            <ProtectedImage
              src={artwork.image}
              alt={artwork.title}
              className="ad-details__side-painting"
              onClick={() => setGalleryOpen(true)}
            />
          </div>
        </div>

        {/* Right column — flowing content */}
        <div className="ad-details__right">
          {/* Title block */}
          <FadeInView>
            <div className="ad-details__title-block">
              <h2 className="ad-details__title">
                {artwork.title}
              </h2>
              {artwork.nativeTitle && (
                <span className="ad-details__native">{artwork.nativeTitle}</span>
              )}
              {artwork.pronunciation && (
                <span className="ad-details__pronunciation">
                  ◆ [ {artwork.pronunciation} ]
                </span>
              )}
            </div>
          </FadeInView>

          {/* Divider ornament removed */}

          {/* Metadata grid */}
          <FadeInView delay={0.25}>
            <div className="ad-details__meta-grid">
              <div className="ad-details__meta-item">
                <span className="ad-details__meta-label">Medium</span>
                <span className="ad-details__meta-value">{artwork.detailedMedium || artwork.medium}</span>
              </div>
              <div className="ad-details__meta-item">
                <span className="ad-details__meta-label">Dimensions</span>
                <span className="ad-details__meta-value">{artwork.dimensions}</span>
              </div>
            </div>
          </FadeInView>

          {/* Description — the poetic text */}
          <FadeInView delay={0.35}>
            <div className="ad-details__quote-block">
              <div className="ad-details__quote-mark">"</div>
              <p className="ad-details__description">
                {artwork.description}
              </p>
            </div>
          </FadeInView>

          {/* Meaning — deeper reflection */}
          <FadeInView delay={0.45}>
            <div className="ad-details__meaning-block">
              <span className="ad-details__meaning-label">Artist's Reflection</span>
              <p className="ad-details__meaning">
                {artwork.artistReflection}
              </p>
            </div>
          </FadeInView>

          {/* Closing ornament removed */}
        </div>
      </div>

      {/* ═══ NEXT/PREV NAVIGATION ═══ */}
      <div className="ad-nav">
        <FadeInView>
          <div className="ad-nav__inner">
            {prevArtwork ? (
              <Link to={`/works/${prevArtwork.id}`} className="ad-nav__link ad-nav__link--prev group">
                <div className="ad-nav__link-thumb-wrap">
                  <ProtectedImage
                    src={prevArtwork.image}
                    alt={prevArtwork.title}
                    className="ad-nav__link-thumb"
                  />
                </div>
                <div className="ad-nav__link-text">
                  <span className="ad-nav__link-label">Previous</span>
                  <span className="ad-nav__link-title">{prevArtwork.title}</span>
                </div>
              </Link>
            ) : (
              <MagneticButton pull={25}>
                <Link
                  to="/works"
                  className="ad-nav__back-link"
                >
                  ← All Works
                </Link>
              </MagneticButton>
            )}

            <div className="ad-nav__center">
              <MagneticButton pull={25}>
                <button onClick={toggleGallery} className="ad-nav__gallery-link">
                  Gallery View
                </button>
              </MagneticButton>
            </div>

            {nextArtwork ? (
              <Link to={`/works/${nextArtwork.id}`} className="ad-nav__link ad-nav__link--next group">
                <div className="ad-nav__link-text" style={{ textAlign: "right" }}>
                  <span className="ad-nav__link-label">Next</span>
                  <span className="ad-nav__link-title">{nextArtwork.title}</span>
                </div>
                <div className="ad-nav__link-thumb-wrap">
                  <ProtectedImage
                    src={nextArtwork.image}
                    alt={nextArtwork.title}
                    className="ad-nav__link-thumb"
                  />
                </div>
              </Link>
            ) : (
              <MagneticButton pull={25}>
                <Link
                  to="/works"
                  className="ad-nav__back-link"
                >
                  All Works →
                </Link>
              </MagneticButton>
            )}
          </div>
        </FadeInView>
      </div>
    </PageTransition>
  );
};

export default ArtworkDetail;
