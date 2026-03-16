import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Layers, Zap, Database, Cloud, Sparkles, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: Brain,
    color: '#FF6B6B',
    skills: [
      'Generative AI (LLMs, RAG)',
      'Computer Vision',
      'NLP & Fine-Tuning',
      'Multi-Agent Systems',
      'PyTorch & TensorFlow',
      'Transformers & Keras'
    ],
    position: { x: 15, y: 20 }
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    icon: Code,
    color: '#4ECDC4',
    skills: [
      'React & Next.js',
      'Node.js & FastAPI',
      'TypeScript',
      'Tailwind CSS',
      'GSAP Animations',
      'Three.js & 3D Web'
    ],
    position: { x: 75, y: 25 }
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    icon: Layers,
    color: '#45B7D1',
    skills: [
      'Scalable AI Systems',
      'Microservices',
      'API Design',
      'MCP Servers',
      'Cloud-Native Apps',
      'CI/CD Pipelines'
    ],
    position: { x: 85, y: 70 }
  },
  {
    id: 'data',
    title: 'Data Engineering',
    icon: Database,
    color: '#95E1D3',
    skills: [
      'Pandas & NumPy',
      'Data Pipelines',
      'MongoDB',
      'PostgreSQL',
      'Vector Databases',
      'ETL Processes'
    ],
    position: { x: 20, y: 75 }
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: '#FFA502',
    skills: [
      'AWS & GCP',
      'Docker & Kubernetes',
      'Serverless',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Git & Version Control'
    ],
    position: { x: 50, y: 50 }
  }
];

const SkillNode = ({ category, index, onHover, activeNode }: any) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;
  const isActive = activeNode === category.id;

  useEffect(() => {
    if (!nodeRef.current) return;

    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, scale: 0, rotate: -180 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: nodeRef.current.closest('section'),
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer group"
      style={{
        left: `${category.position.x}%`,
        top: `${category.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onHoverStart={() => {
        setIsHovered(true);
        onHover(category.id);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        onHover(null);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          width: '120px',
          height: '120px',
          border: `2px solid ${category.color}`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.5, 0, 0.5] : 0.3,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main node */}
      <motion.div
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${category.color}40, ${category.color}20)`,
          border: `2px solid ${category.color}`,
          boxShadow: isActive 
            ? `0 0 40px ${category.color}80, inset 0 0 20px ${category.color}40`
            : `0 0 20px ${category.color}40`,
        }}
        animate={{
          boxShadow: isActive
            ? `0 0 40px ${category.color}80, inset 0 0 20px ${category.color}40`
            : `0 0 20px ${category.color}40`,
        }}
      >
        <IconComponent 
          className="w-10 h-10 transition-all duration-300"
          style={{ 
            color: category.color,
            filter: `drop-shadow(0 0 8px ${category.color})`,
          }} 
        />
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.15 }}
      >
        <p 
          className="text-xs font-bold text-center uppercase tracking-wider"
          style={{ color: category.color }}
        >
          {category.title}
        </p>
      </motion.div>

      {/* Skills panel on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-72 z-50 pointer-events-none"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="p-6 rounded-2xl backdrop-blur-xl"
              style={{
                background: 'rgba(10, 10, 10, 0.95)',
                border: `2px solid ${category.color}60`,
                boxShadow: `0 8px 32px ${category.color}30, 0 0 60px ${category.color}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: category.color }} />
                </motion.div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                  {category.title}
                </h4>
              </div>
              <div className="space-y-2.5">
                {category.skills.map((skill: string, i: number) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                    <span className="text-sm text-white/80 leading-relaxed">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ConnectionLines = ({ activeNode }: any) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFA502" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {skillCategories.map((cat1, i) => 
        skillCategories.slice(i + 1).map((cat2) => {
          const isActive = activeNode === cat1.id || activeNode === cat2.id;
          return (
            <motion.line
              key={`${cat1.id}-${cat2.id}`}
              x1={`${cat1.position.x}%`}
              y1={`${cat1.position.y}%`}
              x2={`${cat2.position.x}%`}
              y2={`${cat2.position.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth={isActive ? "2" : "1"}
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive ? 0.6 : 0.2,
              }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })
      )}
    </svg>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-50" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
            002 — SKILL CONSTELLATION
          </span>
          <h2 className="text-[clamp(3rem, 10vw, 8rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
            WHAT I<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              WORK WITH
            </span>
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl text-lg">
            Hover over nodes to explore skills in each domain
          </p>
        </motion.div>

        {/* Skill Constellation */}
        <motion.div
          className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          {/* Connection lines */}
          <ConnectionLines activeNode={activeNode} />

          {/* Skill nodes */}
          {skillCategories.map((category, index) => (
            <SkillNode
              key={category.id}
              category={category}
              index={index}
              onHover={setActiveNode}
              activeNode={activeNode}
            />
          ))}

          {/* Center glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,200,0.1), transparent)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
