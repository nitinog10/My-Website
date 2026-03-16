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
    color: '#FFD700',
    size: 'large'
  },
  { 
    title: '15+ HACKATHON', 
    category: 'FINALIST',
    year: '2024-25',
    description: 'Consistently recognized across 15+ hackathons for innovative AI solutions and technical excellence.',
    image: '/15+ hackathons.jpeg',
    icon: Star,
    color: '#FF6B6B',
    size: 'medium'
  },
  { 
    title: '3 HACKATHON WINS', 
    category: 'WINS',
    year: '2024-25',
    description: 'Multiple hackathon victories showcasing expertise in AI, full-stack development, and problem-solving.',
    image: '/abc.jpeg',
    icon: Award,
    color: '#4ECDC4',
    size: 'medium'
  },
  { 
    title: 'NATIONAL LEVEL IDEATHON', 
    category: 'WINNER',
    year: '2024',
    description: 'First place at national ideathon for developing innovative tech solutions addressing real-world challenges.',
    image: '/national level ideathon.jpeg',
    icon: Zap,
    color: '#9B59B6',
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
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
        item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
      }`}
      style={{
        background: 'rgba(17, 17, 20, 0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        minHeight: '500px',
      }}
      whileHover={{
        scale: 1.02,
        border: `1px solid ${item.color}50`,
        transition: { 
          duration: 0.3,
        }
      }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4) contrast(1.1)',
          }}
          animate={hovered ? {
            scale: 1.05,
            filter: 'brightness(0.5) contrast(1.1)',
          } : {
            scale: 1,
            filter: 'brightness(0.4) contrast(1.1)',
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Gradient overlays for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(17,17,20,0.3) 0%, rgba(17,17,20,0.7) 60%, rgba(17,17,20,0.95) 100%)`
          }}
        />
        
        {/* Color accent overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${item.color}15, transparent 50%, ${item.color}10)`,
            opacity: 0,
          }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content - positioned at bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        {/* Top badges */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          {/* Category badge */}
          <motion.div
            className="px-4 py-2 rounded-full backdrop-blur-xl text-xs font-bold uppercase tracking-wider"
            style={{
              background: `${item.color}30`,
              color: item.color,
              border: `1px solid ${item.color}60`,
              boxShadow: `0 4px 20px ${item.color}20`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            {item.category}
          </motion.div>

          {/* Icon */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl"
            style={{
              background: `${item.color}25`,
              border: `1px solid ${item.color}50`,
              boxShadow: `0 4px 30px ${item.color}30`,
            }}
            animate={hovered ? {
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.15, 1],
            } : {
              rotate: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
          >
            <IconComponent 
              className="w-8 h-8" 
              style={{ color: item.color }}
            />
          </motion.div>
        </div>

        {/* Year */}
        <motion.p 
          className="text-xs text-white/40 uppercase tracking-[0.3em] mb-3 font-bold"
          animate={hovered ? { x: [0, 5, 0], opacity: 0.6 } : { x: 0, opacity: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {item.year}
        </motion.p>

        {/* Title */}
        <motion.h3 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-tight leading-tight"
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
          animate={hovered ? {
            color: item.color,
            textShadow: `0 0 30px ${item.color}60`,
          } : {
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-sm md:text-base text-white/70 leading-relaxed mb-6 max-w-2xl"
          style={{ 
            fontFamily: 'Inter, system-ui, sans-serif',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}
          animate={hovered ? { opacity: 0.9 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {item.description}
        </motion.p>

        {/* Bottom accent line */}
        <motion.div
          className="h-1 rounded-full"
          style={{ 
            backgroundColor: item.color,
            boxShadow: `0 0 20px ${item.color}60`,
          }}
          initial={{ width: '60px' }}
          animate={hovered ? { width: '100%' } : { width: '60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Animated border glow */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
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
      )}

      {/* Corner accents */}
      {hovered && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 rounded-tl-3xl z-20"
            style={{ borderColor: item.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 rounded-br-3xl z-20"
            style={{ borderColor: item.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut", delay: 0.1 }}
          />
        </>
      )}

      {/* Particle burst on hover */}
      {hovered && (
        <>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full pointer-events-none z-50"
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
                x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 100}px)`,
                y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 100}px)`,
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: i * 0.06,
                repeat: Infinity,
                repeatDelay: 0.8
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
