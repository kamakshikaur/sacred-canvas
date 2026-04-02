import "./Works.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import MagneticButton from "@/components/MagneticButton";
import { artworks } from "@/data/artworks";
import portfolioCover from "@/assets/portfolio-cover.png";

const Works = () => {
  useEffect(() => {
    document.title = "Works — Kamakshi Kaur";
    return () => { document.title = "Kamakshi Kaur"; };
  }, []);

  return (
    <PageTransition>
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
        <FadeInView>
          <div className="works-portfolio__ornament">
            <div className="works-portfolio__ornament-line" />
            <span className="works-portfolio__ornament-diamond">◇</span>
            <div className="works-portfolio__ornament-line" />
          </div>
        </FadeInView>

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
                View Portfolio ↗
              </span>
            </a>
          </div>
        </FadeInView>
      </section>

      {/* ═══ GALLERY LINK ═══ */}
      <FadeInView delay={0.05}>
        <div className="works-gallery-cta">
          <MagneticButton pull={30}>
            <Link to="/gallery" className="works-gallery-cta__link">
              View All in Gallery →
            </Link>
          </MagneticButton>
        </div>
      </FadeInView>
    </PageTransition>
  );
};

/* ── Hero Banner ── */
const WorksHero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="works-hero">
      <motion.div
        className="works-hero__content"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          className="works-hero__line"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />
        <motion.h1
          className="works-hero__title"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          Works
        </motion.h1>
        <motion.p
          className="works-hero__quote"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
        >
          "Meant to be felt, as much as seen."
        </motion.p>
        <motion.div
          className="works-hero__count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {artworks.length} Works
        </motion.div>
      </motion.div>

      {/* Subtle scroll cue */}
      <motion.div
        className="works-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <div className="works-hero__scroll-line" />
      </motion.div>
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
      {/* Background number — watermark */}
      <div className="works-room__watermark" aria-hidden="true">
        {num}
      </div>

      {/* Painting side */}
      <motion.div className="works-room__painting-col" style={{ y: paintingY }}>
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
      </motion.div>

      {/* Info side */}
      <motion.div className="works-room__info-col" style={{ y: textY }}>
        <FadeInView delay={0.1}>
          <div className="works-room__info">
            <span className="works-room__number">{num}</span>

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
              {work.dimensions} · {work.year}
            </p>

            <p className="works-room__excerpt">
              {work.description.length > 160
                ? work.description.slice(0, 160) + "…"
                : work.description}
            </p>

            <MagneticButton pull={20}>
              <Link to={`/works/${work.id}`} className="works-room__enter">
                Enter →
              </Link>
            </MagneticButton>
          </div>
        </FadeInView>
      </motion.div>
    </div>
  );
};

export default Works;
