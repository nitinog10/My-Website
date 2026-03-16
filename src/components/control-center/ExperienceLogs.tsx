import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { X, Terminal, ChevronRight } from 'lucide-react';

const logs = [
  {
    timestamp: '2025.03',
    level: 'SYSTEM',
    message: 'Initialized CO-FOUNDER role at BUGBICEPS.IN',
    details: 'Building innovative tech solutions. Leading product vision and architecture.',
    tags: ['Entrepreneurship', 'Product', 'Leadership'],
    color: '#FF6B6B',
  },
  {
    timestamp: '2025.01',
    level: 'ADMIN',
    message: 'Elevated to HEAD ALUMNI at OIST BHOPAL',
    details: 'Managing 500+ alumni network. Organizing technical workshops and industry partnerships.',
    tags: ['Community', 'Strategy', 'Mentorship'],
    color: '#4ECDC4',
  },
  {
    timestamp: '2024.08',
    level: 'PROCESS',
    message: 'Deployed AI DEVELOPER systems at TECHBUS',
    details: 'Engineered NLP models with 95%+ accuracy. Integrated AI into CRM workflows.',
    tags: ['AI', 'NLP', 'Remote'],
    color: '#FFA502',
  },
  {
    timestamp: '2024.05',
    level: 'PROCESS',
    message: 'Executed INTERN protocols at ENTOPLEARNING',
    details: 'Built foundational LMS modules. Optimized database queries and caching.',
    tags: ['Backend', 'LMS', 'Python'],
    color: '#45B7D1',
  },
  {
    timestamp: '2024.01',
    level: 'SYSTEM',
    message: 'Started B.TECH (AIML) at ORIENTAL GROUP',
    details: 'Specializing in AI/ML architecture. Building next-gen AI systems.',
    tags: ['AIML', 'Engineering', 'Research'],
    color: '#95E1D3',
  },
  {
    timestamp: '2023.10',
    level: 'SUCCESS',
    message: 'Won NASA SPACE APPS CHALLENGE',
    details: 'Built AtmoPredict - Climate intelligence system with 94.2% accuracy.',
    tags: ['Achievement', 'AI', 'Global'],
    color: '#00F0FF',
  },
  {
    timestamp: '2023.06',
    level: 'PROCESS',
    message: 'Deployed AIRPULSE - National AQI system',
    details: 'Real-time air quality monitoring across 50+ cities.',
    tags: ['Environment', 'ML', 'Impact'],
    color: '#00FF94',
  },
  {
    timestamp: '2023.03',
    level: 'PROCESS',
    message: 'Launched CAMPUS MITRA - AI Assistant',
    details: 'RAG-powered institutional AI handling 1000+ queries/day.',
    tags: ['LLM', 'RAG', 'Enterprise'],
    color: '#FFD700',
  },
];

interface ExperienceLogsProps {
  onClose: () => void;
}

const LogEntry = ({ log, index }: any) => {
  const logRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!logRef.current) return;

    gsap.fromTo(
      logRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      }
    );
  }, [index]);

  useEffect(() => {
    if (!isExpanded) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let currentIndex = 0;
    const text = log.details;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isExpanded, log.details]);

  return (
    <motion.div
      ref={logRef}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="p-4 rounded-lg border bg-black/60 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-all"
        style={{ borderColor: `${log.color}40` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Log header */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 font-mono text-xs text-white/60">
            {log.timestamp}
          </div>
          
          <div
            className="flex-shrink-0 px-2 py-1 rounded text-xs font-bold uppercase"
            style={{
              backgroundColor: `${log.color}20`,
              color: log.color,
            }}
          >
            {log.level}
          </div>

          <div className="flex-1">
            <p className="text-sm text-white font-mono">{log.message}</p>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-4 h-4 text-white/60" />
          </motion.div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pl-4 border-l-2" style={{ borderColor: log.color }}>
                <p className="text-sm text-white/80 font-mono mb-4">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 ml-1 bg-white/80 animate-pulse" />
                  )}
                </p>

                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-white/10 border border-white/20 text-white/70 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ExperienceLogs = ({ onClose }: ExperienceLogsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Simulate terminal boot sequence
    const lines = terminalRef.current.querySelectorAll('.boot-line');
    gsap.fromTo(
      lines,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <button
            onClick={onClose}
            className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-mono uppercase">Close Module</span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                EXPERIENCE LOGS
              </h1>
              <p className="text-sm text-green-400 font-mono">
                SYSTEM TIMELINE • {logs.length} ENTRIES
              </p>
            </div>
          </div>
        </div>

        {/* Terminal boot sequence */}
        <div className="max-w-5xl mx-auto mb-8">
          <div
            ref={terminalRef}
            className="p-6 rounded-xl border border-green-500/30 bg-black/80 backdrop-blur-md font-mono text-sm"
          >
            <div className="boot-line text-green-400 mb-2">
              {'>'} INITIALIZING EXPERIENCE LOG SYSTEM...
            </div>
            <div className="boot-line text-green-400 mb-2">
              {'>'} LOADING CAREER TIMELINE...
            </div>
            <div className="boot-line text-green-400 mb-2">
              {'>'} PARSING {logs.length} LOG ENTRIES...
            </div>
            <div className="boot-line text-green-400">
              {'>'} SYSTEM READY. DISPLAYING LOGS ▼
            </div>
          </div>
        </div>

        {/* Log entries */}
        <div className="max-w-5xl mx-auto space-y-4">
          {logs.map((log, index) => (
            <LogEntry key={index} log={log} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="p-6 rounded-xl border border-green-500/30 bg-black/60 backdrop-blur-md">
            <p className="text-sm text-green-400 font-mono mb-2">
              {'>'} END OF LOG STREAM
            </p>
            <p className="text-xs text-white/60 font-mono">
              Total entries: {logs.length} • Status: ACTIVE • Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceLogs;
