import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { X, ExternalLink, Github, Activity, CheckCircle, Clock } from 'lucide-react';

const systems = [
  {
    id: 'sys-001',
    name: 'ATMOPREDICT',
    status: 'active',
    type: 'Climate Intelligence',
    description: 'NASA Space Apps Challenge winner. Advanced ML system for climate prediction using satellite data.',
    features: [
      'Real-time anomaly detection',
      'Interactive 3D visualizations',
      '94.2% prediction accuracy',
      'Global impact analysis',
    ],
    tech: ['Python', 'ML', 'Satellite Data', 'Data Science'],
    architecture: 'Microservices + ML Pipeline',
    github: 'https://github.com/nitinog10/AtmoPredict.git',
    color: '#00F0FF',
    uptime: '99.8%',
    requests: '50K+',
  },
  {
    id: 'sys-002',
    name: 'AIRPULSE',
    status: 'active',
    type: 'Air Quality Network',
    description: 'Real-time national AQI analysis ecosystem with predictive modeling across 50+ cities.',
    features: [
      'Real-time data streaming',
      'Predictive analytics',
      'Geospatial visualization',
      '10K+ active users',
    ],
    tech: ['Streamlit', 'ML', 'Analytics', 'Geospatial'],
    architecture: 'Event-Driven + Real-time Processing',
    github: 'https://github.com/nitinog10/air-pulse.git',
    color: '#00FF94',
    uptime: '99.9%',
    requests: '100K+',
  },
  {
    id: 'sys-003',
    name: 'CAMPUS MITRA',
    status: 'processing',
    type: 'Institutional AI',
    description: 'Enterprise RAG-powered AI with multi-agent orchestration for institutional assistance.',
    features: [
      '1000+ queries/day',
      '96.8% accuracy',
      'Sub-2s response time',
      '24/7 availability',
    ],
    tech: ['LLMs', 'RAG', 'Python', 'FastAPI'],
    architecture: 'Multi-Agent + RAG System',
    github: 'https://github.com/nitinog10/Campus-mitra.git',
    color: '#FFD700',
    uptime: '99.5%',
    requests: '1M+',
  },
  {
    id: 'sys-004',
    name: 'BHARATTRIPAI',
    status: 'active',
    type: 'Travel Intelligence',
    description: 'NLP-powered travel assistant for Indian cultural discovery with semantic search.',
    features: [
      '5K+ locations',
      '10+ languages',
      '98% cultural accuracy',
      'Hidden gem discovery',
    ],
    tech: ['NLP', 'Travel AI', 'FastAPI', 'Semantic Search'],
    architecture: 'NLP Pipeline + Knowledge Graph',
    github: 'https://github.com/nitinog10/Beta-20-.git',
    color: '#FF00F5',
    uptime: '99.7%',
    requests: '75K+',
  },
  {
    id: 'sys-005',
    name: 'FOUNDATION LMS',
    status: 'completed',
    type: 'Learning Platform',
    description: 'Enterprise learning management with microservices architecture for 50K+ students.',
    features: [
      '50K+ students',
      '99.9% uptime',
      '10K RPS handling',
      'Real-time collaboration',
    ],
    tech: ['React', 'Architecture', 'Convex', 'NodeJS'],
    architecture: 'Microservices + Event Sourcing',
    github: 'https://github.com/nitinog10/Learning-management-system.git',
    color: '#9D4EDD',
    uptime: '99.9%',
    requests: '500K+',
  },
];

interface SystemsDeployedProps {
  onClose: () => void;
}

const SystemCard = ({ system, onClick }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  }, []);

  const StatusIcon =
    system.status === 'active'
      ? Activity
      : system.status === 'completed'
      ? CheckCircle
      : Clock;

  return (
    <motion.div
      ref={cardRef}
      className="relative p-6 rounded-xl border-2 bg-black/60 backdrop-blur-md cursor-pointer group"
      style={{
        borderColor: `${system.color}40`,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 30px ${system.color}40`,
      }}
      onClick={onClick}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <StatusIcon className="w-4 h-4" style={{ color: system.color }} />
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: system.color }}
          >
            {system.status}
          </span>
        </div>
        <span className="text-xs text-white/60 font-mono">{system.id}</span>
      </div>

      {/* System name */}
      <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
        {system.name}
      </h3>
      <p className="text-sm font-semibold mb-3" style={{ color: system.color }}>
        {system.type}
      </p>

      {/* Description */}
      <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-2">
        {system.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 mb-1">UPTIME</p>
          <p className="text-lg font-bold text-white">{system.uptime}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 mb-1">REQUESTS</p>
          <p className="text-lg font-bold text-white">{system.requests}</p>
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {system.tech.slice(0, 3).map((tech: string) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded bg-white/10 border border-white/20 text-white/80 font-mono"
          >
            {tech}
          </span>
        ))}
        {system.tech.length > 3 && (
          <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/20 text-white/60 font-mono">
            +{system.tech.length - 3}
          </span>
        )}
      </div>

      {/* Hover indicator */}
      <motion.div
        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: system.color }}
      >
        <ExternalLink className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

const SystemDetail = ({ system, onClose }: any) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      <motion.div
        className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-black/95 rounded-2xl border-2 p-8"
        style={{ borderColor: `${system.color}40` }}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold uppercase"
              style={{
                backgroundColor: `${system.color}20`,
                border: `1px solid ${system.color}`,
                color: system.color,
              }}
            >
              {system.status}
            </div>
            <span className="text-xs text-white/60 font-mono">{system.id}</span>
          </div>

          <h2 className="text-5xl font-black uppercase tracking-tight text-white mb-3">
            {system.name}
          </h2>
          <p className="text-xl font-semibold mb-4" style={{ color: system.color }}>
            {system.type}
          </p>
          <p className="text-lg text-white/80 leading-relaxed">{system.description}</p>
        </div>

        {/* System metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-2">UPTIME</p>
            <p className="text-3xl font-black text-white">{system.uptime}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-2">REQUESTS</p>
            <p className="text-3xl font-black text-white">{system.requests}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-2">ARCHITECTURE</p>
            <p className="text-sm font-bold text-white">{system.architecture}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
            KEY FEATURES
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {system.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5"
                  style={{ backgroundColor: system.color }}
                />
                <p className="text-sm text-white/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
            TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-3">
            {system.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: `${system.color}20`,
                  border: `1px solid ${system.color}40`,
                  color: system.color,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={system.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase text-sm transition-all"
            style={{
              backgroundColor: system.color,
              color: '#000',
            }}
          >
            <Github className="w-5 h-5" />
            View Code
          </a>
          <a
            href={system.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 font-bold uppercase text-sm text-white hover:bg-white/20 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SystemsDeployed = ({ onClose }: SystemsDeployedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSystem, setSelectedSystem] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="min-h-screen p-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-12">
            <button
              onClick={onClose}
              className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-mono uppercase">Close Module</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                  SYSTEMS DEPLOYED
                </h1>
                <p className="text-sm text-cyan-400 font-mono">
                  {systems.length} ACTIVE SYSTEMS
                </p>
              </div>
            </div>
          </div>

          {/* Systems grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system, i) => (
              <SystemCard
                key={system.id}
                system={system}
                onClick={() => setSelectedSystem(system)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* System detail modal */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemDetail system={selectedSystem} onClose={() => setSelectedSystem(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SystemsDeployed;
