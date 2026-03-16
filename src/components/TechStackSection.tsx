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
  const IconComponent = tech.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        scale: 0.5, 
        rotateY: -180,
        z: -200 
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        z: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 },
          scale: { 
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }
      } : { 
        opacity: 0, 
        scale: 0.5, 
        rotateY: -180,
        z: -200,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: 1000,
        transformOrigin: 'center center'
      }}
    >
      <motion.div
        className="relative bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 overflow-hidden cursor-pointer group"
        style={{
          background: hovered 
            ? `linear-gradient(135deg, ${tech.color}08, transparent)` 
            : 'rgba(0,0,0,0.2)',
        }}
        whileHover={{ 
          scale: 1.05,
          y: -5,
          borderColor: tech.color + '40',
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
      >
        {/* Simple glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${tech.color}15, transparent 60%)`,
          }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4"
          animate={hovered ? { 
            y: -8,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 17
            }
          } : { 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 17
            }
          }}
        >
          <motion.div
            animate={hovered ? { 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.15,
              transition: {
                rotate: {
                  duration: 0.5,
                  ease: "easeInOut"
                },
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }
            } : { 
              rotate: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <IconComponent
              className="w-12 h-12 md:w-14 md:h-14"
              style={{
                color: hovered ? tech.color : '#ffffff',
                filter: hovered 
                  ? `drop-shadow(0 0 20px ${tech.color})` 
                  : 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>

          <div className="text-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              {tech.name}
            </h3>
            <p 
              className="text-[10px] uppercase tracking-widest font-medium"
              style={{ color: hovered ? tech.color : '#666' }}
            >
              {tech.category}
            </p>
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-full"
          style={{ backgroundColor: tech.color }}
          initial={{ width: 0, x: 0 }}
          animate={hovered ? { 
            width: '100%',
            transition: {
              duration: 0.5,
              ease: [0.65, 0, 0.35, 1]
            }
          } : { 
            width: 0,
            transition: {
              duration: 0.4,
              ease: [0.65, 0, 0.35, 1]
            }
          }}
        />
        
        {/* Particle effect on hover */}
        {hovered && (
          <>
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: tech.color }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{
                scale: [0, 1, 0],
                x: ['-50%', '-150%', '-250%'],
                y: ['-50%', '-150%', '-250%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: tech.color }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{
                scale: [0, 1, 0],
                x: ['-50%', '50%', '150%'],
                y: ['-50%', '-150%', '-250%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: tech.color }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{
                scale: [0, 1, 0],
                x: ['-50%', '-150%', '-250%'],
                y: ['-50%', '50%', '150%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: tech.color }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{
                scale: [0, 1, 0],
                x: ['-50%', '50%', '150%'],
                y: ['-50%', '50%', '150%'],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </>
        )}
      </motion.div>
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
            <h2 className="text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter leading-[0.8]">
              TECHNICAL<br />
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">23+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">8+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">5+</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">AI Frameworks</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">100%</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Production Ready</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
