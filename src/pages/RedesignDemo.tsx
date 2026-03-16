import { useEffect } from 'react';
import useLenis from '@/hooks/useLenis';
import MagneticCursor from '@/components/MagneticCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import ScrollProgress from '@/components/ScrollProgress';
import TechEcosystem from '@/components/redesign/TechEcosystem';
import ExperienceJourney from '@/components/redesign/ExperienceJourney';
import ProjectsShowcase from '@/components/redesign/ProjectsShowcase';
import DesignToggle from '@/components/DesignToggle';
import { motion } from 'framer-motion';

const RedesignDemo = () => {
  useLenis();

  useEffect(() => {
    document.title = 'PORTFOLIO REDESIGN — NITIN MISHRA';
  }, []);

  return (
    <main className="relative bg-black text-white font-mono" style={{ cursor: 'none' }}>
      {/* Custom cursor */}
      <MagneticCursor />

      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Hero intro */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent" />
        
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-xs tracking-[0.5em] text-accent uppercase font-bold mb-6 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Portfolio Redesign 2025
          </motion.span>
          
          <h1 className="text-[clamp(3rem, 12vw, 10rem)] font-black uppercase tracking-tighter leading-[0.85] mb-6">
            IMMERSIVE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-purple-500">
              EXPERIENCE
            </span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
            Three completely reimagined sections featuring cinematic motion design,
            interactive 3D elements, and scroll-driven storytelling.
          </p>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px w-12 bg-accent" />
            <span className="text-sm text-white/60 uppercase tracking-wider">Scroll to explore</span>
            <div className="h-px w-12 bg-accent" />
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </section>

      {/* Redesigned sections */}
      <TechEcosystem />
      <ExperienceJourney />
      <ProjectsShowcase />

      {/* Footer */}
      <section className="relative py-20 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-white/60 mb-8">
              These are just three sections. The full portfolio experience awaits.
            </p>
            <motion.a
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-black font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Portfolio
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RedesignDemo;
