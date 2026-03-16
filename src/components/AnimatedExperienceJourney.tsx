import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Briefcase, GraduationCap, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'work' | 'education' | 'achievement';
  description: string;
  details: string[];
  tags: string[];
  color: string;
  icon: React.ReactNode;
}

const experiences: Experience[] = [
  {
    id: '01',
    role: 'CO-FOUNDER',
    company: 'BUGBICEPS.IN',
    period: 'PRESENT',
    type: 'work',
    description: 'Founding an innovative tech platform',
    details: [
      'Leading product vision and technical direction',
      'Building scalable engineering solutions',
      'Creating high-impact digital products',
    ],
    tags: ['Entrepreneurship', 'Leadership', 'Product'],
    color: '#FF6B6B',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: '02',
    role: 'HEAD ALUMNI',
    company: 'OIST BHOPAL',
    period: '2025 — 26',
    type: 'achievement',
    description: 'Leading institutional relations',
    details: [
      'Managing large student community',
      'Mentorship programs coordination',
      'Public speaking and networking',
    ],
    tags: ['Community', 'Strategy', 'Mentorship'],
    color: '#4ECDC4',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: '03',
    role: 'AI DEVELOPER',
    company: 'TECHBUS',
    period: 'BANGALORE',
    type: 'work',
    description: 'Advanced NLP model engineering',
    details: [
      'High-accuracy conversational bots',
      'CRM integration and automation',
      'Production deployment and optimization',
    ],
    tags: ['AI', 'NLP', 'Backend'],
    color: '#FFD93D',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: '04',
    role: 'INTERN',
    company: 'ENTOPLEARNING.COM',
    period: '2024',
    type: 'work',
    description: 'LMS infrastructure development',
    details: [
      'Core backend module architecting',
      'Database optimization',
      'Scalable systems design',
    ],
    tags: ['Backend', 'Systems', 'Python'],
    color: '#95E1D3',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: '05',
    role: 'AI & TECH OPS',
    company: 'HARON INDIA',
    period: 'INDIA',
    type: 'work',
    description: 'Operational AI prototyping',
    details: [
      'Workflow automation systems',
      'Fast-paced team collaboration',
      'AI prototype development',
    ],
    tags: ['Automation', 'Systems', 'AI'],
    color: '#F38181',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: '06',
    role: 'B.TECH (AIML)',
    company: 'ORIENTAL GROUP',
    period: '2024 — PRESENT',
    type: 'education',
    description: 'AI & ML specialization',
    details: [
      'Advanced curriculum in artificial intelligence',
      'Machine learning architecture focus',
      'Cutting-edge technical skills',
    ],
    tags: ['AIML', 'Engineering', 'Education'],
    color: '#A8DADC',
    icon: <GraduationCap className="w-6 h-6" />,
  },
];

const ExperienceCard = ({
  exp,
  index,
  isSelected,
  onClick,
}: {
  exp: Experience;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      if (isSelected) {
        gsap.to(cardRef.current, {
          duration: 0.5,
          height: 'auto',
          opacity: 1,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, [isSelected]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: '-50px' }}
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Main card */}
      <motion.div
        className="relative rounded-2xl p-6 md:p-8 border transition-all duration-300 overflow-hidden"
        style={{
          background: isSelected
            ? `rgba(255, 255, 255, 0.05)`
            : `rgba(255, 255, 255, 0.02)`,
          borderColor: isSelected ? exp.color : 'rgba(255,255,255,0.08)',
          boxShadow: isSelected
            ? `0 0 30px ${exp.color}40, inset 0 0 30px ${exp.color}10`
            : 'none',
        }}
        animate={{
          boxShadow: isSelected
            ? `0 0 40px ${exp.color}60, inset 0 0 40px ${exp.color}20`
            : `none`,
        }}
        whileHover={{
          borderColor: `${exp.color}80`,
          boxShadow: `0 0 20px ${exp.color}40`,
        }}
      >
        {/* Accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
          style={{
            background: isSelected
              ? `linear-gradient(90deg, ${exp.color}, transparent)`
              : 'linear-gradient(90deg, transparent, transparent)',
          }}
        />

        {/* Card content */}
        <div className="relative z-10">
          {/* Header with icon and period */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 rounded-xl"
                style={{
                  background: `${exp.color}20`,
                  color: exp.color,
                }}
                animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
              >
                {exp.icon}
              </motion.div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
                {exp.type}
              </span>
            </div>
            <motion.span
              className="text-xs font-bold tracking-[0.3em] px-3 py-1 rounded-full"
              style={{
                background: `${exp.color}15`,
                color: exp.color,
              }}
              animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
            >
              {exp.period}
            </motion.span>
          </div>

          {/* Title and company */}
          <div className="mb-4">
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight leading-snug"
              style={{ color: exp.color }}
            >
              {exp.role}
            </h3>
            <p className="text-white/50 font-semibold mt-1">@ {exp.company}</p>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
            {exp.description}
          </p>

          {/* Expandable details */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 mb-6 pb-6 border-b border-white/10"
              >
                {exp.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <ChevronRight
                      className="w-4 h-4 flex-shrink-0 mt-1"
                      style={{ color: exp.color }}
                    />
                    <span className="text-sm text-white/70">{detail}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tags */}
          <motion.div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <motion.span
                key={tag}
                className="text-[8px] md:text-[9px] px-3 py-1 rounded-full font-semibold tracking-[0.2em] uppercase"
                style={{
                  background: isSelected ? `${exp.color}25` : `rgba(255,255,255,0.05)`,
                  color: isSelected ? exp.color : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${isSelected ? `${exp.color}40` : 'rgba(255,255,255,0.1)'}`,
                }}
                animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Hover indicator */}
        {!isSelected && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
            style={{ background: `linear-gradient(90deg, ${exp.color}40, transparent)` }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const AnimatedExperienceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10%' });
  const [selectedExp, setSelectedExp] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -100]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.experience-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      });

      // Stagger card animations
      gsap.from('.experience-card', {
        duration: 0.8,
        opacity: 0,
        x: -100,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-0 w-full h-full rounded-full bg-gradient-to-br from-cyan-500/5 to-transparent blur-[100px]"
          animate={{
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/2 right-0 w-full h-full rounded-full bg-gradient-to-bl from-purple-500/5 to-transparent blur-[100px]"
          animate={{
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 md:mb-24"
          style={{ opacity, y }}
        >
          <motion.div
            className="experience-title inline-block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold">
              Professional Journey
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Experience <br />
            <span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl">
            A journey through diverse roles, spanning from founding ventures to technical
            excellence in AI development and community leadership.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Experience cards grid */}
          <div className="space-y-6 md:space-y-8 ml-0 md:ml-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className="experience-card"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: 'easeOut',
                }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-6 md:left-8 top-8 w-4 h-4 rounded-full -translate-x-1.5 -translate-y-1/2 border-2 border-black/80 z-20"
                  style={{
                    background: selectedExp === exp.id ? exp.color : 'white',
                    boxShadow: `0 0 ${selectedExp === exp.id ? '20px' : '0px'} ${exp.color}`,
                  }}
                  animate={{
                    scale: selectedExp === exp.id ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <ExperienceCard
                  exp={exp}
                  index={idx}
                  isSelected={selectedExp === exp.id}
                  onClick={() => setSelectedExp(selectedExp === exp.id ? null : exp.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics footer */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-20 md:mt-32"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { number: '6+', label: 'Professional Roles' },
            { number: '3+', label: 'Years Experience' },
            { number: '50+', label: 'Projects Delivered' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-black text-accent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.number}
              </motion.div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedExperienceJourney;
