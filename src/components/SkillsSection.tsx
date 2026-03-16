import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Layers, Database, Cloud, Sparkles, Zap, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: Brain,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500',
    skills: [
      'Generative AI (LLMs, RAG)',
      'Computer Vision & Object Detection',
      'NLP & Model Fine-Tuning',
      'Multi-Agent Systems',
      'PyTorch & TensorFlow',
      'Transformers & Keras'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    icon: Code,
    color: '#4ECDC4',
    gradient: 'from-cyan-500 to-teal-500',
    skills: [
      'React & Next.js',
      'Node.js & FastAPI',
      'TypeScript & JavaScript',
      'Tailwind CSS',
      'GSAP Animations',
      'Three.js & 3D Web'
    ]
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    icon: Layers,
    color: '#45B7D1',
    gradient: 'from-blue-500 to-indigo-500',
    skills: [
      'Scalable AI Systems',
      'Microservices Design',
      'RESTful & GraphQL APIs',
      'MCP Servers',
      'Cloud-Native Apps',
      'CI/CD Pipelines'
    ]
  },
  {
    id: 'data',
    title: 'Data Engineering',
    icon: Database,
    color: '#95E1D3',
    gradient: 'from-emerald-500 to-green-500',
    skills: [
      'Pandas & NumPy',
      'Data Pipelines',
      'MongoDB & PostgreSQL',
      'Vector Databases',
      'ETL Processes',
      'Data Visualization'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: '#FFA502',
    gradient: 'from-orange-500 to-amber-500',
    skills: [
      'AWS & Google Cloud',
      'Docker & Kubernetes',
      'Serverless Architecture',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Git & Version Control'
    ]
  }
];

const SkillCard = ({ category, index, isInView }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${category.color}15, rgba(0,0,0,0.8))`
            : 'rgba(17, 17, 20, 0.6)',
          border: isHovered 
            ? `2px solid ${category.color}60`
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isHovered 
            ? `0 20px 60px ${category.color}30, 0 0 80px ${category.color}20`
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Top gradient line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
            opacity: isHovered ? 1 : 0.3,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Icon and Title */}
        <div className="flex items-start gap-6 mb-6">
          <motion.div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)`,
              border: `1px solid ${category.color}40`,
            }}
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent 
              className="w-8 h-8"
              style={{ 
                color: category.color,
                filter: `drop-shadow(0 0 8px ${category.color}60)`,
              }}
            />
          </motion.div>

          <div className="flex-1">
            <h3 
              className="text-2xl font-black uppercase tracking-tight mb-2"
              style={{ color: isHovered ? category.color : '#fff' }}
            >
              {category.title}
            </h3>
            <div className="flex items-center gap-2">
              <div 
                className="h-px flex-1"
                style={{ 
                  background: `linear-gradient(90deg, ${category.color}60, transparent)`,
                }}
              />
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {category.skills.length} Skills
              </span>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {category.skills.map((skill: string, i: number) => (
            <motion.div
              key={skill}
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
              style={{
                background: isHovered ? `${category.color}08` : 'transparent',
                border: `1px solid ${isHovered ? category.color + '20' : 'transparent'}`,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.5 + index * 0.15 + i * 0.05 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
                animate={isHovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              />
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${category.color}20, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner accent */}
        <div 
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${category.color}, transparent)`,
            filter: 'blur(20px)',
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold">
              002 — CAPABILITIES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
          </div>
          
          <h2 className="text-[clamp(3rem, 10vw, 8rem)] font-black uppercase tracking-tighter leading-[0.85] text-white mb-6">
            WHAT I<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              WORK WITH
            </span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl">
            A comprehensive breakdown of my technical expertise across AI, development, and infrastructure.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.id}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
