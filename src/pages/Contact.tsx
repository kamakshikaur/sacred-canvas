import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import FadeInView from "@/components/FadeInView";

const Contact = () => {
  useEffect(() => { document.title = "Contact — Kamakshi Kaur"; return () => { document.title = "Kamakshi Kaur"; }; }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-lg text-center">
          <FadeInView>
            <h1 className="font-heading text-4xl md:text-5xl tracking-[0.05em] text-foreground mb-8 text-center">
              Contact
            </h1>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p className="font-body text-xl text-foreground/60 italic leading-relaxed mb-16 text-center">
              If something within you responded, reach out.
            </p>
          </FadeInView>

          <FadeInView delay={0.4}>
            <div className="space-y-6">
              <a
                href="mailto:kamakshikaurolive@gmail.com"
                className="block text-lg tracking-wider text-foreground/70 hover:text-secondary slow-transition font-serif"
              >
                kamakshikaurolive@gmail.com
              </a>
              <a
                href="tel:+918849931464"
                className="block text-lg tracking-wider text-foreground/70 hover:text-secondary slow-transition font-serif"
              >
                +91 8849931464
              </a>
            </div>
          </FadeInView>

          <FadeInView delay={0.6}>
            <div className="w-12 h-px bg-primary/50 mx-auto mt-16" />
          </FadeInView>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
