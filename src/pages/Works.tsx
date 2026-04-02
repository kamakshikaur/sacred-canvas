import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";
import ProtectedImage from "@/components/ProtectedImage";
import TiltCard from "@/components/TiltCard";
import { artworks } from "@/data/artworks";
import portfolioCover from "@/assets/portfolio-cover.png";

const gridItems = [
  { colSpan: "md:col-span-7", colStart: "md:col-start-1", featured: true },
  { colSpan: "md:col-span-5", colStart: "md:col-start-8", featured: false },
  { colSpan: "md:col-span-5", colStart: "md:col-start-2", featured: false },
  { colSpan: "md:col-span-6", colStart: "md:col-start-7", featured: true },
  { colSpan: "md:col-span-7", colStart: "md:col-start-1", featured: true },
  { colSpan: "md:col-span-5", colStart: "md:col-start-8", featured: false },
  { colSpan: "md:col-span-6", colStart: "md:col-start-1", featured: true },
  { colSpan: "md:col-span-5", colStart: "md:col-start-7", featured: false },
  { colSpan: "md:col-span-5", colStart: "md:col-start-2", featured: false },
  { colSpan: "md:col-span-7", colStart: "md:col-start-6", featured: true },
  { colSpan: "md:col-span-10", colStart: "md:col-start-2", featured: true },
];

const Works = () => {
  useEffect(() => { document.title = "Works — Kamakshi Kaur"; return () => { document.title = "Kamakshi Kaur"; }; }, []);

  return (
    <PageTransition>
      <div className="pt-32 md:pt-40 pb-24 px-8 md:px-16">
        <FadeInView>
          <h1 className="font-heading text-4xl md:text-6xl tracking-[0.05em] mb-4 text-inherit opacity-85">
            Works
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-xl mb-24">
            "Meant to be felt, as much as seen."
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-28 gap-x-8">
          {artworks.map((work, i) => {
            const item = gridItems[i % gridItems.length];
            return (
              <FadeInView
                key={work.id}
                delay={i * 0.05}
                className={`${item.colSpan} ${item.colStart}`}
              >
                <Link to={`/works/${work.id}`} className="block group relative">
                  <div className="relative isolate">
                    {/* Red glow — static gradient, only opacity transitions (zero filter cost) */}
                    <div
                      className="absolute -inset-10 md:-inset-16 rounded-[50%] opacity-0 group-hover:opacity-100 transition-opacity ease-out -z-10"
                      style={{
                        transitionDuration: "1.2s",
                        background: "radial-gradient(ellipse at center, rgba(163,0,27,0.4) 0%, rgba(103,0,17,0.15) 50%, transparent 70%)",
                      }}
                    />
                    <ProtectedImage
                      src={work.image}
                      alt={work.title}
                      className={`relative w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                        item.featured ? "max-h-[70vh]" : "max-h-[50vh]"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 antialiased">
                    <h3 className="font-heading text-xl font-medium tracking-wide text-secondary/95 group-hover:italic transition-all duration-500">
                      {work.title}
                    </h3>
                    <p className="font-body text-sm font-medium tracking-wide text-foreground/85 mt-1.5">
                      {work.medium}
                    </p>
                  </div>
                </Link>
              </FadeInView>
            );
          })}
        </div>

        {/* Portfolio Section */}
        <FadeInView delay={0.1} className="mt-32 md:mt-40">
          <div className="w-12 h-px bg-primary/40 mx-auto mb-16" />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl tracking-[0.05em] text-foreground/80 mb-6">
              Portfolio
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-10 italic">
              A curated selection of works, collected in one place.
            </p>
            <a
              href="/Kamakshi-Kaur-Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <div className="relative overflow-hidden max-w-md mx-auto mb-8">
                <ProtectedImage
                  src={portfolioCover}
                  alt="Portfolio"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-700" />
              </div>
              <span className="inline-block px-8 py-3 border border-foreground/20 font-body text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground hover:border-primary/60 slow-transition">
                View Portfolio ↗
              </span>
            </a>
          </div>
        </FadeInView>
      </div>
    </PageTransition>
  );
};

export default Works;
