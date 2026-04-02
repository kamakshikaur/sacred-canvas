import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SoundProvider } from "@/context/SoundContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GrainOverlay from "@/components/GrainOverlay";
import InteractiveCursor from "@/components/InteractiveCursor";
import LiquidBackground from "@/components/LiquidBackground";
import VoiceoverPlayer from "@/components/VoiceoverPlayer";
import Index from "./pages/Index";
import Works from "./pages/Works";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SoundProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <LiquidBackground />
          <GrainOverlay />
          <InteractiveCursor />
          <VoiceoverPlayer />
          <Navigation />
          <div className="pb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:id" element={<ArtworkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </SoundProvider>
  </QueryClientProvider>
);

export default App;
