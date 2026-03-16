import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Github, 
  Layers, 
  Cpu, 
  Navigation, 
  BookOpen, 
  Compass, 
  ChevronRight, 
  ChevronLeft,
  ExternalLink,
  Code2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    name: "ATMOPREDICT",
    tagline: "Climate Intelligence System",
    description: "NASA Space Apps Challenge winning project. A complex predictive model utilizing historical climate data to forecast environmental shifts and potential climate anomalies with high-fidelity visualization mapping.",
    fullDescription: "Advanced machine learning system for climate prediction using satellite data, featuring real-time anomaly detection, interactive visualizations, and actionable insights for environmental planning.",
    stack: ["ML", "Python", "Satellite Data", "Data Science"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200",
    github: "https://github.com/nitinog10/AtmoPredict.git",
    theme: "#0EA5E9",
    category: "RESEARCH & ANALYTICS",
    icon: Compass,
    stats: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Datasets", value: "50K+" },
      { label: "Impact", value: "Global" }
    ]
  },
  {
    id: "02",
    name: "AIRPULSE",
    tagline: "Real-time Air Quality Network",
    description: "Real-time national AQI analysis ecosystem. Features advanced predictive modeling for air quality fluctuations across major Indian urban centers with interactive spatial data maps.",
    fullDescription: "Comprehensive air quality monitoring platform with predictive analytics, real-time data streaming, and geospatial visualization for environmental health insights.",
    stack: ["Streamlit", "ML", "Analytics", "Geospatial"],
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=1200",
    github: "https://github.com/nitinog10/air-pulse.git",
    theme: "#10B981",
    category: "ENVIRONMENT AI",
    icon: Cpu,
    stats: [
      { label: "Cities", value: "50+" },
      { label: "Users", value: "10K+" },
      { label: "Updates", value: "Real-time" }
    ]
  },
  {
    id: "03",
    name: "CAMPUS MITRA",
    tagline: "Institutional AI Assistant",
    description: "Enterprise-grade RAG-powered AI ecosystem for institutional assistance. Orchestrates multiple LLM agents to provide complex query resolution based on specific campus knowledge bases.",
    fullDescription: "Multi-agent AI system with retrieval-augmented generation, seamlessly integrating institutional knowledge with conversational intelligence for 24/7 campus support.",
    stack: ["LLMs", "RAG", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=1200",
    github: "https://github.com/nitinog10/Campus-mitra.git",
    theme: "#F59E0B",
    category: "LLM AGENTIC SYSTEMS",
    icon: Layers,
    stats: [
      { label: "Queries/Day", value: "1000+" },
      { label: "Accuracy", value: "96.8%" },
      { label: "Response Time", value: "<2s" }
    ]
  },
  {
    id: "04",
    name: "BHARATTRIPAI",
    tagline: "Intelligent Travel Companion",
    description: "Intelligent sovereign travel assistant tailored for the Indian landscape. Uses NLP to facilitate deep cultural discovery through personalized itineraries and semantic discovery of hidden locations.",
    fullDescription: "AI-powered travel planning platform leveraging NLP and cultural semantic understanding to create unique Indian travel experiences with hidden gem discovery.",
    stack: ["NLP", "Travel AI", "FastAPI", "Semantic Search"],
    image: "https://images.unsplash.com/photo-1524492707947-2f85a64a6bb8?w=1200",
    github: "https://github.com/nitinog10/Beta-20-.git",
    theme: "#EF4444",
    category: "SOVEREIGN AI",
    icon: Navigation,
    stats: [
      { label: "Locations", value: "5K+" },
      { label: "Languages", value: "10+" },
      { label: "Culture Score", value: "98%" }
    ]
  },
  {
    id: "05",
    name: "FOUNDATION LMS",
    tagline: "Scalable Learning Platform",
    description: "Scalable modern architecture for large-scale educational management. Focuses on modular design patterns, reactive UI, and backend efficiency for high-concurrency learning environments.",
    fullDescription: "Enterprise-grade learning management system with microservices architecture, real-time collaboration, and performance-optimized for thousands of concurrent learners.",
    stack: ["React", "Architecture", "Convex", "NodeJS"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200",
    github: "https://github.com/nitinog10/Learning-management-system.git",
    theme: "#8B5CF6",
    category: "SYSTEMS DESIGN",
    icon: BookOpen,
    stats: [
      { label: "Students", value: "50K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Load Handling", value: "10K RPS" }
    ]
  }
];

type ProjectShowcaseProps = {
  project: typeof projects[0];
  isActive: boolean;
  index: number;
  direction: number;
};

const ProjectShowcase = ({ project, isActive, index, direction }: ProjectShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        x: direction > 0 ? 100 : -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Image parallax effect
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isActive, direction]);

  const IconComponent = project.icon;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          ref={containerRef}
          key={project.id}
          className="absolute inset-0 w-full"
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full">
            {/* Visual Showcase */}
            <motion.div className="relative h-[400px] md:h-[600px] lg:h-full rounded-3xl lg:rounded-4xl overflow-hidden group">
              <motion.div
                ref={imageRef}
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

              {/* Category badge */}
              <motion.div
                className="absolute top-6 left-6 flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="p-3 rounded-xl backdrop-blur-xl"
                  style={{
                    backgroundColor: `${project.theme}20`,
                    border: `1px solid ${project.theme}40`,
                  }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: project.theme }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: project.theme }}
                >
                  {project.category}
                </span>
              </motion.div>

              {/* Project number */}
              <motion.div
                className="absolute bottom-6 left-6 text-white/20 font-black text-6xl md:text-8xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.id}
              </motion.div>

              {/* GitHub link */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex flex-col justify-center gap-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Title */}
              <div>
                <motion.span
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: project.theme }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.tagline}
                </motion.span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mt-3 leading-[0.9]">
                  {project.name}
                </h2>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-lg text-white/70 leading-relaxed mb-4 border-l-4 pl-6" style={{ borderColor: project.theme }}>
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {project.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-semibold text-white/70 hover:bg-white/10 transition-colors"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 w-fit px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-black transition-all group mt-4"
                style={{ backgroundColor: project.theme }}
                whileHover={{ gap: 12, paddingRight: 32 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Code2 className="w-5 h-5" />
                View Project
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });

  const goToProject = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextProject = () => {
    goToProject((currentIndex + 1) % projects.length);
  };

  const prevProject = () => {
    goToProject(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(containerRef.current, {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-gradient-to-b from-black via-black to-black">
      {/* Animated background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentProject.theme}10 0%, transparent 50%)`,
          transition: "background 0.8s ease",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
            003 — Featured Projects
          </span>
          <h2 className="text-[clamp(2.5rem, 8vw, 6rem)] font-bold text-white uppercase tracking-tighter leading-[0.9]">
            Showcase of<br />
            <span className="text-white/20">Work & Impact</span>
          </h2>
        </motion.div>

        {/* Project showcase */}
        <div className="relative h-[600px] md:h-[700px] lg:h-[750px] rounded-[40px] overflow-hidden border border-white/5 bg-black/30 backdrop-blur-sm">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              isActive={index === currentIndex}
              index={index}
              direction={direction}
            />
          ))}
        </div>

        {/* Navigation and indicators */}
        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Previous/Next buttons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full border border-white/10 hover:border-accent/30 transition-all group"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-accent" />
            </motion.button>
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full border border-white/10 hover:border-accent/30 transition-all group"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-accent" />
            </motion.button>
          </motion.div>

          {/* Project indicators */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToProject(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? "h-3 px-6 rounded-full"
                    : "h-2 w-2 rounded-full"
                }`}
                style={{
                  backgroundColor: index === currentIndex ? currentProject.theme : "rgba(255,255,255,0.15)",
                }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>

          {/* Project counter */}
          <motion.div
            className="text-sm font-bold text-white/50 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span style={{ color: currentProject.theme }}>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span> / {String(projects.length).padStart(2, "0")}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;