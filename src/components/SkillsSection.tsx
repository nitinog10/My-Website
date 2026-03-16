import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Layers, Database, Cloud, Sparkles, Zap, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'ai',
    title: 'AI & ML',
    subtitle: 'Artificial Intelligence',
    icon: Brain,
    color: '#FF6B6B',
    bgImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    skills: [
      'Generative AI & LLMs',
      'Computer Vision',
      'NLP & Fine-Tuning',
      'Multi-Agent Systems',
      'PyTorch & TensorFlow',
      'Transformers & Keras'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack',
    subtitle: 'Web Development',
    icon: Code,
    color: '#4ECDC4',
    bgImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    skills: [
      'React & Next.js',
      'Node.js & FastAPI',
      'TypeScript',
      'Tailwind CSS',
      'GSAP Animations',
      'Three.js & WebGL'
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'System Design',
    icon: Layers,
    color: '#45B7D1',
    bgImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    skills: [
      'Scalable Systems',
      'Microservices',
      'API Design',
      'MCP Servers',
      'Cloud-Native',
      'CI/CD Pipelines'
    ]
  },
  {
    id: 'data',
    title: 'Data Eng',
    subtitle: 'Data Engineering',
    icon: Database,
    color: '#95E1D3',
    bgImage: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
    subtitle: 'Infrastructure',
    icon: Cloud,
    color: '#FFA502',
    bgImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    skills: [
      'AWS & GCP',
      'Docker & Kubernetes',
      'Serverless',
      'Infrastructure as Code',
      'Monitoring',
      'Git & Version Control'
    ]
  }
];

const SkillCard = ({ category, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;

  return (
    <motion.div
      className="flex-shrink-0 w-[400px] h-[500px] relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: category.bgImage }}
        />
        
        {/* Glass effect */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Border glow */}
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            border: `2px solid ${isHovered ? category.color + '80' : category.color + '30'}`,
            boxShadow: isHovered ? `0 0 40px ${category.color}40, inset 0 0 40px ${category.color}10` : 'none',
            transition: 'all 0.3s',
          }}
        />

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col">
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: `${category.color}20`,
              border: `1px solid ${category.color}40`,
            }}
            animate={isHovered ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <IconComponent 
              className="w-10 h-10"
              style={{ 
                color: category.color,
                filter: `drop-shadow(0 0 10px ${category.color})`,
              }}
            />
          </motion.div>

          {/* Title */}
          <div className="mb-6">
            <h3 
              className="text-4xl font-black uppercase tracking-tight mb-2"
              style={{ color: category.color }}
            >
              {category.title}
            </h3>
            <p className="text-white/50 text-sm uppercase tracking-wider">
              {category.subtitle}
            </p>
          </div>

          {/* Skills */}
          <div className="flex-1 space-y-3">
            {category.skills.map((skill: string, i: number) => (
              <motion.div
                key={skill}
                className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm"
                style={{
                  background: isHovered ? `${category.color}10` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHovered ? category.color + '30' : 'rgba(255,255,255,0.05)'}`,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                  animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm text-white/80">{skill}</span>
              </motion.div>
            ))}
          </div>

          {/* Number */}
          <div 
            className="absolute bottom-8 right-8 text-8xl font-black opacity-10"
            style={{ color: category.color }}
          >
            0{index + 1}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,200,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Title - Fixed on left */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
              002 — CAPABILITIES
            </span>
            <h2 className="text-[clamp(3rem, 8vw, 6rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
              WHAT I<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                WORK WITH
              </span>
            </h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="h-px w-16 bg-accent" />
              <span className="text-sm text-white/60 uppercase tracking-wider">Scroll horizontally</span>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            ref={scrollRef}
            className="flex gap-8 px-[50vw] py-20"
            style={{ x }}
          >
            {skillCategories.map((category, index) => (
              <SkillCard key={category.id} category={category} index={index} />
            ))}
            
            {/* End spacer */}
            <div className="w-[40vw] flex-shrink-0" />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 uppercase tracking-wider">Progress</span>
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
