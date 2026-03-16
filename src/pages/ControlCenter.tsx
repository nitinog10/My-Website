import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import useLenis from '@/hooks/useLenis';
import AIControlCore from '@/components/control-center/AIControlCore';
import SystemsDeployed from '@/components/control-center/SystemsDeployed';
import TechArchitecture from '@/components/control-center/TechArchitecture';
import ExperienceLogs from '@/components/control-center/ExperienceLogs';

const ControlCenter = () => {
  useLenis();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    document.title = 'AI CONTROL CENTER — NITIN MISHRA';
    
    // Boot sequence
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleCloseModule = () => {
    setActiveModule(null);
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          </div>
          <div className="font-mono text-cyan-400 space-y-2">
            <p className="text-sm animate-pulse">INITIALIZING AI CONTROL CENTER...</p>
            <p className="text-xs text-cyan-400/60">LOADING SYSTEM MODULES</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Scanlines effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.1) 2px, rgba(0,240,255,0.1) 4px)',
        }}
      />

      {/* Main control core */}
      {!activeModule && (
        <AIControlCore onModuleClick={handleModuleClick} />
      )}

      {/* Module panels */}
      <AnimatePresence mode="wait">
        {activeModule === 'systems' && (
          <SystemsDeployed onClose={handleCloseModule} />
        )}
        {activeModule === 'architecture' && (
          <TechArchitecture onClose={handleCloseModule} />
        )}
        {activeModule === 'experience' && (
          <ExperienceLogs onClose={handleCloseModule} />
        )}
        {activeModule === 'models' && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center">
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
          </div>
        )}
        {activeModule === 'active' && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center">
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
          </div>
        )}
        {activeModule === 'code' && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center">
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
          </div>
        )}
      </AnimatePresence>

      {/* Version info */}
      <div className="fixed bottom-4 right-4 text-xs text-white/40 font-mono">
        v1.0.0 • AI CONTROL CENTER
      </div>
    </main>
  );
};

export default ControlCenter;
