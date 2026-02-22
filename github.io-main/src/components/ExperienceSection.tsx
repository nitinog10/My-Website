import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    role: 'CO-FOUNDER',
    company: 'BUGBICEPS.IN',
    period: 'PRESENT',
    description: 'Co-founding an innovative tech platform. Building solutions that bridge the gap between technology and real-world applications.'
  },
  {
    role: 'HEAD ALUMNI',
    company: 'STUDENT ACTIVITY COUNCIL, OIST',
    period: '2025 — 26',
    description: 'Leading student initiatives and organizing events. Building community engagement and fostering leadership development.'
  },
  {
    role: 'INTERN',
    company: 'ENTOPLEARNING.COM',
    period: '2024',
    description: 'Contributed to educational technology development. Gained hands-on experience in building learning platforms and content systems.'
  },
  {
    role: 'AI DEVELOPER',
    company: 'TECHBUS',
    period: 'BANGALORE · REMOTE',
    description: 'Worked as an AI Developer, contributing to applied AI solutions. Designed and implemented AI-driven features with real-world constraints.'
  },
  {
    role: 'AI DEVELOPER & TECH OPS',
    company: 'HARON INDIA',
    period: 'INDIA',
    description: 'Collaborated in fast-paced teams to deliver functional AI prototypes under strict deadlines. Gained hands-on exposure to industry-oriented AI workflows.'
  },
  {
    role: 'B.TECH (AIML)',
    company: 'ORIENTAL GROUP OF INSTITUTES',
    period: '2024 — PRESENT',
    description: 'Bachelor of Technology in Artificial Intelligence & Machine Learning.'
  }
];

// 3D Experience card with timeline
const ExperienceCard = ({ exp, index, isLast }: { exp: typeof experiences[0]; index: number; isLast: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isLeft = index % 2 === 0;
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const xOffset = isLeft ? -80 : 80;
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateX(-(e.clientY - centerY) / 25);
    setRotateY((e.clientX - centerX) / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div ref={cardRef} className={`relative ${isLast ? '' : 'pb-12 md:pb-20'}`}>
      {/* Timeline point */}
      <motion.div
        className="absolute left-1/2 top-6 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(0,255,200,0.6)]" />
      </motion.div>

      {/* Card container - alternating sides */}
      <div className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
        <motion.div
          className={`relative w-full md:w-[44%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
          style={{ opacity, x, scale }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Connector line */}
          <div
            className={`absolute top-8 ${isLeft ? 'right-0' : 'left-0'} w-12 h-px hidden md:block`}
            style={{
              background: isLeft 
                ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' 
                : 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))'
            }}
          />

          {/* Card */}
          <motion.div
            className="group relative rounded-2xl p-5 md:p-6 transition-all duration-300 ease-out cursor-default overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              background: 'rgba(17, 17, 20, 0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
            }}
            whileHover={{
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.12)'
            }}
          >
            {/* Top accent border */}
            <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />

            {/* Period */}
            <span className="text-accent text-xs font-medium tracking-wider mb-4 block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              {exp.period}
            </span>

            {/* Role */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', transform: 'translateZ(20px)' }}>
              {exp.role.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
            </h3>

            {/* Company */}
            <span className="text-sm text-accent font-medium block mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif', transform: 'translateZ(15px)' }}>
              @{exp.company.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
            </span>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', transform: 'translateZ(10px)' }}>
              {exp.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <section ref={ref} className="min-h-screen py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-20">
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">004</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">JOURNEY</span>
          </motion.div>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <motion.h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              EXPERIENCE<br />
              <span className="text-white/20">TIMELINE</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline with cards */}
        <div className="relative">
          {/* Experience cards */}
          <div>
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={exp.company} 
                exp={exp} 
                index={index} 
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
