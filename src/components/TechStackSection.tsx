import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython, SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiTensorflow, SiPytorch,
  SiDocker, SiKubernetes, SiMongodb, SiPostgresql,
  SiGit, SiFigma, SiVercel, SiGooglecloud, SiKeras, SiPandas, SiGreensock,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbTransform } from "react-icons/tb";

const technologies = [
  { icon: SiPython, name: "Python", color: "#3776AB", category: "Language" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Language" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", category: "Language" },
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF", category: "Frontend" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", category: "Frontend" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "Tools" },
  { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00", category: "AI" },
  { icon: SiPytorch, name: "PyTorch", color: "#EE4C2C", category: "AI" },
  { icon: SiKeras, name: "Keras", color: "#D00000", category: "AI" },
  { icon: TbTransform, name: "Transformers", color: "#FFD21E", category: "AI" },
  { icon: SiPandas, name: "Pandas", color: "#150458", category: "Data Science" },
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5", category: "DevOps" },
  { icon: FaAws, name: "AWS", color: "#FF9900", category: "Cloud" },
  { icon: SiGooglecloud, name: "GCP", color: "#4285F4", category: "Cloud" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "AI" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },
  { icon: SiVercel, name: "Vercel", color: "#FFFFFF", category: "Cloud" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Animation" },
];

const TechCard = ({ tech, index }: any) => {
  const [hovered, setHovered] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const IconComponent = tech.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();

    // Create bubbles randomly
    if (Math.random() > 0.6) {
      const newBubble = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setBubbles(prev => [...prev, newBubble]);
      
      // Remove bubble after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 1200);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        scale: 0,
        rotateZ: -180,
        y: 100
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        rotateZ: 0,
        y: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.05,
          ease: [0.34, 1.56, 0.64, 1], // Elastic ease
          opacity: { duration: 0.4 },
          scale: { 
            type: "spring",
            stiffness: 200,
            damping: 12,
            mass: 0.8
          },
          rotateZ: {
            type: "spring",
            stiffness: 150,
            damping: 15
          }
        }
      } : { 
        opacity: 0, 
        scale: 0,
        rotateZ: -180,
        y: 100,
        transition: {
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
    >
      <div className="relative p-4 overflow-visible">
        {/* Bubbles */}
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none z-50"
            style={{
              left: bubble.x,
              top: bubble.y,
              backgroundColor: tech.color,
              boxShadow: `0 0 15px ${tech.color}`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              y: [0, -80],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [1, 0.8, 0],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ))}

        {/* Icon */}
        <motion.div
          className="flex flex-col items-center gap-2"
          whileHover={{ 
            scale: 1.2,
            y: -8,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 15,
              mass: 0.5
            }
          }}
          whileTap={{
            scale: 0.9,
            rotate: [0, -10, 10, -10, 0],
            transition: {
              duration: 0.4,
              ease: "easeInOut"
            }
          }}
        >
          <motion.div
            animate={hovered ? { 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.05, 1.1, 1.05, 1],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 1]
              }
            } : { 
              rotate: 0,
              scale: 1
            }}
          >
            <motion.div
              className="rounded-full p-2 relative"
            >
              {/* Glow only on hover */}
              {hovered && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full blur-lg pointer-events-none"
                    style={{
                      backgroundColor: tech.color,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.5, 0.3],
                      scale: [0.8, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 pointer-events-none"
                    style={{ borderColor: tech.color }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.9, 1.1, 1.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </>
              )}
              
              <IconComponent
                className="w-12 h-12 md:w-14 md:h-14 relative z-10"
                style={{
                  color: hovered ? tech.color : '#888888',
                  filter: hovered 
                    ? `drop-shadow(0 0 20px ${tech.color}) brightness(1.2)` 
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Tooltip on hover */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }
              }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute top-full mt-2 whitespace-nowrap pointer-events-none z-50"
            >
              <motion.div 
                className="px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border"
                style={{ borderColor: tech.color + '40' }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${tech.color}20`,
                    `0 0 20px ${tech.color}40`,
                    `0 0 10px ${tech.color}20`,
                  ],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <p className="text-xs font-bold text-white">{tech.name}</p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: tech.color }}>
                  {tech.category}
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Ripple effect on hover */}
        {hovered && (
          <>
            {/* Single expanding ring */}
            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{ borderColor: tech.color + '60' }}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            {/* Rotating particles */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  backgroundColor: tech.color,
                  left: '50%',
                  top: '50%',
                  boxShadow: `0 0 8px ${tech.color}`,
                }}
                initial={{ 
                  x: '-50%', 
                  y: '-50%',
                  scale: 0
                }}
                animate={{
                  x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 30}px)`,
                  y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 30}px)`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} id="tech-stack" className="min-h-screen py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0a0a0b] relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] md:text-sm tracking-[0.5em] text-accent font-bold uppercase py-1 border-b border-accent/30">006 | INVENTORY</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.85]">
              TECH<br />
              <span className="text-white/20">STACK</span>
            </h2>
          </motion.div>
          
          <motion.div 
             className="max-w-xs"
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
             transition={{ delay: 0.4 }}
          >
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed mb-4">
              A breakdown of the core technologies I use to develop artificial intelligence and high-performance applications.
            </p>
            <div className="h-0.5 w-12 bg-accent/40" />
          </motion.div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
