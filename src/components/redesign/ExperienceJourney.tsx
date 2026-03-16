import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, GraduationCap, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: '2025',
    role: 'CO-FOUNDER',
    company: 'BUGBICEPS.IN',
    description: 'Building innovative tech solutions that simplify complex engineering concepts into high-impact digital products.',
    icon: Rocket,
    color: '#FF6B6B',
    tags: ['Entrepreneurship', 'Product', 'Leadership'],
  },
  {
    year: '2025',
    role: 'HEAD ALUMNI',
    company: 'OIST BHOPAL',
    description: 'Leading student community initiatives, managing external relations and mentorship programs for technical excellence.',
    icon: Award,
    color: '#4ECDC4',
    tags: ['Community', 'Strategy', 'Mentorship'],
  },
  {
    year: '2024',
    role: 'AI DEVELOPER',
    company: 'TECHBUS',
    description: 'Engineered high-accuracy NLP models for conversational AI and integrated them into CRM workflows.',
    icon: Briefcase,
    color: '#FFA502',
    tags: ['AI', 'NLP', 'Remote'],
  },
  {
    year: '2024',
    role: 'INTERN',
    company: 'ENTOPLEARNING',
    description: 'Built foundational LMS modules with focus on backend performance and scalable educational infrastructure.',
    icon: Briefcase,
    color: '#45B7D1',
    tags: ['Backend', 'LMS', 'Python'],
  },
  {
    year: '2024',
    role: 'B.TECH (AIML)',
    company: 'ORIENTAL GROUP',
    description: 'Specializing in Artificial Intelligence and Machine Learning architecture, building next-gen AI systems.',
    icon: GraduationCap,
    color: '#95E1D3',
    tags: ['AIML', 'Engineering', 'Research'],
  },
];

const ExperienceCard = ({ exp, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = exp.icon;

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 100, rotateY: -30 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power3.out',
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
      className="flex-shrink-0 w-[400px] h-[500px] relative group"
      whileHover={{ scale: 1.05, z: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${exp.color}15 0%, rgba(0,0,0,0.8) 100%)`,
          border: `1px solid ${exp.color}30`,
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, ${exp.color} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: `${exp.color}20`, border: `2px solid ${exp.color}` }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent className="w-8 h-8" style={{ color: exp.color }} />
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: `${exp.color}30`, border: `1px solid ${exp.color}` }}
          >
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: exp.color }}>
              {exp.year}
            </span>
          </motion.div>

          {/* Role & Company */}
          <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
            {exp.role}
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: exp.color }}>
            @ {exp.company}
          </p>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            {exp.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20"
          style={{ backgroundColor: exp.color, filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const ExperienceJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

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

        {/* Title - Fixed on left */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
              003 — EXPERIENCE
            </span>
            <h2 className="text-[clamp(3rem, 8vw, 6rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
              MY<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                JOURNEY
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
            className="flex gap-12 px-[50vw] py-20"
            style={{ x }}
          >
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
            
            {/* End spacer */}
            <div className="w-[40vw] flex-shrink-0" />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceJourney;
