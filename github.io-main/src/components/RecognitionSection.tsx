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

// 3D Recognition card
const RecognitionCard = ({ item, index }: { item: typeof recognitions[0]; index: number }) => {
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
    <motion.div
      ref={cardRef}
      className="group"
      style={{ opacity, x, scale }}
    >
      <div className={`grid grid-cols-12 gap-6 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
        {/* Image */}
        <motion.div 
          className={`col-span-12 md:col-span-5 ${index % 2 === 1 ? 'md:col-start-8' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="relative overflow-hidden rounded-xl"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
            whileHover={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className={`col-span-12 md:col-span-6 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:text-right' : ''}`}>
          {/* Index */}
          <span className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white/5 leading-none block mb-2">
            0{index + 1}
          </span>
          
          {/* Category badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
            style={{ 
              background: 'rgba(0,255,200,0.08)', 
              border: '1px solid rgba(0,255,200,0.15)'
            }}>
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] tracking-[0.12em] text-accent uppercase font-medium">
              {item.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
            {item.title}
          </h3>
          
          {/* Description */}
          <p className={`text-sm text-white/50 leading-relaxed mb-4 max-w-md ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
            {item.description}
          </p>
          
          {/* Year */}
          <span className="text-xs text-white/30 uppercase tracking-[0.15em]">
            {item.year}
          </span>
        </div>
      </div>
    </motion.div>
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
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">006</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">RECOGNITION</span>
          </motion.div>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
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
          </div>
        </div>

        {/* Recognition items */}
        <div className="space-y-20 md:space-y-32">
          {recognitions.map((item, index) => (
            <RecognitionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
