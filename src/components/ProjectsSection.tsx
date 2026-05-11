import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Layers, 
  Cpu, 
  Navigation, 
  BookOpen, 
  Compass,
  Loader2
} from "lucide-react";

/** Array of projects with corrected image paths */
const projects = [
  {
    id: "01",
    name: "DocuverseAI",
    description: "AI reads your code like a senior engineer, narrates every file with audio, and generates interactive architecture maps. Understand any codebase in minutes.",
    stack: ["React", "AWS", "Python"],
    image: "/Docuverse.png",
    github: "https://github.com/nitinog10/logorhythms.git",
    theme: "#8B5CF6",
    category: "",
    icon: BookOpen
  },
  {
    id: "02",
    name: "ATMOPREDICT",
    description: "NASA Space Apps Challenge winning project. A complex predictive model utilizing historical climate data to forecast environmental shifts and potential climate anomalies.",
    stack: ["ML", "Python", "Satellite Map"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200",
    github: "https://github.com/nitinog10/AtmoPredict.git",
    theme: "#0EA5E9",
    category: "RESEARCH & ANALYTICS",
    icon: Compass
  },
  {
    id: "03",
    name: "AIRPULSE",
    description: "Real-time national AQI analysis ecosystem. Features advanced predictive modeling for air quality fluctuations across major Indian urban centers.",
    stack: ["Streamlit", "ML", "Analytics"],
    image: "/airpulse.png",
    github: "https://github.com/nitinog10/air-pulse.git",
    theme: "#10B981",
    category: "ENVIRONMENT AI",
    icon: Cpu
  },
  {
    id: "04",
    name: "CAMPUS MITRA",
    description: "Enterprise-grade RAG-powered AI ecosystem for institutional assistance. Orchestrates multiple LLM agents to provide complex campus query resolution.",
    stack: ["LLMs", "RAG", "Python"],
    image: "/campusmitra.png",
    github: "https://github.com/nitinog10/Campus-mitra.git",
    theme: "#F59E0B",
    category: "LLM AGENTIC SYSTEMS",
    icon: Layers
  },
  {
    id: "05",
    name: "BHARATTRIPAI",
    description: "Intelligent sovereign travel assistant tailored for the Indian landscape. Uses NLP to facilitate deep cultural discovery through personalized itineraries.",
    stack: ["NLP", "Travel AI", "FastAPI"],
    image: "/Bharattripai.png",
    github: "https://github.com/nitinog10/Beta-20-.git",
    theme: "#EF4444",
    category: "SOVEREIGN AI",
    icon: Navigation
  },
  {
    id: "06",
    name: "FOUNDATION LMS",
    description: "Scalable modern architecture for large-scale educational management. Focuses on modular design patterns, reactive UI, and backend efficiency.",
    stack: ["React", "Architecture", "Convex"],
    image: "/learning%20management%20system.png",
    github: "https://github.com/nitinog10/Learning-management-system.git",
    theme: "#8B5CF6",
    category: "SYSTEMS DESIGN",
    icon: BookOpen
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="w-screen h-full flex items-center justify-center p-4 md:p-12 relative group shrink-0">
      
      {/* Clean card container with full rectangular image */}
      <div className="relative w-full max-w-[90vw] md:max-w-6xl h-auto md:h-[65vh] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
        
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
              src={project.image} 
              alt={project.name}
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
              className={`w-full h-full object-contain transition-all duration-700 ease-out
                ${imageStatus === 'loaded' ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
                group-hover:scale-105
              `}
            />
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 pointer-events-none" />
            
            {/* Accent border on hover */}
            <div 
               className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ backgroundColor: project.theme }}
            />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[50%] h-full p-8 md:p-12 flex flex-col justify-center relative bg-black">
          
          {/* Category Badge */}
          {project.category && (
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                 <project.icon className="w-4 h-4" style={{ color: project.theme }} />
               </div>
               <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/60">
                 {project.category}
               </span>
            </div>
          )}
          
          {/* Project Number */}
          <div className="text-sm font-mono text-white/30 mb-3">
            {project.id}
          </div>
          
          {/* Project Name */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6 transition-all duration-300 group-hover:text-white/90">
             {project.name}
          </h2>

          {/* Description */}
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 transition-colors duration-300 group-hover:text-white/80">
             {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
             {project.stack.map((s) => (
               <span 
                 key={s} 
                 className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 tracking-wide uppercase transition-all hover:bg-white/10 hover:border-white/20"
               >
                  {s}
               </span>
             ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-auto">
             <a 
               href={project.github} 
               target="_blank"
               rel="noreferrer"
               className="group/btn flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-lg hover:shadow-xl"
             >
                View Project
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
             </a>
             <a 
               href={project.github} 
               target="_blank"
               rel="noreferrer"
               className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 text-white/70 hover:text-white"
             >
                <Github className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="projects" className="relative min-h-screen bg-black py-16 md:py-24">
      
      {/* Container */}
      <div className="flex flex-col justify-center h-full overflow-hidden">
        
        {/* Section Heading */}
        <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-[10px] md:text-sm tracking-[0.5em] text-accent font-bold uppercase py-1 border-b border-accent/30">003 | PORTFOLIO</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
            PROJECTS
          </h2>
          <div className="w-20 h-0.5 bg-accent/40 mx-auto rounded-full mt-3" />
        </div>

        {/* Horizontal Track - Auto-scrolling infinite loop (Right to Left) */}
        <div 
          className="flex w-[1200vw] relative z-10 items-center mt-12 md:mt-16"
          style={{
            animation: 'scrollLeft 20s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Duplicate projects for infinite loop effect */}
          {[...projects, ...projects].map((p, i) => (
             <ProjectCard 
               key={`project-${i}`} 
               project={p} 
               index={i % projects.length}
             />
          ))}
        </div>
        
        <style>{`
          @keyframes scrollLeft {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
        
      </div>
      
    </section>
  );
};

export default ProjectsSection;