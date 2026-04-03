import "./Works.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { m, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import MagneticButton from "@/components/MagneticButton";
import { artworks } from "@/data/artworks";
import portfolioCover from "@/assets/portfolio-cover.png";
import { useUI } from "@/context/UIContext";

const Works = () => {
  useEffect(() => {
    document.title = "Kamakshi Kaur";
  }, []);

  const { toggleGallery } = useUI();
  const { scrollYProgress } = useScroll();

  return (
    <PageTransition>
      {/* ═══ PAGE PROGRESS BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 h-16 flex items-end z-[90] pointer-events-none backdrop-blur-md bg-gradient-to-t from-background/50 to-transparent" style={{ WebkitMaskImage: 'linear-gradient(to right, black, transparent 95%)' }}>
        <m.div
          className="h-[1px] w-full origin-left mb-4"
          style={{ 
            scaleX: scrollYProgress, 
            background: "linear-gradient(to right, hsl(38 60% 50% / 0.5), hsl(38 100% 84% / 0.8))" 
          }}
        />
      </div>

      {/* ═══ HERO BANNER ═══ */}
      <WorksHero />

      {/* ═══ ARTWORK ROOMS ═══ */}
      <div className="works-rooms">
        {artworks.map((work, i) => (
          <ArtworkRoom key={work.id} work={work} index={i} />
        ))}
      </div>

      {/* ═══ PORTFOLIO SECTION ═══ */}
      <section className="works-portfolio">
        {/* Ornament removed */}

        <FadeInView delay={0.1}>
          <div className="works-portfolio__content">
            <h2 className="works-portfolio__title">Portfolio</h2>
            <p className="works-portfolio__subtitle">
              A curated selection of works, collected in one place.
            </p>
            <a
              href="/Kamakshi-Kaur-Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="works-portfolio__link group"
            >
              <div className="works-portfolio__cover-wrap">
                <ProtectedImage
                  src={portfolioCover}
                  alt="Portfolio"
                  className="works-portfolio__cover"
                />
                <div className="works-portfolio__cover-overlay" />
              </div>
              <span className="works-portfolio__cta">
                View Portfolio
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path d="M5 15L15 5M15 5H7.5M15 5V12.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </a>
          </div>
        </FadeInView>
      </section>

      {/* ═══ GALLERY LINK ═══ */}
      <FadeInView delay={0.05}>
        <div className="works-gallery-cta">
          <MagneticButton pull={30}>
            <button onClick={toggleGallery} className="works-gallery-cta__link">
              View All in Gallery →
            </button>
          </MagneticButton>
        </div>
      </FadeInView>
    </PageTransition>
  );
};

/* ── Hero Banner ── */
const WorksHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(heroScrollYProgress, [0, 0.15], [0, 100]);
  const titleOpacity = useTransform(heroScrollYProgress, [0, 0.08], [1, 0]);
  const lineScale = useTransform(heroScrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="works-hero">
      <m.div
        className="works-hero__content"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <m.div
          className="works-hero__line"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />
        <m.h1
          className="works-hero__title"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          Works
        </m.h1>
        <m.p
          className="works-hero__quote"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
        >
          "Meant to be felt, as much as seen."
        </m.p>
        <m.div
          className="works-hero__count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {artworks.length} Works
        </m.div>
      </m.div>

      {/* Subtle scroll cue */}
      <m.div
        className="works-hero__scroll flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <div className="works-hero__scroll-line" />
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
          Scroll
        </span>
      </m.div>
    </div>
  );
};

/* ── Individual Artwork "Room" ── */
interface ArtworkRoomProps {
  work: typeof artworks[0];
  index: number;
}

const ArtworkRoom = ({ work, index }: ArtworkRoomProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: painting moves slightly slower
  const paintingY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      className={`works-room ${isEven ? "works-room--left" : "works-room--right"}`}
    >
      {/* Background number removed as requested */}

      {/* Painting side */}
      <m.div className="works-room__painting-col" style={{ y: paintingY }}>
        <Link to={`/works/${work.id}`} className="works-room__painting-link group">
          <div className="works-room__painting-frame">
            <ProtectedImage
              src={work.image}
              alt={work.title}
              className="works-room__painting"
              loading="lazy"
            />
            {/* Ambient glow */}
            <div className="works-room__glow" />
          </div>
        </Link>
      </m.div>

      {/* Info side */}
      <m.div className="works-room__info-col" style={{ y: textY }}>
        <FadeInView delay={0.1}>
          <div className="works-room__info">
            <Link to={`/works/${work.id}`} className="works-room__title-link">
              <h2 className="works-room__title">{work.title}</h2>
            </Link>

            {work.nativeTitle && (
              <span className="works-room__native">{work.nativeTitle}</span>
            )}
            {work.pronunciation && (
              <span className="works-room__pronunciation">[ {work.pronunciation} ]</span>
            )}

            <div className="works-room__divider" />

            <p className="works-room__medium">{work.medium}</p>
            <p className="works-room__dims">
              {work.dimensions}
            </p>

            <p className="works-room__excerpt line-clamp-3">
              {work.description}
            </p>

            <MagneticButton pull={20}>
              <Link to={`/works/${work.id}`} className="works-room__enter">
                Enter →
              </Link>
            </MagneticButton>
          </div>
        </FadeInView>
      </m.div>
    </div>
  );
};

export default Works;
