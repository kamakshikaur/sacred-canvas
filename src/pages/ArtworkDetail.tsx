import "./ArtworkDetail.css";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { m, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ArtworkGallery from "@/components/ArtworkGallery";
import { useSound } from "@/context/SoundContext";
import { useUI } from "@/context/UIContext";
import ProtectedImage from "@/components/ProtectedImage";
import { artworks } from "@/data/artworks";
import MagneticButton from "@/components/MagneticButton";
import { Helmet } from "react-helmet-async";

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);

  const artworkSchema = artwork ? {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": artwork.title,
    "image": `https://kamakshikaur.com${artwork.image}`,
    "description": artwork.description,
    "artist": {
      "@type": "Person",
      "name": "Kamakshi Kaur"
    },
    "medium": artwork.medium,
    "artform": "Painting",
    "width": {
      "@type": "Distance",
      "name": artwork.dimensions
    }
  } : null;

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

  if (!artwork) return null;

  return (
    <PageTransition>
      <Helmet>
        <title>{artwork.title} | Kamakshi Kaur</title>
        <meta name="description" content={artwork.description} />
        <meta property="og:title" content={`${artwork.title} | Kamakshi Kaur`} />
        <meta property="og:description" content={artwork.description} />
        <meta property="og:image" content={`https://kamakshikaur.com${artwork.image}`} />
        <meta name="twitter:title" content={`${artwork.title} | Kamakshi Kaur`} />
        <meta name="twitter:description" content={artwork.description} />
        <meta name="twitter:image" content={`https://kamakshikaur.com${artwork.image}`} />
        {artworkSchema && (
          <script type="application/ld+json">
            {JSON.stringify(artworkSchema)}
          </script>
        )}
      </Helmet>

      <ArtworkGallery
        images={artwork.images}
        title={artwork.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <article className="ad-content">
        {/* ═══ HERO: Full-viewport painting ═══ */}
        <header ref={heroRef} className="ad-hero">
          {/* Atmospheric background */}
          <div className="ad-hero__atmosphere">
            <div className="ad-hero__atmos-layer ad-hero__atmos-layer--1" />
            <div className="ad-hero__atmos-layer ad-hero__atmos-layer--2" />
            <div className="ad-hero__atmos-layer ad-hero__atmos-layer--3" />
          </div>

          {/* Painting with parallax */}
          <m.div
            className="ad-hero__painting-wrap"
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            onClick={() => setGalleryOpen(true)}
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(350_100%_15%_/_0.5)_0%,_transparent_65%)] z-[-1] pointer-events-none blur-[40px] scale-105" />
            
            <m.div
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProtectedImage
                src={artwork.image}
                alt={artwork.title}
                className="ad-hero__painting"
              />
            </m.div>
            {/* Click hint */}
            <m.div
              className="ad-hero__click-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              <span>Click to expand</span>
            </m.div>
          </m.div>

          {/* Dark gradient overlay that intensifies on scroll */}
          <m.div
            className="ad-hero__overlay"
            style={{ opacity: overlayOpacity }}
          />

          {/* Title floating at bottom of hero */}
          <m.div
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
          </m.div>
        </header>

        {/* ═══ DETAILS SECTION: Editorial split layout ═══ */}
        <div className="ad-details">
          {/* Left column — sticky painting (desktop) */}
          <section className="ad-details__left" aria-label="Artwork Preview">
            <div className="ad-details__sticky-image">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(350_100%_15%_/_0.4)_0%,_transparent_65%)] z-[-1] pointer-events-none blur-[30px]" />
              <ProtectedImage
                src={artwork.image}
                alt={artwork.title}
                className="ad-details__side-painting"
                onClick={() => setGalleryOpen(true)}
              />
            </div>
          </section>

          {/* Right column — flowing content */}
          <section className="ad-details__right" aria-labelledby="artwork-title-heading">
            {/* Title block */}
            <FadeInView>
              <div className="ad-details__title-block">
                <h2 id="artwork-title-heading" className="ad-details__title">
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

            {/* Metadata grid */}
            <FadeInView delay={0.25}>
              <div className="ad-details__meta-grid">
                <div className="ad-details__meta-item">
                  <span className="ad-details__meta-label">Dimensions</span>
                  <span className="ad-details__meta-value">{artwork.dimensions}</span>
                </div>
                <div className="ad-details__meta-item">
                  <span className="ad-details__meta-label">Medium</span>
                  <span className="ad-details__meta-value">{artwork.detailedMedium || artwork.medium}</span>
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
          </section>
        </div>

        {/* ═══ NEXT/PREV NAVIGATION ═══ */}
        <nav className="ad-nav" aria-label="Artwork navigation">
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
        </nav>
      </article>
    </PageTransition>
  );
};

export default ArtworkDetail;
