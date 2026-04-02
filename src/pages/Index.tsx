import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import heroEye from "@/assets/hero-eye.png";
import { artworks } from "@/data/artworks";

const Index = () => {
  useEffect(() => { document.title = "Kamakshi Kaur — Contemporary Artist | Oil & Gold Leaf Paintings"; return () => { document.title = "Kamakshi Kaur"; }; }, []);
  const featured = [
    artworks.find(w => w.id === "fractions-of-soul") || artworks[0],
    artworks.find(w => w.id === "sunn") || artworks[1],
    artworks.find(w => w.id === "conclave") || artworks[2],
  ];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Eye zooms in — capped at 12x so the detail stays sharp, not a blurry mess
  const eyeScale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 3.5, 12]);
  const eyeOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const eyeRotate = useTransform(scrollYProgress, [0, 0.9], [0, 45]);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [0.4, 0]);

  return (
    <PageTransition>
      {/* Eye-zoom hero */}
      <div ref={heroRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* The Eye */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ scale: eyeScale, opacity: eyeOpacity, rotate: eyeRotate }}
            animate={{ 
              y: [0, -15, 0],
              rotateZ: [0, 2, -2, 0]
            }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          >
            <ProtectedImage
              src={heroEye}
              alt="Ornate golden eye — enter the art space of Kamakshi Kaur"
              className="w-[55vmin] h-[55vmin] object-cover rounded-full shadow-[0_0_100px_rgba(103,0,17,0.4)]"
            />
          </motion.div>

          {/* Title — "Step Inside" */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY, filter: titleBlur }}
          >
            <motion.h1 
              initial={{ letterSpacing: "0.05em", filter: "blur(15px)", opacity: 0, scale: 0.95 }}
              animate={{ letterSpacing: "0.2em", filter: "blur(0px)", opacity: 0.95, scale: 1 }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading text-secondary drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] uppercase"
              style={{ textShadow: "0px 0px 40px rgba(255,160,100,0.6)" }}
            >
              Step Inside
            </motion.h1>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
            style={{ opacity: scrollHintOpacity }}
          >
            <div className="w-px h-12 bg-foreground/40 mx-auto mb-2" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Scroll
            </span>
          </motion.div>

          {/* Bottom gradient — eliminates the harsh horizontal cut */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #0a0505)" }}
          />
        </div>
      </div>

      {/* Artist quote — overlaps upward with glass effect, text is lowered for spacing */}
      <section className="relative -mt-24 pt-44 pb-32 md:pb-40 px-8 z-10 backdrop-blur-2xl bg-black/30 w-full rounded-t-[2rem] shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInView>
            <p 
              className="font-heading text-3xl md:text-5xl leading-relaxed italic text-foreground tracking-wide"
            >
              "What is created completes within you."
            </p>
          </FadeInView>
          <FadeInView delay={0.15} className="mt-16">
            <MagneticButton>
              <Link
                to="/works"
                className="px-8 py-3 border border-foreground/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:border-primary/60 slow-transition"
              >
                View Works
              </Link>
            </MagneticButton>
          </FadeInView>
        </div>
      </section>

      {/* Featured works */}
      <section className="px-8 md:px-16 py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
          {featured.map((work, i) => {
            const layouts = [
              "md:col-span-8 md:col-start-3",
              "md:col-span-6 md:col-start-1 md:-mt-24",
              "md:col-span-5 md:col-start-4 md:-mt-12",
            ];
            return (
              <FadeInView key={work.id} delay={i * 0.06} className={layouts[i]}>
                <Link to={`/works/${work.id}`} className="block group artwork-item relative">
                  <div className="relative isolate flex justify-center items-center">
                    <ProtectedImage
                      src={work.image}
                      alt={work.title}
                      className="relative w-full h-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02] group-hover:drop-shadow-[0_20px_40px_rgba(163,0,27,0.25)] group-hover:-translate-y-2"
                      style={{ transitionProperty: "transform, filter" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 antialiased">
                    <h3 className="font-heading text-xl font-medium tracking-wide text-secondary/95 group-hover:italic transition-all duration-500">
                      {work.title}
                    </h3>
                  </div>
                </Link>
              </FadeInView>
            );
          })}
        </div>

        <FadeInView delay={0.08} className="text-center mt-24">
          <MagneticButton>
            <Link
              to="/works"
              className="inline-block px-8 py-3 border border-foreground/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:border-primary/60 slow-transition"
            >
              Explore the Works
            </Link>
          </MagneticButton>
        </FadeInView>
      </section>

      {/* Emotional CTA */}
      <section className="py-32 md:py-40 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInView>
            <div className="w-12 h-px bg-primary/40 mx-auto mb-16" />
          </FadeInView>
          <FadeInView delay={0.08}>
            <p className="font-heading text-2xl md:text-3xl italic text-foreground/95 drop-shadow-md leading-relaxed mb-12">
              "If something within you responded — step closer."
            </p>
          </FadeInView>
          <FadeInView delay={0.12}>
            <MagneticButton pull={40}>
              <Link
                to="/contact"
                className="group inline-block relative px-10 py-4 border border-foreground/30 bg-background/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/95 hover:text-secondary hover:border-secondary/40 slow-transition"
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </FadeInView>
          <FadeInView delay={0.14}>
            <div className="w-12 h-px bg-primary/40 mx-auto mt-16" />
          </FadeInView>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
