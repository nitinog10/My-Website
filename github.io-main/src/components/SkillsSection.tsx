import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const skillGroups = [
  {
    category: 'CORE AI & ML',
    skills: ['Generative AI (LLMs, Prompt Engineering, RAG)', 'Computer Vision (OpenCV, Object Detection, Segmentation)', 'NLP & Model Fine-Tuning', 'Intelligent Agents & Multi-Agent Systems']
  },
  {
    category: 'ENGINEERING & ARCHITECTURE',
    skills: ['Full-Stack Development (Next.js, React)', 'Backend APIs (Node.js, FastAPI)', 'Scalable AI System Design', 'MCP Servers & AI Infrastructure', 'Cloud-Native Development']
  },
  {
    category: 'TOOLS & PLATFORMS',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Docker', 'Firebase', 'Google Cloud', 'Three.js / Web-based 3D', 'Git', 'CI/CD Pipelines']
  },
  {
    category: 'CURRENT FOCUS',
    skills: ['Advanced Computer Vision Techniques', 'RAG Systems & Knowledge-Grounded AI', 'Building Production-Grade AI Systems', 'Exploring AI + 3D + Web Experiences']
  }
];

// 3D Card component with parallax hover
const SkillCard = ({ group, index }: { group: typeof skillGroups[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const isFromLeft = index % 2 === 0;
  const xOffset = isFromLeft ? -80 : 80;
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX(-mouseY / 20);
    setRotateY(mouseX / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group perspective-1000"
      style={{ opacity, x, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-xl p-6 md:p-8 transition-all duration-300 ease-out"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
        whileHover={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(0,255,200,0.08) 0%, transparent 60%)'
          }}
        />
        
        {/* Category header */}
        <div className="flex items-center gap-3 mb-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,200,0.5)]" />
          <h3 className="text-sm md:text-base font-semibold text-accent uppercase tracking-[0.15em]">
            {group.category}
          </h3>
        </div>

        {/* Skills list */}
        <div className="space-y-3" style={{ transform: 'translateZ(10px)' }}>
          {group.skills.map((skill) => (
            <div key={skill} className="group/skill">
              <span className="text-sm text-white/60 group-hover/skill:text-white/90 transition-colors duration-300 leading-relaxed block">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <section ref={ref} className="min-h-screen py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-4">
          {/* Section indicator */}
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">003</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">CAPABILITIES</span>
          </motion.div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-10 md:col-start-3">
            {/* Large heading */}
            <motion.h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85] mb-20"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              WHAT I<br />
              <span className="text-white/20">WORK WITH</span>
            </motion.h2>

            {/* Skills in card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {skillGroups.map((group, index) => (
                <SkillCard key={group.category} group={group} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
