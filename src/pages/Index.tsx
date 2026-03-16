import { useEffect, useState } from 'react';
import useLenis from '@/hooks/useLenis';
import MagneticCursor from '@/components/MagneticCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import ScrollProgress from '@/components/ScrollProgress';
import AIControlCore from '@/components/control-center/AIControlCore';
import SystemsDeployed from '@/components/control-center/SystemsDeployed';
import TechArchitecture from '@/components/control-center/TechArchitecture';
import ExperienceLogs from '@/components/control-center/ExperienceLogs';
import RecognitionSection from '@/components/RecognitionSection';
import ContactSection from '@/components/ContactSection';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  useLenis();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showCore, setShowCore] = useState(true);

  useEffect(() => {
    document.title = 'AI CONTROL CENTER — NITIN MISHRA';
  }, []);

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setShowCore(false);
  };

  const handleCloseModule = () => {
    setActiveModule(null);
    setShowCore(true);
  };

  return (
    <main className="relative bg-black text-white font-mono overflow-x-hidden">
      {/* Custom cursor */}
      <MagneticCursor />
      
      {/* Noise overlay */}
      <NoiseOverlay />
      
      {/* Scroll progress */}
      <ScrollProgress />

      {/* Scanlines effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 z-50"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.1) 2px, rgba(0,240,255,0.1) 4px)',
        }}
      />

      {/* AI Control Core Dashboard */}
      <AnimatePresence mode="wait">
        {showCore && !activeModule && (
          <motion.div
            key="core"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AIControlCore onModuleClick={handleModuleClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Panels */}
      <AnimatePresence mode="wait">
        {activeModule === 'systems' && (
          <SystemsDeployed key="systems" onClose={handleCloseModule} />
        )}
        {activeModule === 'architecture' && (
          <TechArchitecture key="architecture" onClose={handleCloseModule} />
        )}
        {activeModule === 'experience' && (
          <ExperienceLogs key="experience" onClose={handleCloseModule} />
        )}
        {activeModule === 'models' && (
          <motion.div
            key="models"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="text-3xl font-black uppercase text-white mb-2">AI MODELS</h2>
              <p className="text-yellow-400 font-mono text-sm mb-6">MODULE IN DEVELOPMENT</p>
              <button
                onClick={handleCloseModule}
                className="px-6 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 font-mono text-sm hover:bg-yellow-500/30 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        )}
        {activeModule === 'active' && (
          <motion.div
            key="active"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">🔴</span>
              </div>
              <h2 className="text-3xl font-black uppercase text-white mb-2">ACTIVE PROJECTS</h2>
              <p className="text-red-400 font-mono text-sm mb-6">MODULE IN DEVELOPMENT</p>
              <button
                onClick={handleCloseModule}
                className="px-6 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-sm hover:bg-red-500/30 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        )}
        {activeModule === 'code' && (
          <motion.div
            key="code"
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h2 className="text-3xl font-black uppercase text-white mb-2">CODE SYSTEMS</h2>
              <p className="text-purple-400 font-mono text-sm mb-6">MODULE IN DEVELOPMENT</p>
              <button
                onClick={handleCloseModule}
                className="px-6 py-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-400 font-mono text-sm hover:bg-purple-500/30 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional sections that scroll after core */}
      {showCore && !activeModule && (
        <div className="relative z-10">
          <RecognitionSection />
          <ContactSection />
        </div>
      )}

      {/* Version info */}
      <div className="fixed bottom-4 right-4 text-xs text-white/40 font-mono z-50">
        v1.0.0 • AI CONTROL CENTER
      </div>
    </main>
  );
};

export default Index;
