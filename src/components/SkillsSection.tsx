import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'CORE AI & ML',
    color: '#FF6B6B',
    skills: ['Generative AI (LLMs, Prompt Engineering, RAG)', 'Computer Vision (OpenCV, Object Detection)', 'NLP & Model Fine-Tuning', 'Intelligent Agents & Multi-Agent Systems']
  },
  {
    category: 'ENGINEERING & ARCHITECTURE',
    color: '#4ECDC4',
    skills: ['Full-Stack Development (Next.js, React)', 'Backend APIs (Node.js, FastAPI)', 'Scalable AI System Design', 'MCP Servers & AI Infrastructure']
  },
  {
    category: 'TOOLS & PLATFORMS',
    color: '#45B7D1',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Docker', 'Firebase', 'Google Cloud', 'Three.js / Web-based 3D']
  },
  {
    category: 'CURRENT FOCUS',
    color: '#FFA502',
    skills: ['Advanced Computer Vision', 'RAG Systems & Knowledge-Grounded AI', 'Production-Grade AI Systems', 'AI + 3D + Web Experiences']
  }
];

type SkillNode = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  category: string;
};

// Generate skill nodes from groups
const generateSkillNodes = (): SkillNode[] => {
  const nodes: SkillNode[] = [];
  let nodeId = 0;

  skillGroups.forEach((group) => {
    group.skills.forEach((skill) => {
      nodes.push({
        id: `node-${nodeId++}`,
        label: skill.split('(')[0].trim(),
        color: group.color,
        x: Math.random() * 100,
        y: Math.random() * 100,
        category: group.category
      });
    });
  });

  return nodes;
};

const FloatingSkillNode = ({ node, index }: { node: SkillNode; index: number }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!nodeRef.current) return;

    const element = nodeRef.current;
    const startX = parseFloat(element.style.left);
    const startY = parseFloat(element.style.top);

    // GSAP animation for floating motion
    gsap.to(element, {
      x: Math.sin(index * 0.5) * 30,
      y: Math.cos(index * 0.3) * 30,
      duration: 6 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Scroll-triggered appearance
    gsap.to(element, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: index * 0.05,
      scrollTrigger: {
        trigger: element.closest('section'),
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [index]);

  return (
    <motion.div
      ref={nodeRef}
      className="absolute w-32 h-32 rounded-full cursor-pointer group"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        opacity: 0,
        scale: 0.8,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: node.color,
          boxShadow: `0 0 20px ${node.color}40`,
        }}
        animate={isHovered ? { scale: 1.2, boxShadow: `0 0 40px ${node.color}` } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute inset-3 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${node.color}, ${node.color}80)`,
          boxShadow: `inset 0 0 20px ${node.color}`,
        }}
        animate={isHovered ? { scale: 0.7 } : { scale: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs font-bold text-white px-2 leading-tight drop-shadow-lg">
          {node.label}
        </span>
      </motion.div>

      {/* Hover detail card */}
      <motion.div
        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 px-3 py-2 rounded-lg border border-white/10 backdrop-blur-md z-50 pointer-events-none"
        initial={{ opacity: 0, x: -10 }}
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-xs text-white font-medium">{node.category}</p>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-10%' });
  const [skillNodes] = useState(() => generateSkillNodes());

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for the background
      gsap.to(containerRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 md:py-48 overflow-hidden bg-gradient-to-b from-black via-black to-black">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs md:text-sm tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
              002 — Technical Ecosystem
            </span>
            <h2 className="text-[clamp(2.5rem, 8vw, 6rem)] font-bold text-white uppercase tracking-tighter leading-[0.9] mb-6">
              What I<br />
              <span className="text-white/20">Work With</span>
            </h2>
            <p className="max-w-2xl text-lg text-white/60 leading-relaxed">
              An interactive ecosystem of technologies, frameworks, and tools I leverage to build innovative AI systems and immersive digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Floating skill nodes ecosystem */}
        <motion.div
          ref={containerRef}
          className="relative h-[600px] md:h-[700px] rounded-[40px] border border-white/5 bg-black/30 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Connecting lines (animated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 107, 107, 0.3)" />
                <stop offset="100%" stopColor="rgba(78, 205, 196, 0.3)" />
              </linearGradient>
            </defs>
            {skillNodes.slice(0, Math.floor(skillNodes.length * 0.6)).map((node, i) => {
              const nextNode = skillNodes[(i + 1) % skillNodes.length];
              return (
                <line
                  key={`line-${i}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${nextNode.x}%`}
                  y2={`${nextNode.y}%`}
                  stroke="url(#lineGrad)"
                  strokeWidth="1"
                  opacity="0.4"
                />
              );
            })}
          </svg>

          {/* Skill nodes */}
          <div className="absolute inset-0">
            {skillNodes.map((node, index) => (
              <FloatingSkillNode key={node.id} node={node} index={index} />
            ))}
          </div>

          {/* Center focal point */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'sine.inOut' }}
          >
            <div className="w-20 h-20 rounded-full border border-accent/20 shadow-[0_0_30px_rgba(0,255,200,0.2)]" />
            <div className="absolute inset-2 rounded-full border border-accent/40 shadow-[0_0_20px_rgba(0,255,200,0.3)]" />
          </motion.div>
        </motion.div>

        {/* Skill categories legend */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              className="relative p-4 rounded-xl border border-white/5 bg-black/30 backdrop-blur-sm hover:border-white/10 transition-all duration-300"
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">{group.category}</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                {group.skills.length} core competencies
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
