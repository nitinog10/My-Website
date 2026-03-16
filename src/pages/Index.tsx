import { useEffect } from 'react';
import MagneticCursor from '@/components/MagneticCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import PortfolioGateways from '@/components/PortfolioGateways';
import TechStackSection from '@/components/TechStackSection';
import RecognitionSection from '@/components/RecognitionSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  useEffect(() => {
    document.title = 'NITIN MISHRA — AI DEVELOPER';
  }, []);

  return (
    <main className="relative text-foreground font-mono scrollbar-hide" style={{ position: 'relative', cursor: 'none' }}>
      {/* Custom viewfinder cursor */}
      <MagneticCursor />

      {/* Animated abstract background */}
      <AnimatedBackground />
      
      {/* Noise texture overlay */}
      <NoiseOverlay />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Hero with zoom effect */}
      <HeroSection />
      
      {/* Main content after hero transition */}
      <div className="relative z-10">
        <IntroSection />

        <PortfolioGateways />
        <RecognitionSection />
        
        <TechStackSection />
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;
