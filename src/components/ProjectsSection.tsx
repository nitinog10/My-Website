import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { 
  ArrowUpRight, 
  Github, 
  Layers, 
  Cpu, 
  Navigation, 
  BookOpen, 
  Compass, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

const projects = [
  {
    id: "01",
    name: "ATMOPREDICT",
    description: "NASA Space Apps Challenge winning project. A complex predictive model utilizing historical climate data to forecast environmental shifts and potential climate anomalies with high-fidelity visualization mapping.",
    stack: ["ML", "Python", "Satellite Data"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200",
    github: "https://github.com/nitinog10/AtmoPredict.git",
    theme: "#0EA5E9",
    category: "RESEARCH & ANALYTICS",
    icon: Compass
  },
  {
    id: "02",
    name: "AIRPULSE",
    description: "Real-time national AQI analysis ecosystem. Features advanced predictive modeling for air quality fluctuations across major Indian urban centers with interactive spatial data maps.",
    stack: ["Streamlit", "ML", "Analytics"],
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=1200",
    github: "https://github.com/nitinog10/air-pulse.git",
    theme: "#10B981",
    category: "ENVIRONMENT AI",
    icon: Cpu
  },
  {
    id: "03",
    name: "CAMPUS MITRA",
    description: "Enterprise-grade RAG-powered AI ecosystem for institutional assistance. Orchestrates multiple LLM agents to provide complex query resolution based on specific campus knowledge bases.",
    stack: ["LLMs", "RAG", "Python"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=1200",
    github: "https://github.com/nitinog10/Campus-mitra.git",
    theme: "#F59E0B",
    category: "LLM AGENTIC SYSTEMS",
    icon: Layers
  },
  {
    id: "04",
    name: "BHARATTRIPAI",
    description: "Intelligent sovereign travel assistant tailored for the Indian landscape. Uses NLP to facilitate deep cultural discovery through personalized itineraries and semantic discovery of hidden locations.",
    stack: ["NLP", "Travel AI", "FastAPI"],
    image: "https://images.unsplash.com/photo-1524492707947-2f85a64a6bb8?w=1200",
    github: "https://github.com/nitinog10/Beta-20-.git",
    theme: "#EF4444",
    category: "SOVEREIGN AI",
    icon: Navigation
  },
  {
    id: "05",
    name: "FOUNDATION LMS",
    description: "Scalable modern architecture for large-scale educational management. Focuses on modular design patterns, reactive UI, and backend efficiency for high-concurrency learning environments.",
    stack: ["React", "Architecture", "Convex"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200",
    github: "https://github.com/nitinog10/Learning-management-system.git",
    theme: "#8B5CF6",
    category: "SYSTEMS DESIGN",
    icon: BookOpen
  }
];

const ProjectCaseStudy = ({ project, active }: { project: typeof projects[0], active: boolean }) => {
  const container = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={container}
      className={`absolute inset-0 w-full h-full p-4 md:p-12 lg:p-24 flex items-center justify-center transition-all duration-1000 ${
        active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none scale-95"
      }`}
    >
      <div className="grid grid-cols-12 gap-12 max-w-7xl w-full">
        {/* Visual Showcase */}
        <div className="col-span-12 lg:col-span-7 relative h-[300px] md:h-[500px] rounded-[30px] md:rounded-[60px] overflow-hidden group border border-white/5 shadow-2xl">
           <motion.img 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
           
           <div className="absolute top-8 left-8 flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                <project.icon className="w-6 h-6 text-white" />
              </div>
           </div>

           <div className="absolute bottom-8 right-8">
              <a 
                href={project.github} 
                target="_blank" 
                className="flex items-center gap-2 p-5 rounded-full bg-accent text-black font-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,255,200,0.4)]"
              >
                  <ArrowUpRight className="w-6 h-6" />
              </a>
           </div>
        </div>

        {/* Text Storytelling */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
           <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
           >
              <span className="text-accent text-[10px] md:text-xs font-black tracking-[0.6em] uppercase mb-1">{project.category}</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4 md:mb-8 group">
                {project.name}
              </h2>
              
              <p className="text-white/40 text-sm md:text-md leading-relaxed mb-8 border-l-2 border-accent/20 pl-6">
                 {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-12">
                  {project.stack.map(s => (
                    <span key={s} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold text-white/50 tracking-widest uppercase">
                       {s}
                    </span>
                  ))}
              </div>

              <div className="flex items-center gap-8">
                <a 
                    href={project.github} 
                    target="_blank" 
                    className="flex items-center gap-4 group"
                >
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                        <Github className="w-5 h-5 group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold group-hover:text-white transition-colors">
                        Source Code
                    </span>
                </a>
              </div>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i === 0 ? projects.length - 1 : i - 1));

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-10 blur-[120px] transition-all duration-1000 scale-125 pointer-events-none"
        style={{ background: `radial-gradient(circle at 70% 30%, ${projects[index].theme}, transparent)` }}
      />

      {/* Hero Header Context */}
      <div className="absolute top-12 left-12 flex items-center gap-12 z-20 pointer-events-none opacity-20">
         <span className="text-[10px] font-black text-white tracking-[1em] uppercase">M-STORY_004</span>
         <div className="h-px w-24 bg-white/30" />
         <span className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">FEAT_SELECTED_WORKS</span>
      </div>

      {/* Progress Sidebar */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
          {projects.map((p, i) => (
             <div 
                key={p.id}
                onClick={() => setIndex(i)}
                className={`w-1 transition-all duration-500 cursor-pointer ${i === index ? "h-12 bg-accent" : "h-4 bg-white/10 hover:bg-white/30"}`}
             />
          ))}
          <span className="text-white/20 text-[10px] font-black mt-4 vertical-text font-mono">
             {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
      </div>

      {/* Main Content Areas */}
      <div className="relative w-full h-full min-h-screen flex items-center justify-center">
         <AnimatePresence mode="wait">
            {projects.map((p, i) => (
                <ProjectCaseStudy key={p.id} project={p} active={i === index} />
            ))}
         </AnimatePresence>
      </div>

      {/* Dynamic Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-24 z-20">
         <button 
            onClick={prev}
            className="group flex flex-col items-center gap-4 transition-all hover:-translate-x-2"
         >
             <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(0,255,200,0.1)] transition-all">
                <ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-accent" />
             </div>
             <span className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-black group-hover:text-white transition-colors">Previous_P</span>
         </button>

         <button 
            onClick={next}
            className="group flex flex-col items-center gap-4 transition-all hover:translate-x-2"
         >
             <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(0,255,200,0.1)] transition-all">
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-accent" />
             </div>
             <span className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-black group-hover:text-white transition-colors">Next_P</span>
         </button>
      </div>

      <style>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;