import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ArtworkGallery from "@/components/ArtworkGallery";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";
import ProtectedImage from "@/components/ProtectedImage";
import { artworks } from "@/data/artworks";

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    if (artwork) {
      document.title = `${artwork.title.replace(/\u200B/g, "")} — Kamakshi Kaur`;
    }
    return () => { document.title = "Kamakshi Kaur"; };
  }, [artwork]);

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

  return (
    <PageTransition>
      {/* Voiceover */}
      <VoiceoverPlayer src={artwork.voiceover} />

      {/* Gallery modal */}
      <ArtworkGallery
        images={artwork.images}
        title={artwork.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <div className="pt-24 md:pt-32 relative">
        {/* Atmospheric field — pure CSS gradients, no blur filters */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
          style={{ height: "100vh", top: "-5vh" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 40%, hsla(348, 100%, 15%, 0.5) 0%, transparent 55%),
                radial-gradient(ellipse at 60% 35%, hsla(348, 100%, 12%, 0.35) 0%, transparent 50%),
                radial-gradient(ellipse at 40% 50%, hsla(0, 0%, 8%, 0.6) 0%, transparent 60%),
                radial-gradient(ellipse at 50% 50%, hsla(0, 0%, 6%, 0.9) 0%, transparent 75%)
              `,
            }}
          />
          {/* Single subtle breathing layer — CSS animation, no Framer Motion */}
          <div
            className="absolute inset-[-20%] animate-pulse"
            style={{
              background: "radial-gradient(ellipse at 55% 45%, hsla(348, 100%, 18%, 0.25) 0%, transparent 50%)",
              animationDuration: "6s",
            }}
          />
        </div>

        {/* Hero artwork — clickable to open gallery */}
        <motion.div
          className="relative w-full px-4 md:px-16 flex justify-center cursor-pointer z-10"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={() => setGalleryOpen(true)}
        >
          <ProtectedImage
            src={artwork.image}
            alt={artwork.title}
            className="relative max-h-[70vh] w-auto object-contain hover:scale-[1.01] transition-transform"
            style={{ transitionDuration: "1.6s", transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)" }}
          />
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-8 py-20 md:py-32">
          <FadeInView>
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-4xl md:text-6xl tracking-[0.05em] text-foreground flex items-center flex-wrap gap-4 md:gap-6">
                <span>{artwork.title}</span>
                {artwork.nativeTitle && (
                  <span className="font-punjabi text-4xl md:text-6xl text-foreground/70 font-normal" style={{ transform: "translateY(-1px)" }}>
                    {artwork.nativeTitle}
                  </span>
                )}
              </h1>
              {artwork.pronunciation && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary/80 text-xs">◆</span>
                  <span className="font-mono text-[13px] tracking-[0.2em] text-secondary/90 lowercase italic">
                    [ {artwork.pronunciation} ]
                  </span>
                </div>
              )}
            </div>
          </FadeInView>

          <FadeInView delay={0.3}>
            <div className="w-12 h-px bg-primary/60 my-12" />
          </FadeInView>

          {/* Structured details — Medium & Size only */}
          <FadeInView delay={0.4}>
            <div className="mb-16 space-y-5">
              <div>
                <h2 className="font-heading text-xs tracking-[0.3em] uppercase mb-2 text-secondary">
                  Medium
                </h2>
                <p className="font-body text-lg leading-relaxed text-foreground/70">
                  {artwork.medium}
                </p>
              </div>
              <div>
                <h2 className="font-heading text-xs tracking-[0.3em] uppercase mb-2 text-secondary">
                  Size
                </h2>
                <p className="font-body text-lg leading-relaxed text-foreground/70">
                  {artwork.dimensions}
                </p>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.5}>
            <div className="w-8 h-px bg-primary/40 mb-12" />
          </FadeInView>

          {/* Meaning */}
          <FadeInView delay={0.6}>
            <div className="mb-16">
              <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground/60 italic">
                {artwork.meaning}
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.8} className="mt-20">
            <Link
              to="/works"
              className="inline-block px-8 py-3 border border-foreground/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:border-primary/60 slow-transition"
            >
              ← Back to Works
            </Link>
          </FadeInView>
        </div>
      </div>
    </PageTransition>
  );
};

export default ArtworkDetail;
