import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SoundProvider } from "@/context/SoundContext";
import { UIProvider } from "@/context/UIContext";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import InteractiveCursor from "@/components/InteractiveCursor";
import LiquidBackground from "@/components/LiquidBackground";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";
import GalleryOverlay from "@/components/GalleryOverlay";
import Index from "./pages/Index";
import Works from "./pages/Works";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EasterEgg from "@/components/EasterEgg";

import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Disable right-click globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common copy/view-source shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Cmd+C / Ctrl+C (Copy)
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        e.preventDefault();
      }
      // Disable Cmd+U / Ctrl+U (View Source)
      if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        e.preventDefault();
      }
      // Disable Cmd+S / Ctrl+S (Save Page)
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
      }
      // Disable Cmd+Shift+I / F12 (Inspect Element)
      if (((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'i') || e.key === 'F12') {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation} strict>
        <SoundProvider>
          <UIProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <LiquidBackground />
                <InteractiveCursor />
                <VoiceoverPlayer />
                <Navigation />
                <GalleryOverlay />
                <EasterEgg />
                <main className="pb-16">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/works/:id" element={<ArtworkDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </TooltipProvider>
          </UIProvider>
        </SoundProvider>
      </LazyMotion>
    </QueryClientProvider>
  );
};

export default App;
