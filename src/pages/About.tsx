import { useRef, useEffect } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import artistPortrait from "@/assets/artist-portrait.png";
import { Helmet } from "react-helmet-async";

const About = () => {
  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kamakshi Kaur",
    "url": "https://kamakshikaur.com",
    "image": "https://kamakshikaur.com/artist-portrait.png",
    "jobTitle": "Contemporary Artist",
    "description": "Kamakshi Kaur is a contemporary artist focused on mixed media and sacred art, exploring the relationship between being seen and seeing oneself.",
    "knowsAbout": ["Contemporary Art", "Mixed Media", "Sacred Art", "Jewellery Design"]
  };

  useEffect(() => { document.title = "About | Kamakshi Kaur"; }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // Subtle parallax effect on the image
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <PageTransition>
      <Helmet>
        <title>About | Kamakshi Kaur</title>
        <meta name="description" content="Learn about Kamakshi Kaur, a contemporary artist exploring the intersection of identity, memory, and the sacred through mixed media." />
        <script type="application/ld+json">
          {JSON.stringify(artistSchema)}
        </script>
      </Helmet>
      <div className="pt-20 md:pt-40 pb-12 md:pb-24 px-5 sm:px-6 md:px-16" ref={containerRef}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start relative">
          {/* Portrait with parallax — Sticky on desktop */}
          <div className="order-2 md:order-1 md:sticky top-8 md:top-32 lg:top-40">
            <FadeInView>
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <m.div style={{ y: portraitY, scale: portraitScale }} className="w-full h-full">
                  <ProtectedImage
                    src={artistPortrait}
                    alt="The artist in their studio"
                    className="w-full h-full object-cover origin-center"
                    loading="lazy"
                    width={1024}
                    height={1280}
                  />
                </m.div>
              </div>
            </FadeInView>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <FadeInView>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-[0.05em] text-foreground mb-10 md:mb-12">
                About
              </h1>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80 italic mb-8 md:mb-10">
                I am creation, and creation is where I return to myself, to bliss.
              </p>
            </FadeInView>

            <FadeInView delay={0.35}>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/60 mb-4">
                My work begins in stillness, in moments where I turn inward and allow instinct to take the lead. It is less about making something seen, and more about responding to something felt, something that asks to take form without being fully understood.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/60 mb-8">
                Trained in jewellery and product design at NIFT Gandhinagar, my practice is rooted in a sensitivity to form, material, and detail. Yet, my approach to art moves beyond structure. It is guided by curiosity, by an ongoing dialogue between control and surrender, and by a deep interest in how inner experiences take shape in the physical world.
              </p>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="w-12 h-px bg-primary/50 my-10" />
            </FadeInView>

            <FadeInView delay={0.6}>
              <h2 className="font-heading text-xs tracking-[0.3em] uppercase text-secondary/90 mb-6 font-normal">
                Philosophy
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95 mb-4">
                I think of an ever-watchful eye within us, a conscious presence shaped by memory, conditioning, and the silent influence of the world around us. It observes, corrects, and slowly begins to define how we exist. Alongside it flows another awareness, quieter and instinctive, a raw current that does not seek approval, only expression.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95 mb-4">
                My work exists in the tension between these two states. In response to being seen and to seeing ourselves, we begin to form subtle masks, not visible, but deeply lived and quietly embodied. These layers shape how we express, what we conceal, and what we allow to emerge.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95 mb-8">
                I see the body and mind as a vessel through which energy continuously passes. This pure force, <strong className="italic">prana</strong> (Sanskrit word for life force), flows through us. What we create is not the energy itself, but our interpretation of it, shaped by perception, memory, and experience. My practice seeks to hold that moment just before it is altered, where energy exists in its most unguarded and unformed state.
              </p>
            </FadeInView>

            <FadeInView delay={0.75}>
              <h2 className="font-heading text-xs tracking-[0.3em] uppercase text-secondary/90 mb-6 font-normal">
                Why I Create
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95 mb-4">
                I create because it is both a confession and a question.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95 mb-4">
                It allows me to sit with what I do not fully understand, and to give form to thoughts that do not arrive as answers. Each work becomes an attempt to hold something in between, not to resolve it, but to witness it more clearly.
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed text-foreground/95">
                In that process, I find a way to respond to what moves within me, even when it cannot be fully explained.
              </p>
            </FadeInView>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
