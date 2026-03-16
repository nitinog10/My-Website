import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Briefcase, Award, GraduationCap, Rocket, X, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const experiences = [
  {
    year: '2025',
    role: 'CO-FOUNDER',
    company: 'BUGBICEPS.IN',
    period: 'PRESENT',
    description: 'Building innovative tech solutions that simplify complex engineering concepts into high-impact digital products.',
    achievements: [
      'Founded tech startup focused on engineering education',
      'Built scalable platform architecture',
      'Led product vision and strategy'
    ],
    technologies: ['Next.js', 'AI/ML', 'Cloud Architecture'],
    icon: Rocket,
    color: '#FF6B6B',
    tags: ['Entrepreneurship', 'Product', 'Leadership'],
  },
  {
    year: '2025',
    role: 'HEAD ALUMNI',
    company: 'OIST BHOPAL',
    period: '2025 — 26',
    description: 'Leading student community initiatives, managing external relations and mentorship programs for technical excellence.',
    achievements: [
      'Managing 500+ alumni network',
      'Organized 10+ technical workshops',
      'Established industry partnerships'
    ],
    technologies: ['Community Building', 'Event Management', 'Public Speaking'],
    icon: Award,
    color: '#4ECDC4',
    tags: ['Community', 'Strategy', 'Mentorship'],
  },
  {
    year: '2024',
    role: 'AI DEVELOPER',
    company: 'TECHBUS',
    period: 'BANGALORE',
    description: 'Engineered high-accuracy NLP models for conversational AI and integrated them into CRM workflows.',
    achievements: [
      'Built NLP models with 95%+ accuracy',
      'Integrated AI into CRM systems',
      'Reduced response time by 60%'
    ],
    technologies: ['Python', 'NLP', 'TensorFlow', 'FastAPI'],
    icon: Briefcase,
    color: '#FFA502',
    tags: ['AI', 'NLP', 'Remote'],
  },
  {
    year: '2024',
    role: 'INTERN',
    company: 'ENTOPLEARNING',
    period: '2024',
    description: 'Built foundational LMS modules with focus on backend performance and scalable educational infrastructure.',
    achievements: [
      'Developed core LMS features',
      'Optimized database queries',
      'Implemented caching strategies'
    ],
    technologies: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    icon: Briefcase,
    color: '#45B7D1',
    tags: ['Backend', 'LMS', 'Python'],
  },
  {
    year: '2024',
    role: 'B.TECH (AIML)',
    company: 'ORIENTAL GROUP',
    period: '2024 — PRESENT',
    description: 'Specializing in Artificial Intelligence and Machine Learning architecture, building next-gen AI systems.',
    achievements: [
      'Specialized in AI/ML engineering',
      'Built multiple AI projects',
      'Research in computer vision'
    ],
    technologies: ['PyTorch', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
    icon: GraduationCap,
    color: '#95E1D3',
    tags: ['AIML', 'Engineering', 'Research'],
  },
];

const ExperienceCard = ({ exp, index, onExpand }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = exp.icon;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 100, rotateY: -30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'left 80%',
          horizontal: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[450px] h-[600px] relative group cursor-pointer"
      whileHover={{ scale: 1.03, z: 50 }}
      transition={{ duration: 0.3 }}
      onClick={() => onExpand(exp)}
    >
      <div
        className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${exp.color}15 0%, rgba(0,0,0,0.9) 100%)`,
          border: `2px solid ${exp.color}30`,
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, ${exp.color} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated gradient orb */}
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: exp.color }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ 
              backgroundColor: `${exp.color}20`, 
              border: `2px solid ${exp.color}`,
              boxShadow: `0 0 30px ${exp.color}40`
            }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent className="w-10 h-10" style={{ color: exp.color }} />
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{ 
              backgroundColor: `${exp.color}30`, 
              border: `1px solid ${exp.color}`,
              boxShadow: `0 0 20px ${exp.color}30`
            }}
          >
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: exp.color }}>
              {exp.period}
            </span>
          </motion.div>

          {/* Role & Company */}
          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
            {exp.role}
          </h3>
          <p className="text-xl font-semibold mb-6" style={{ color: exp.color }}>
            @ {exp.company}
          </p>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            {exp.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.slice(0, 3).map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-lg font-semibold"
                style={{
                  backgroundColor: `${exp.color}20`,
                  border: `1px solid ${exp.color}40`,
                  color: exp.color
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Click to expand hint */}
        <motion.div
          className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          style={{ color: exp.color }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, x: 5 }}
        >
          Click to expand <ExternalLink className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceDetail = ({ exp, onClose }: any) => {
  const IconComponent = exp.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
      
      {/* Modal */}
      <motion.div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black/95 to-gray-900/95 rounded-3xl border-2 p-8 md:p-12 backdrop-blur-md"
        style={{ borderColor: `${exp.color}40` }}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div 
              className="w-24 h-24 rounded-3xl flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: `${exp.color}20`,
                border: `3px solid ${exp.color}`,
                boxShadow: `0 0 40px ${exp.color}40`
              }}
            >
              <IconComponent className="w-12 h-12" style={{ color: exp.color }} />
            </div>
            
            <div className="flex-1">
              <div 
                className="inline-block px-4 py-2 rounded-full mb-3"
                style={{ 
                  backgroundColor: `${exp.color}30`, 
                  border: `1px solid ${exp.color}`
                }}
              >
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: exp.color }}>
                  {exp.period}
                </span>
              </div>
              
              <h2 className="text-5xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                {exp.role}
              </h2>
              <p className="text-2xl font-semibold mb-4" style={{ color: exp.color }}>
                @ {exp.company}
              </p>
            </div>
          </div>

          <p className="text-lg text-white/80 leading-relaxed">
            {exp.description}
          </p>
        </div>

        {/* Key Achievements */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
            Key Achievements
          </h3>
          <div className="space-y-3">
            {exp.achievements.map((achievement: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div 
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: exp.color }}
                />
                <p className="text-white/80 leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
            Technologies & Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {exp.technologies.map((tech: string, i: number) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: `${exp.color}20`,
                  border: `1px solid ${exp.color}40`,
                  color: exp.color
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-20%' });
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = scrollWidth - windowWidth;

      // Horizontal scroll animation
      gsap.to(scrollRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance + windowWidth}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Animate SVG path drawing
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        
        gsap.fromTo(
          pathRef.current,
          { strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${scrollDistance + windowWidth}`,
              scrub: 1.5,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Generate SVG path for timeline
  const generatePath = () => {
    const points = experiences.map((_, i) => {
      const x = 400 + i * 550;
      const y = 250 + Math.sin(i * 0.8) * 80;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    return points.join(' ');
  };

  return (
    <>
      <section ref={containerRef} className="relative h-[250vh] bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,255,200,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Title - Fixed on left */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.span 
                className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                003 — EXPERIENCE
              </motion.span>
              <h2 className="text-[clamp(3rem, 8vw, 6rem)] font-black uppercase tracking-tighter leading-[0.85] text-white mb-6">
                MY<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                  JOURNEY
                </span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                A horizontal timeline of my professional evolution, from student innovator to AI engineer.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-accent" />
                <span className="text-sm text-white/60 uppercase tracking-wider">Scroll to explore</span>
              </div>
            </motion.div>
          </div>

          {/* Horizontal scroll container */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            {/* SVG Path */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ minWidth: `${experiences.length * 550 + 800}px` }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00ffc8" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#00ffc8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00ffc8" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <motion.path
                ref={pathRef}
                d={generatePath()}
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray={pathRef.current?.getTotalLength() || 0}
                strokeDashoffset={pathRef.current?.getTotalLength() || 0}
                strokeLinecap="round"
              />
              
              {/* Milestone dots */}
              {experiences.map((exp, i) => {
                const x = 400 + i * 550;
                const y = 250 + Math.sin(i * 0.8) * 80;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill={exp.color}
                      opacity="0.3"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill={exp.color}
                      style={{ filter: `drop-shadow(0 0 10px ${exp.color})` }}
                    />
                  </g>
                );
              })}
            </svg>

            <motion.div
              ref={scrollRef}
              className="flex gap-16 px-[50vw] py-20 items-center"
            >
              {/* Intro card */}
              <div className="min-w-[40vw] flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bg-gradient-to-br from-accent/10 to-transparent p-8 rounded-3xl border border-accent/20">
                    <h3 className="text-3xl font-black uppercase text-white mb-4">
                      Career Timeline
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-6">
                      Follow the path through my professional milestones, from education to entrepreneurship.
                      Each stop represents growth, learning, and impact.
                    </p>
                    <div className="flex items-center gap-3 text-accent text-sm font-bold uppercase tracking-wider">
                      <div className="w-12 h-px bg-accent" />
                      {experiences.length} Milestones
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Experience cards */}
              {experiences.map((exp, i) => (
                <ExperienceCard key={i} exp={exp} index={i} onExpand={setSelectedExp} />
              ))}
              
              {/* End spacer */}
              <div className="w-[40vw] flex-shrink-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-4 mx-auto">
                    <div className="w-10 h-10 rounded-full bg-accent" />
                  </div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">
                    Journey Continues...
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-blue-500"
              style={{ scaleX: pathLength, transformOrigin: 'left' }}
            />
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 right-12 text-right"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Scroll horizontally
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience detail modal */}
      <AnimatePresence>
        {selectedExp && (
          <ExperienceDetail exp={selectedExp} onClose={() => setSelectedExp(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienceJourney;
