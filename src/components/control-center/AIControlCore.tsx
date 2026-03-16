import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Terminal, Cpu, Database, Zap, Activity, Code2 } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
  status: 'active' | 'idle' | 'processing';
}

const modules: Module[] = [
  {
    id: 'systems',
    name: 'SYSTEMS DEPLOYED',
    icon: Terminal,
    color: '#00F0FF',
    position: { x: -200, y: -150 },
    status: 'active',
  },
  {
    id: 'architecture',
    name: 'TECH ARCHITECTURE',
    icon: Cpu,
    color: '#FF00F5',
    position: { x: 200, y: -150 },
    status: 'active',
  },
  {
    id: 'experience',
    name: 'EXPERIENCE LOGS',
    icon: Database,
    color: '#00FF94',
    position: { x: -200, y: 150 },
    status: 'idle',
  },
  {
    id: 'models',
    name: 'AI MODELS',
    icon: Zap,
    color: '#FFD700',
    position: { x: 200, y: 150 },
    status: 'processing',
  },
  {
    id: 'active',
    name: 'ACTIVE PROJECTS',
    icon: Activity,
    color: '#FF6B6B',
    position: { x: 0, y: -220 },
    status: 'active',
  },
  {
    id: 'code',
    name: 'CODE SYSTEMS',
    icon: Code2,
    color: '#9D4EDD',
    position: { x: 0, y: 220 },
    status: 'idle',
  },
];

interface AIControlCoreProps {
  onModuleClick: (moduleId: string) => void;
}

const AIControlCore = ({ onModuleClick }: AIControlCoreProps) => {
  const coreRef = useRef<HTMLDivElement>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!coreRef.current) return;

    // Animate core entrance
    gsap.fromTo(
      coreRef.current,
      { scale: 0, opacity: 0, rotateZ: -180 },
      {
        scale: 1,
        opacity: 1,
        rotateZ: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Continuous pulse animation
    gsap.to(coreRef.current, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />

      {/* Central Core */}
      <motion.div
        ref={coreRef}
        className="relative w-80 h-80 rounded-full border-4 border-cyan-500/30 bg-black/50 backdrop-blur-xl flex items-center justify-center"
        style={{
          boxShadow: '0 0 60px rgba(0,240,255,0.3), inset 0 0 60px rgba(0,240,255,0.1)',
        }}
      >
        {/* Inner rings */}
        <div className="absolute inset-8 rounded-full border-2 border-cyan-500/20 animate-spin-slow" />
        <div className="absolute inset-16 rounded-full border border-cyan-500/10 animate-spin-reverse" />

        {/* Core content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Cpu className="w-16 h-16 text-cyan-400 mx-auto" />
          </motion.div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white mb-2">
            AI CONTROL
          </h1>
          <p className="text-sm text-cyan-400 font-mono mb-4">CORE SYSTEM</p>
          <div className="text-xs text-white/60 font-mono">
            {time.toLocaleTimeString()}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono">ONLINE</span>
          </div>
        </div>

        {/* Scanning line */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.3) 50%, transparent 100%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Module Nodes */}
      {modules.map((module, index) => {
        const IconComponent = module.icon;
        const isHovered = hoveredModule === module.id;

        return (
          <motion.div
            key={module.id}
            className="absolute cursor-pointer group"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${module.position.x}px), calc(-50% + ${module.position.y}px))`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            onHoverStart={() => setHoveredModule(module.id)}
            onHoverEnd={() => setHoveredModule(null)}
            onClick={() => onModuleClick(module.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Connection line to core */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{
                width: '400px',
                height: '400px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <line
                x1="200"
                y1="200"
                x2={200 - module.position.x}
                y2={200 - module.position.y}
                stroke={module.color}
                strokeWidth="2"
                opacity={isHovered ? 0.6 : 0.2}
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>

            {/* Module panel */}
            <div
              className="relative w-48 p-4 rounded-xl border-2 bg-black/80 backdrop-blur-md transition-all duration-300"
              style={{
                borderColor: isHovered ? module.color : `${module.color}40`,
                boxShadow: isHovered
                  ? `0 0 30px ${module.color}80`
                  : `0 0 10px ${module.color}20`,
              }}
            >
              {/* Status indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    module.status === 'active'
                      ? 'bg-green-400 animate-pulse'
                      : module.status === 'processing'
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-gray-400'
                  }`}
                />
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${module.color}20`,
                  border: `1px solid ${module.color}40`,
                }}
              >
                <IconComponent className="w-6 h-6" style={{ color: module.color }} />
              </div>

              {/* Name */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
                {module.name}
              </h3>
              <p className="text-xs text-white/60 font-mono">
                {module.status.toUpperCase()}
              </p>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${module.color}20, transparent)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* System info overlay */}
      <div className="absolute top-8 left-8 text-left">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
          <p className="text-xs text-cyan-400 font-mono mb-2">SYSTEM STATUS</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
              <div className="w-1 h-1 rounded-full bg-green-400" />
              <span>CORE: OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
              <div className="w-1 h-1 rounded-full bg-green-400" />
              <span>MODULES: {modules.length} ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
              <div className="w-1 h-1 rounded-full bg-yellow-400" />
              <span>AI: PROCESSING</span>
            </div>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="absolute top-8 right-8 text-right">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
          <p className="text-xs text-cyan-400 font-mono mb-2">OPERATOR</p>
          <p className="text-sm font-bold text-white">NITIN MISHRA</p>
          <p className="text-xs text-white/60 font-mono">AI ENGINEER</p>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">
          Click modules to explore systems
        </p>
      </motion.div>
    </div>
  );
};

export default AIControlCore;
