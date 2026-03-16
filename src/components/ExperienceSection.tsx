import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "CO-FOUNDER",
    company: "BUGBICEPS.IN",
    period: "PRESENT",
    description: "Co-founding an innovative tech platform aiming to simplify complex engineering concepts into high-impact digital solutions.",
    tags: ["Entrepreneurship", "Product Vision", "Leadership"]
  },
  {
    role: "HEAD ALUMNI",
    company: "OIST BHOPAL",
    period: "2025 — 26",
    description: "Leading one of the largest student bodies, managing external relations and mentorship programs for technical students.",
    tags: ["Community", "Strategy", "Public Speaking"]
  },
  {
    role: "INTERN",
    company: "ENTOPLEARNING.COM",
    period: "2026",
    description: "Built the foundational LMS modules, focus on core backend performance and scalable educational infrastructure.",
    tags: ["Backend", "LMS", "Python"]
  },
  {
    role: "AI DEVELOPER",
    company: "TECHBUS",
    period: "BANGALORE",
    description: "Engineered high-accuracy NLP models for conversational bots and integrated them into existing CRM workflows.",
    tags: ["AI", "NLP", "Remote"]
  },
  {
    role: "AI & TECH OPS",
    company: "HARON INDIA",
    period: "INDIA",
    description: "Collaborated in fast-paced teams to automate operational workflows using advanced AI prototypes.",
    tags: ["Tech Ops", "Automation", "AI"]
  },
  {
    role: "B.TECH (AIML)",
    company: "ORIENTAL GROUP",
    period: "2024 — 2028",
    description: "Specializing in the intersection of Artificial Intelligence and Machine Learning architecture.",
    tags: ["AIML", "Engineering", "Core"]
  }
];

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX(-mouseY / 20);
    setRotateY(mouseX / 20);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovered(false);
  };

  return (
    <div className="min-w-[70vw] md:min-w-[40vw] lg:min-w-[32vw] flex items-center">
      <motion.div
        ref={cardRef}
        className="group relative w-full rounded-2xl p-4 md:p-5 mx-4 transition-all duration-300 ease-out overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(17, 17, 20, 0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.12)'
        }}
      >
        {/* Magnetic spotlight effect following cursor */}
        {hovered && (
          <motion.div
            className="absolute rounded-full pointer-events-none blur-3xl"
            style={{
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(0,255,200,0.15), transparent 70%)',
              left: mousePos.x - 150,
              top: mousePos.y - 150,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Split effect - top half */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,200,0.1), transparent)',
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
          }}
          animate={hovered ? {
            y: -8,
            opacity: [0, 1, 0.7],
          } : {
            y: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {/* Split effect - bottom half */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent, rgba(0,255,200,0.1))',
            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
          }}
          animate={hovered ? {
            y: 8,
            opacity: [0, 1, 0.7],
          } : {
            y: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Pointing particles */}
        {hovered && (
          <>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-50"
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
                  x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 50}px)`,
                  y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 50}px)`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: i * 0.08
                }}
              />
            ))}
          </>
        )}

        {/* Animated corner accents */}
        {hovered && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent rounded-tl-2xl pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            />
            <motion.div
              className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-accent rounded-tr-2xl pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "backOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-accent rounded-bl-2xl pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "backOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent rounded-br-2xl pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3, ease: "backOut" }}
            />
          </>
        )}

        {/* Ripple waves */}
        {hovered && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.05, 1.1],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: [1, 1.05, 1.1],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            />
          </>
        )}

        {/* Top accent border */}
        <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        
        {/* Content - relative z-index to stay above effects */}
        <div className="relative z-10">
          {/* Index number */}
          <span className="text-accent text-[10px] font-medium tracking-wider mb-3 block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            0{index + 1}
          </span>
          
          {/* Period badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-accent text-[10px] font-black tracking-[0.3em] uppercase py-0.5 px-2.5 border border-accent/20 rounded-full">
              {exp.period}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          {/* Role */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', transform: 'translateZ(20px)' }}>
            {exp.role}
          </h3>
          
          {/* Company */}
          <p className="text-accent text-[10px] uppercase tracking-wider font-medium mb-4" style={{ transform: 'translateZ(15px)' }}>
            @ {exp.company}
          </p>

          {/* Description */}
          <p className="text-white/50 text-[11px] md:text-xs leading-relaxed mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif', transform: 'translateZ(10px)' }}>
            {exp.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(5px)' }}>
            {exp.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[9px] text-white/40 uppercase tracking-wider px-2 py-0.5 border border-white/10 rounded-full hover:border-accent/40 hover:text-accent/60 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom progress line */}
        <div className="absolute bottom-0 left-0 h-1 bg-accent/30 w-0 group-hover:w-full transition-all duration-700" />
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });

  useEffect(() => {
    if (!scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth;
      const horizontalScrollLength = scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex px-[10vw]">
          
          {/* Introductory entry card */}
          <div className="min-w-[60vw] md:min-w-[40vw] flex flex-col justify-center pr-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(3rem,10vw,10rem)] font-bold text-white uppercase tracking-tighter leading-none mb-4 -ml-2">
                CAREER<br />
                <span className="text-white/10 outline-text">STORY</span>
              </h2>
              <div className="flex items-center gap-6 mt-8">
                <div className="h-px w-24 bg-accent" />
                <span className="text-[10px] md:text-sm tracking-[0.6em] text-accent uppercase font-bold">Journey through time</span>
              </div>
            </motion.div>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}

          {/* End marker */}
          <div className="min-w-[40vw] flex items-center justify-center">
            <div className="h-px w-32 bg-white/10" />
            <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] px-8">Continuing</span>
            <div className="h-px w-32 bg-white/10" />
          </div>
        </div>
      </div>
      
      {/* Horizontal Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.6em] font-bold">Scroll horizontally to traverse</span>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
             <motion.div 
                className="absolute inset-0 bg-accent w-full"
                style={{ scaleX: 0, transformOrigin: "0% 50%" }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
             />
        </div>
      </div>
      
      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;