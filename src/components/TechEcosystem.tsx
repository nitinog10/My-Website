import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechNode {
  id: string;
  name: string;
  category: 'AI' | 'Web' | 'Data' | 'Tools';
  description: string;
  usage: string;
  connections: string[];
  color: string;
  bgColor: string;
}

const techStack: TechNode[] = [
  // Core AI
  {
    id: 'llms',
    name: 'LLMs & Generative AI',
    category: 'AI',
    description: 'Advanced language models for contextual understanding',
    usage: 'Prompt engineering, RAG pipelines, fine-tuning',
    connections: ['rag', 'agents', 'embedding'],
    color: '#FF6B6B',
    bgColor: 'rgba(255, 107, 107, 0.1)',
  },
  {
    id: 'rag',
    name: 'RAG Systems',
    category: 'AI',
    description: 'Retrieval-Augmented Generation for knowledge',
    usage: 'Knowledge grounding, enterprise AI systems',
    connections: ['llms', 'embedding', 'agents'],
    color: '#FF8C42',
    bgColor: 'rgba(255, 140, 66, 0.1)',
  },
  {
    id: 'agents',
    name: 'AI Agents',
    category: 'AI',
    description: 'Multi-agent systems orchestration',
    usage: 'Autonomous workflows, tool use, reasoning',
    connections: ['llms', 'rag', 'tools'],
    color: '#FFD93D',
    bgColor: 'rgba(255, 217, 61, 0.1)',
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    category: 'AI',
    description: 'Visual understanding & object detection',
    usage: 'Segmentation, classification, 3D analysis',
    connections: ['torch', 'tf'],
    color: '#6BCB77',
    bgColor: 'rgba(107, 203, 119, 0.1)',
  },
  // Frameworks
  {
    id: 'torch',
    name: 'PyTorch',
    category: 'Tools',
    description: 'Deep learning framework',
    usage: 'Model training, custom architectures',
    connections: ['cv', 'nlp', 'data'],
    color: '#FF6B6B',
    bgColor: 'rgba(255, 107, 107, 0.1)',
  },
  {
    id: 'tf',
    name: 'TensorFlow',
    category: 'Tools',
    description: 'Production ML framework',
    usage: 'Model deployment, optimization',
    connections: ['cv', 'agents'],
    color: '#FF8C42',
    bgColor: 'rgba(255, 140, 66, 0.1)',
  },
  // Web Tech
  {
    id: 'react',
    name: 'React & Next.js',
    category: 'Web',
    description: 'Modern web framework',
    usage: 'Full-stack development, UI systems',
    connections: ['node', 'three'],
    color: '#4ECDC4',
    bgColor: 'rgba(78, 205, 196, 0.1)',
  },
  {
    id: 'node',
    name: 'Node.js & FastAPI',
    category: 'Web',
    description: 'Backend services',
    usage: 'API development, server architecture',
    connections: ['react', 'db', 'cloud'],
    color: '#45B7D1',
    bgColor: 'rgba(69, 183, 209, 0.1)',
  },
  {
    id: 'three',
    name: 'Three.js & WebGL',
    category: 'Web',
    description: '3D visualization on web',
    usage: 'Interactive 3D, data visualization',
    connections: ['react', 'gsap'],
    color: '#96CEB4',
    bgColor: 'rgba(150, 206, 180, 0.1)',
  },
  // Data & Tools
  {
    id: 'embedding',
    name: 'Embeddings & Vectors',
    category: 'Data',
    description: 'Semantic representation',
    usage: 'Similarity search, clustering',
    connections: ['rag', 'db'],
    color: '#FFEAA7',
    bgColor: 'rgba(255, 234, 167, 0.1)',
  },
  {
    id: 'db',
    name: 'Databases',
    category: 'Data',
    description: 'Data persistence & search',
    usage: 'Vector stores, relational, timeseries',
    connections: ['embedding', 'cloud'],
    color: '#DFE6E9',
    bgColor: 'rgba(223, 230, 233, 0.1)',
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    category: 'Tools',
    description: 'Infrastructure & deployment',
    usage: 'GCP, Docker, CI/CD pipelines',
    connections: ['node', 'db'],
    color: '#A29BFE',
    bgColor: 'rgba(162, 155, 254, 0.1)',
  },
  {
    id: 'gsap',
    name: 'Animation & Motion',
    category: 'Web',
    description: 'Performant animation library',
    usage: 'Scroll triggers, transitions',
    connections: ['react', 'three'],
    color: '#FD79A8',
    bgColor: 'rgba(253, 121, 168, 0.1)',
  },
  {
    id: 'nlp',
    name: 'NLP & Text Processing',
    category: 'AI',
    description: 'Natural language understanding',
    usage: 'Tokenization, embeddings, classification',
    connections: ['torch', 'llms', 'agents'],
    color: '#74B9FF',
    bgColor: 'rgba(116, 185, 255, 0.1)',
  },
  {
    id: 'tools',
    name: 'Dev Tools & Utils',
    category: 'Tools',
    description: 'Utility libraries & tools',
    usage: 'Hugging Face, OpenCV, Git',
    connections: ['agents', 'cv'],
    color: '#55EFC4',
    bgColor: 'rgba(85, 239, 196, 0.1)',
  },
];

interface NodePosition {
  x: number;
  y: number;
}

// Generate node positions in a radial pattern
const generateNodePositions = (): Record<string, NodePosition> => {
  const positions: Record<string, NodePosition> = {};
  const centerX = 50;
  const centerY = 50;
  const radiusBase = 35;
  
  const categories = { AI: 0, Web: 90, Data: 180, Tools: 270 };
  const nodesPerCategory: Record<string, TechNode[]> = {
    AI: [],
    Web: [],
    Data: [],
    Tools: [],
  };
  
  techStack.forEach(tech => {
    nodesPerCategory[tech.category].push(tech);
  });
  
  Object.entries(nodesPerCategory).forEach(([category, nodes]) => {
    const startAngle = categories[category as keyof typeof categories];
    const angleStep = 60 / (nodes.length || 1);
    
    nodes.forEach((node, idx) => {
      const offset = angleStep * (idx - (nodes.length - 1) / 2);
      const angle = ((startAngle + offset) * Math.PI) / 180;
      const radius = radiusBase + (Math.random() - 0.5) * 10;
      
      positions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });
  });
  
  return positions;
};

const TechNode = ({
  node,
  position,
  isActive,
  onHover,
  connections,
  nodePositions,
}: {
  node: TechNode;
  position: NodePosition;
  isActive: boolean;
  onHover: (id: string | null) => void;
  connections: Record<string, NodePosition>;
  nodePositions: Record<string, NodePosition>;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onHoverStart={() => onHover(node.id)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Connection lines to related nodes */}
      {isActive &&
        node.connections.map((connectedId) => {
          const connectedPos = nodePositions[connectedId];
          if (!connectedPos) return null;
          
          const x1 = position.x;
          const y1 = position.y;
          const x2 = connectedPos.x;
          const y2 = connectedPos.y;
          
          return (
            <svg
              key={connectedId}
              className="absolute pointer-events-none"
              style={{
                left: `${Math.min(x1, x2)}%`,
                top: `${Math.min(y1, y2)}%`,
                width: `${Math.abs(x2 - x1)}%`,
                height: `${Math.abs(y2 - y1)}%`,
                overflow: 'visible',
              }}
            >
              <line
                x1={x1 > x2 ? Math.abs(x2 - x1) : 0}
                y1={y1 > y2 ? Math.abs(y2 - y1) : 0}
                x2={x1 > x2 ? 0 : Math.abs(x2 - x1)}
                y2={y1 > y2 ? 0 : Math.abs(y2 - y1)}
                stroke={node.color}
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="5,5"
              />
            </svg>
          );
        })}

      {/* Tech Node Circle */}
      <motion.div
        className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer"
        style={{
          background: node.bgColor,
          border: `2px solid ${node.color}`,
          boxShadow: isActive ? `0 0 30px ${node.color}` : `0 0 10px ${node.color}40`,
        }}
        animate={{
          boxShadow: isActive
            ? `0 0 40px ${node.color}80, 0 0 60px ${node.color}40`
            : `0 0 10px ${node.color}40`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner glow */}
        <motion.div
          className="absolute inset-1 rounded-full"
          style={{
            background: `radial-gradient(circle, ${node.color}10, transparent)`,
          }}
          animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
        />

        {/* Main text */}
        <motion.div
          className="relative z-10 text-center text-xs font-bold text-white"
          animate={isActive ? { scale: 1.05 } : { scale: 1 }}
        >
          <div className="text-[10px] opacity-70">{node.category}</div>
          <div className="text-xs leading-tight">{node.name.split(' ')[0]}</div>
        </motion.div>

        {/* Pulse ring on hover */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border border-current"
            style={{ color: node.color }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Detail popup */}
      {isActive && (
        <motion.div
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
        >
          <div
            className="px-4 py-3 rounded-xl backdrop-blur-md border text-center"
            style={{
              background: node.bgColor,
              border: `1px solid ${node.color}`,
              minWidth: '180px',
            }}
          >
            <p className="text-[10px] font-bold text-white opacity-80 mb-1">
              {node.description}
            </p>
            <p className="text-[8px] text-white/60">{node.usage}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const TechEcosystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10%' });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  const nodePositions = generateNodePositions();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Animate nodes in with stagger
      gsap.from('.tech-node', {
        duration: 1.2,
        opacity: 0,
        scale: 0.5,
        stagger: 0.05,
        ease: 'back.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
          markers: false,
        },
      });

      // Subtle floating animation
      gsap.to('.tech-node', {
        duration: 3 + Math.random() * 2,
        y: -20 + Math.random() * 40,
        x: -10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden py-24"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] text-accent uppercase">
            Technical Arsenal
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">
            Tech Ecosystem
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            An interconnected universe of technologies, frameworks, and tools that
            power intelligent solutions
          </p>
        </motion.div>

        {/* Interactive Network Canvas */}
        <motion.div
          ref={canvasRef}
          className="relative w-full aspect-square max-w-3xl mx-auto bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 overflow-hidden"
          style={{ opacity, scale }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Tech Nodes */}
          {techStack.map((node) => (
            <motion.div
              key={node.id}
              className="tech-node"
              initial={{ opacity: 0, scale: 0.5 }}
            >
              <TechNode
                node={node}
                position={nodePositions[node.id]}
                isActive={hoveredNode === node.id}
                onHover={setHoveredNode}
                connections={nodePositions}
                nodePositions={nodePositions}
              />
            </motion.div>
          ))}

          {/* Center pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <motion.div
              className="w-1 h-1 rounded-full bg-accent"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(0, 255, 200, 0.7)',
                  '0 0 0 40px rgba(0, 255, 200, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { label: 'Core AI', value: '5+' },
            { label: 'Web Frameworks', value: '3+' },
            { label: 'Tools & Platforms', value: '7+' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="text-accent font-bold text-2xl">{stat.value}</div>
              <div className="text-white/60 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechEcosystem;
