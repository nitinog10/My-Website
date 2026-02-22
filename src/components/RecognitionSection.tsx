import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const recognitions = [
  { 
    title: 'NASA SPACE APPS CHALLENGE', 
    category: 'WINNER',
    year: '2025',
    description: 'Global hackathon winner with innovative weather prediction solution using NASA\'s Earth observation data and machine learning.',
    image: '/Nasa space apps challenge.jpeg'
  },
  { 
    title: '15+ HACKATHON', 
    category: 'FINALIST',
    year: '2024-25',
    description: 'Consistently recognized across 15+ hackathons for innovative AI solutions and technical excellence.',
    image: '/15+ hackathons.jpeg'
  },
  { 
    title: '3 HACKATHON WINS', 
    category: 'WINS',
    year: '2024-25',
    description: 'Multiple hackathon victories showcasing expertise in AI, full-stack development, and problem-solving.',
    image: '/abc.jpeg'
  },
  { 
    title: 'NATIONAL LEVEL IDEATHON', 
    category: 'WINNER',
    year: '2024',
    description: 'First place at national ideathon for developing innovative tech solutions addressing real-world challenges.',
    image: '/national level ideathon.jpeg'
  },
];

// 3D Recognition card with timeline layout
const RecognitionCard = ({ item, index }: { item: typeof recognitions[0]; index: number }) => {
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
    setRotateX(-(e.clientY - centerY) / 30);
    setRotateY((e.clientX - centerX) / 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div ref={cardRef} className="relative">
      {/* Timeline point */}
      <motion.div
        className="absolute left-1/2 top-10 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
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
            className={`absolute top-12 ${isLeft ? 'right-0' : 'left-0'} w-12 h-px hidden md:block`}
            style={{
              background: isLeft 
                ? 'linear-gradient(to right, transparent, rgba(0,255,200,0.3))' 
                : 'linear-gradient(to left, transparent, rgba(0,255,200,0.3))'
            }}
          />

          {/* Card */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 ease-out"
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
            <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent z-10" />
            
            {/* Achievement image */}
            <div className="relative">
              <div className="w-full aspect-video bg-black/20 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              {/* Category & Year */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent text-xs font-medium tracking-wider" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {item.category}
                </span>
                <span className="text-white/30">·</span>
                <span className="text-white/30 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {item.year}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {item.title.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-white/50 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const RecognitionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} className="min-h-screen py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-24">
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">005</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">RECOGNITION</span>
          </motion.div>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <div className="flex items-center gap-6">
              <motion.h2
                className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85]"
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                ACHIEVEMENTS<br />
                <span className="text-white/20">& WINS</span>
              </motion.h2>
              <motion.img
                src="/achievements.png"
                alt="achievements"
                className="hidden md:block flex-shrink-0"
                style={{ height: 'clamp(100px, 13vw, 180px)', width: 'auto', opacity: 0.9, borderRadius: '12px' }}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 0.9, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Recognition items */}
        <div className="space-y-12 md:space-y-16">
          {recognitions.map((item, index) => (
            <RecognitionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
