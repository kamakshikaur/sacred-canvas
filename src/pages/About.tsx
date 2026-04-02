import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import artistPortrait from "@/assets/artist-portrait.png";

const About = () => {
  useEffect(() => { document.title = "About — Kamakshi Kaur"; return () => { document.title = "Kamakshi Kaur"; }; }, []);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <PageTransition>
      <div className="pt-32 md:pt-40 pb-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Portrait with parallax */}
          <FadeInView className="order-2 md:order-1">
            <div ref={portraitRef} className="aspect-[3/4] overflow-hidden">
              <motion.div style={{ y: portraitY, scale: portraitScale }} className="w-full h-full">
                <ProtectedImage
                  src={artistPortrait}
                  alt="The artist in their studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
              </motion.div>
            </div>
          </FadeInView>

          {/* Text */}
          <div className="order-1 md:order-2">
            <FadeInView>
              <h1 className="font-heading text-4xl md:text-5xl tracking-[0.05em] text-foreground mb-12">
                About
              </h1>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="font-body text-xl leading-relaxed text-foreground/80 italic mb-10">
                I don't paint what I see. I paint what I can't say.
              </p>
            </FadeInView>

            <FadeInView delay={0.35}>
              <p className="font-body text-lg leading-relaxed text-foreground/60 mb-8">
                My work begins in silence — in the space between thought and
                feeling, where language dissolves and something truer emerges.
                Each canvas is a conversation with material: the resistance of
                oil, the surrender of gold leaf, the patience of layered
                pigment.
              </p>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="w-12 h-px bg-primary/50 my-10" />
            </FadeInView>

            <FadeInView delay={0.6}>
              <h2 className="font-heading text-xs tracking-[0.3em] uppercase text-secondary/90 mb-6 font-normal">
                Philosophy
              </h2>
              <p className="font-body text-lg leading-relaxed text-foreground/95 mb-8">
                I believe art should not explain — it should resonate. Like a
                half-remembered dream, a painting should leave you with a feeling
                you can't quite name but recognize as deeply yours. My practice
                is rooted in slowness, in the belief that beauty reveals itself
                only to those willing to wait.
              </p>
            </FadeInView>

            <FadeInView delay={0.75}>
              <h2 className="font-heading text-xs tracking-[0.3em] uppercase text-secondary/90 mb-6 font-normal">
                Why I Create
              </h2>
              <p className="font-body text-lg leading-relaxed text-foreground/95">
                Because the body knows things the mind refuses. Because color can
                hold grief and joy in the same breath. Because somewhere,
                someone will stand before a canvas and feel less alone — and that
                is enough.
              </p>
            </FadeInView>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
