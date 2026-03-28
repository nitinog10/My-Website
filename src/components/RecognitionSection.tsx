import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Star, Zap } from 'lucide-react';

const recognitions = [
  { 
    title: 'NASA SPACE APPS CHALLENGE', 
    category: 'WINNER',
    year: '2025',
    description: 'Global hackathon winner with innovative weather prediction solution using NASA\'s Earth observation data and machine learning.',
    image: '/Nasa space apps challenge.jpeg',
    icon: Trophy,
    color: '#00ffc8',
    size: 'large'
  },
  { 
    title: '15+ HACKATHON', 
    category: 'FINALIST',
    year: '2024-25',
    description: 'Consistently recognized across 15+ hackathons for innovative AI solutions and technical excellence.',
    image: '/15+ hackathons.jpeg',
    icon: Star,
    color: '#60d5f0',
    size: 'medium'
  },
  { 
    title: '4 HACKATHON WINS', 
    category: 'Wins',
    year: '2024-25',
    description: 'Multiple hackathon victories showcasing expertise in AI, full-stack development, and problem-solving.',
    image: '/abc.jpeg',
    icon: Award,
    color: '#00ffc8',
    size: 'medium'
  },
  { 
    title: 'NATIONAL LEVEL IDEATHON', 
    category: 'WINNER',
    year: '2024',
    description: 'First place at national ideathon for developing innovative tech solutions addressing real-world challenge in esports',
    image: '/national level ideathon.jpeg',
    icon: Zap,
    color: '#60d5f0',
    size: 'large'
  },
];

const AchievementCard = ({ item, index }: { item: typeof recognitions[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: 40,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden cursor-pointer ${
        item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
      }`}
      style={{
        background: 'rgba(17, 17, 20, 0.95)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      whileHover={{
        scale: 1.01,
        border: `1px solid ${item.color}40`,
        transition: { 
          duration: 0.3,
        }
      }}
    >
      {/* Two column layout: Image left, Content right */}
      <div className="flex flex-col md:flex-row min-h-[450px]">
        {/* Left: Image section */}
        <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center',
            }}
            animate={hovered ? {
              scale: 1.1,
            } : {
              scale: 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* Subtle vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(17,17,20,0.3) 100%)',
            }}
          />

          {/* Icon floating on image */}
          <motion.div
            className="absolute top-6 right-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-2xl"
            style={{
              background: `rgba(17,17,20,0.7)`,
              border: `2px solid ${item.color}`,
              boxShadow: `0 8px 32px ${item.color}40`,
            }}
            animate={hovered ? {
              rotate: [0, -12, 12, 0],
              scale: [1, 1.1, 1],
            } : {
              rotate: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut"
            }}
          >
            <IconComponent 
              className="w-8 h-8" 
              style={{ color: item.color }}
            />
          </motion.div>
        </div>

        {/* Right: Content section */}
        <div className="relative md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
          {/* Top content */}
          <div>
            {/* Category and Year */}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {item.category}
              </motion.div>
              
              <span 
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: item.color, opacity: 0.6 }}
              >
                {item.year}
              </span>
            </div>

            {/* Title */}
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white mb-5 uppercase tracking-tight leading-tight"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              animate={hovered ? {
                color: item.color,
                x: 3,
              } : {
                color: '#ffffff',
                x: 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-sm md:text-base text-white/60 leading-relaxed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              animate={hovered ? { opacity: 0.8 } : { opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>
          </div>

          {/* Bottom accent */}
          <div className="mt-8">
            <motion.div
              className="h-1 rounded-full"
              style={{ 
                backgroundColor: item.color,
                boxShadow: `0 0 20px ${item.color}50`,
              }}
              initial={{ width: '50px' }}
              animate={hovered ? { width: '100%' } : { width: '50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Hover effects */}
      {hovered && (
        <>
          {/* Glow border */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '24px',
              border: `2px solid ${item.color}`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Corner brackets */}
          <motion.div
            className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2"
            style={{ 
              borderColor: item.color,
              borderRadius: '24px 0 0 0',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          />
          <motion.div
            className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2"
            style={{ 
              borderColor: item.color,
              borderRadius: '0 0 24px 0',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut", delay: 0.1 }}
          />

          {/* Particles */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                backgroundColor: item.color,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 15px ${item.color}`,
              }}
              initial={{ 
                x: '-50%', 
                y: '-50%',
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 70}px)`,
                y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 70}px)`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

const RecognitionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} className="min-h-screen py-32 md:py-48 overflow-hidden bg-[#0a0a0b] relative">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] md:text-sm tracking-[0.5em] text-accent font-bold uppercase py-1 border-b border-accent/30">005 | RECOGNITION</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.85]">
                ACHIEVEMENTS<br />
                <span className="text-white/20">& WINS</span>
              </h2>
              
              <motion.div 
                className="max-w-xs"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed mb-4">
                  Recognition and awards from hackathons, competitions, and technical challenges.
                </p>
                <div className="h-0.5 w-12 bg-accent/40" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recognitions.map((item, index) => (
            <AchievementCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
