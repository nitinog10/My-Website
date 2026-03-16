import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const skillGroups = [
  {
    category: 'CORE AI & ML',
    skills: ['Generative AI (LLMs, Prompt Engineering, RAG)', 'Computer Vision (OpenCV, Object Detection, Segmentation)', 'NLP & Model Fine-Tuning', 'Intelligent Agents & Multi-Agent Systems']
  },
  {
    category: 'ENGINEERING & ARCHITECTURE',
    skills: ['Full-Stack Development (Next.js, React)', 'Backend APIs (Node.js, FastAPI)', 'Scalable AI System Design', 'MCP Servers & AI Infrastructure', 'Cloud-Native Development']
  },
  {
    category: 'TOOLS & PLATFORMS',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Docker', 'Firebase', 'Google Cloud', 'Three.js / Web-based 3D', 'Git', 'CI/CD Pipelines']
  },
  {
    category: 'CURRENT FOCUS',
    skills: ['Advanced Computer Vision Techniques', 'RAG Systems & Knowledge-Grounded AI', 'Building Production-Grade AI Systems', 'Exploring AI + 3D + Web Experiences']
  }
];

// Card component with better animations
const SkillCard = ({ group, index }: { group: typeof skillGroups[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const xOffset = isLeft ? -80 : 80;
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <div ref={cardRef} className="relative">
      {/* Timeline point */}
      <motion.div
        className="absolute left-1/2 top-6 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
        style={{ opacity }}
      >
        <motion.div 
          className="w-3 h-3 rounded-full bg-accent"
          animate={{
            boxShadow: [
              '0 0 15px rgba(0,255,200,0.6)',
              '0 0 25px rgba(0,255,200,0.8)',
              '0 0 15px rgba(0,255,200,0.6)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Card container - alternating sides */}
      <div className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
        <motion.div
          className={`relative w-full md:w-[44%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
          style={{ opacity, x, scale }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Connector line */}
          <motion.div
            className={`absolute top-8 ${isLeft ? 'right-0' : 'left-0'} w-12 h-px hidden md:block`}
            style={{
              background: isLeft 
                ? 'linear-gradient(to right, transparent, rgba(0,255,200,0.3))' 
                : 'linear-gradient(to left, transparent, rgba(0,255,200,0.3))'
            }}
            animate={hovered ? {
              background: isLeft
                ? 'linear-gradient(to right, transparent, rgba(0,255,200,0.6))'
                : 'linear-gradient(to left, transparent, rgba(0,255,200,0.6))'
            } : {}}
          />

          {/* Card */}
          <motion.div
            className="group relative rounded-2xl p-5 md:p-6 overflow-hidden"
            style={{
              background: 'rgba(17, 17, 20, 0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{
              scale: 1.03,
              border: '1px solid rgba(0,255,200,0.3)',
              boxShadow: '0 8px 40px rgba(0,255,200,0.15)',
              transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            {/* Animated gradient border */}
            {hovered && (
              <motion.div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,200,0.2), transparent, rgba(0,255,200,0.2))',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}

            {/* Top accent border */}
            <motion.div 
              className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={hovered ? {
                opacity: [0.5, 1, 0.5],
              } : {
                opacity: 0.5
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Index number */}
            <motion.span 
              className="text-accent text-xs font-medium tracking-wider mb-4 block" 
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              animate={hovered ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              } : {
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              0{index + 1}
            </motion.span>
            
            {/* Category header */}
            <motion.h3 
              className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight" 
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              animate={hovered ? {
                x: 5,
                color: '#00ffc8',
              } : {
                x: 0,
                color: '#ffffff',
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {group.category.split(' ').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
            </motion.h3>

            {/* Skills list */}
            <div className="space-y-2">
              {group.skills.map((skill, i) => (
                <motion.div 
                  key={skill} 
                  className="group/skill"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <motion.span 
                    className="text-sm text-white/50 transition-colors duration-300 leading-relaxed block cursor-default" 
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    whileHover={{
                      color: '#60d5f0',
                      x: 3,
                      textShadow: '0 0 8px rgba(96, 213, 240, 0.5)',
                      transition: {
                        duration: 0.2
                      }
                    }}
                  >
                    {skill}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Corner brackets on hover */}
            {hovered && (
              <>
                <motion.div
                  className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "backOut", delay: 0.1 }}
                />
              </>
            )}

            {/* Particle burst on hover */}
            {hovered && (
              <>
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                    style={{
                      backgroundColor: '#00ffc8',
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 10px #00ffc8',
                    }}
                    initial={{ 
                      x: '-50%', 
                      y: '-50%',
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 60}px)`,
                      y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 60}px)`,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
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
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">002</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">CAPABILITIES</span>
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
                WHAT I<br />
                <span className="text-white/20">WORK WITH</span>
              </motion.h2>
              <motion.img
                src="/nodejs.png"
                alt="nodejs sticker"
                className="hidden md:block flex-shrink-0"
                style={{ height: 'clamp(100px, 13vw, 180px)', width: 'auto', opacity: 0.9, borderRadius: '12px' }}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 0.9, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Skills with timeline */}
        <div className="relative">
          {/* Skills cards */}
          <div className="space-y-12 md:space-y-16">
            {skillGroups.map((group, index) => (
              <SkillCard key={group.category} group={group} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
