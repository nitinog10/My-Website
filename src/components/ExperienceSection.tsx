import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, Building2, MapPin, Loader2 } from "lucide-react";

/** Array of experiences */
const experiences = [
  {
    role: "CO-FOUNDER",
    company: "BUGBICEPS.IN",
    period: "PRESENT",
    description: "Co-founding an innovative tech platform aiming to simplify complex engineering concepts into high-impact digital solutions.",
    tags: ["Entrepreneurship", "Product Vision", "Leadership"],
    location: "INDIA",
    theme: "#00ffc8",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    role: "HEAD ALUMNI",
    company: " SAC OIST ",
    period: "2025 — 26",
    description: "Leading one of the largest student bodies of oist, managing external relations and mentorship programs for technical students.",
    tags: ["Community", "Strategy", "Public Speaking"],
    location: "BHOPAL",
    theme: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
  },
  {
    role: "INTERN",
    company: "ENTOPLEARNING.COM",
    period: "2026",
    description: "Built the foundational LMS modules, focus on core backend performance and scalable educational infrastructure.",
    tags: ["Backend", "LMS", "Python"],
    location: "REMOTE",
    theme: "#0EA5E9",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    role: "AI DEVELOPER",
    company: "TECHBUS",
    period: "BANGALORE",
    description: "Engineered high-accuracy NLP models for conversational bots and integrated them into existing CRM workflows.",
    tags: ["AI", "NLP", "Remote"],
    location: "BANGALORE",
    theme: "#F59E0B",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
  },
  {
    role: "AI & TECH OPS",
    company: "HARON INDIA",
    period: "INDIA",
    description: "Collaborated in fast-paced teams to automate operational workflows using advanced AI prototypes.",
    tags: ["Tech Ops", "Automation", "AI"],
    location: "INDIA",
    theme: "#EF4444",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    role: "B.TECH (AIML)",
    company: "ORIENTAL GROUP",
    period: "2024 — 2028",
    description: "Specializing in the intersection of Artificial Intelligence and Machine Learning architecture.",
    tags: ["AIML", "Engineering", "Core"],
    location: "BHOPAL",
    theme: "#10B981",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
  }
];

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0], index: number }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="w-screen h-full flex items-center justify-center p-4 md:p-12 relative group shrink-0">
      
      {/* Clean card container with full rectangular image */}
      <div className="relative w-full max-w-[85vw] md:max-w-5xl h-auto md:h-[55vh] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(0,255,200,0.1)]">
        
        {/* Left Side: Full Rectangular Image */}
        <div className="w-full md:w-[50%] h-[300px] md:h-full relative overflow-hidden bg-black">
           <AnimatePresence>
              {imageStatus === 'loading' && (
                <motion.div 
                  exit={{ opacity: 0 }} 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30"
                >
                  <Loader2 className="w-6 h-6 text-white/30 animate-spin mb-3" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30">Loading</span>
                </motion.div>
              )}
           </AnimatePresence>
           
           <img 
              src={exp.image} 
              alt={exp.role}
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-out
                ${imageStatus === 'loaded' ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
                group-hover:scale-105
              `}
              style={{
                imageRendering: 'crisp-edges',
                WebkitFontSmoothing: 'antialiased',
              }}
            />
            
            {/* Subtle gradient overlay - lighter for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
            
            {/* Accent border on hover */}
            <div 
               className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ backgroundColor: exp.theme }}
            />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[50%] h-full p-8 md:p-12 flex flex-col justify-center relative bg-black">
          
          {/* Period and Location Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/40 backdrop-blur-md" style={{ borderColor: `${exp.theme}40` }}>
              <Briefcase className="w-4 h-4" style={{ color: exp.theme }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: exp.theme }}>
                {exp.period}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
              <MapPin className="w-4 h-4 text-white/60" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                {exp.location}
              </span>
            </div>
          </div>
          
          {/* Experience Number */}
          <div className="text-sm font-mono text-white/30 mb-3">
            0{index + 1}
          </div>
          
          {/* Role */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[0.95] mb-4 transition-all duration-300 group-hover:text-white/90">
             {exp.role}
          </h2>

          {/* Company */}
          <div className="flex items-center gap-3 mb-6">
             <Building2 className="w-5 h-5 text-white/50" />
             <h3 className="text-xl md:text-2xl font-bold text-white/80 uppercase tracking-widest">
                 {exp.company}
             </h3>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 transition-colors duration-300 group-hover:text-white/80">
             {exp.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
             {exp.tags.map((tag) => (
               <span 
                 key={tag} 
                 className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 tracking-wide uppercase transition-all hover:bg-white/10 hover:border-white/20"
               >
                  {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative min-h-screen bg-black py-16 md:py-24">
      
      {/* Container */}
      <div className="flex flex-col justify-center h-full overflow-hidden">
        
        {/* Section Heading */}
        <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-[10px] md:text-sm tracking-[0.5em] text-accent font-bold uppercase py-1 border-b border-accent/30">004 | JOURNEY</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
            EXPERIENCE
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto rounded-full mt-3" />
        </div>

        {/* Horizontal Track - Auto-scrolling infinite loop (Left to Right) */}
        <motion.div 
          className="flex w-[1200vw] relative z-10 items-center mt-12 md:mt-16"
          animate={{
            x: ["-50%", "0%"]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* Duplicate experiences for infinite loop effect */}
          {[...experiences, ...experiences].map((exp, i) => (
             <ExperienceCard key={`exp-${i}`} exp={exp} index={i % experiences.length} />
          ))}
        </motion.div>
        
      </div>
      
    </section>
  );
};

export default ExperienceSection;