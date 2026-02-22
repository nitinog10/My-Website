import { useEffect } from 'react';
import useLenis from '@/hooks/useLenis';
import NoiseOverlay from '@/components/NoiseOverlay';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import TechStackSection from '@/components/TechStackSection';
import RecognitionSection from '@/components/RecognitionSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  useLenis();

  useEffect(() => {
    document.title = 'NITIN MISHRA — AI DEVELOPER';
  }, []);

  return (
    <main className="relative text-foreground font-mono scrollbar-hide" style={{ position: 'relative' }}>
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
        
        {/* Main sections with continuous center timeline */}
        <div className="relative">
          {/* Continuous center line running through all major sections */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block pointer-events-none z-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(0,255,200,0.15) 5%, rgba(0,255,200,0.15) 95%, transparent)'
            }}
          />
          
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <RecognitionSection />
        </div>
        
        <TechStackSection />
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;
