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
    size: 'large' // Takes 2 columns
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
        item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
      }`}
      style={{
        background: 'rgba(17, 17, 20, 0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{
        scale: 1.02,
        border: `1px solid ${item.color}40`,
        transition: { duration: 0.3 }
      }}
    >
      {/* Magnetic spotlight */}
      {hovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${item.color}20, transparent 70%)`,
            left: mousePos.x - 200,
            top: mousePos.y - 200,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${item.color}30, transparent, ${item.color}30)`,
        }}
        animate={hovered ? {
          backgroundPosition: ['0% 0%', '100% 100%'],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Image section */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          animate={hovered ? {
            scale: 1.1,
          } : {
            scale: 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, rgba(17,17,20,0.9) 100%)`
          }}
        />

        {/* Floating icon */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md"
          style={{
            background: `${item.color}20`,
            border: `1px solid ${item.color}40`,
          }}
          animate={hovered ? {
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
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
            className="w-6 h-6" 
            style={{ color: item.color }}
          />
        </motion.div>

        {/* Category badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold uppercase tracking-wider"
          style={{
            background: `${item.color}30`,
            color: item.color,
            border: `1px solid ${item.color}50`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {item.category}
        </motion.div>
      </div>

      {/* Content section */}
      <div className="relative p-6 md:p-8">
        {/* Year */}
        <motion.p 
          className="text-xs text-white/40 uppercase tracking-widest mb-3"
          animate={hovered ? { x: [0, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {item.year}
        </motion.p>

        {/* Title */}
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-tight"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          animate={hovered ? {
            color: item.color,
          } : {
            color: '#ffffff',
          }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <p 
          className="text-sm text-white/50 leading-relaxed"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {item.description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-full"
          style={{ backgroundColor: item.color }}
          initial={{ width: 0 }}
          animate={hovered ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Particle burst on hover */}
      {hovered && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full pointer-events-none z-50"
              style={{
                backgroundColor: item.color,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 10px ${item.color}`,
              }}
              initial={{ 
                x: '-50%', 
                y: '-50%',
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 80}px)`,
                y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 80}px)`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: i * 0.05
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

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">20+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Hackathons</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">4</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Major Wins</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Finalist</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100%</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Dedication</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionSection;
