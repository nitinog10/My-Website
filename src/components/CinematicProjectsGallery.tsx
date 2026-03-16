import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Github,
  Layers,
  Cpu,
  Navigation,
  BookOpen,
  Compass,
  X,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string;
  stack: string[];
  image: string;
  github: string;
  live?: string;
  theme: string;
  accentColor: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 'atmopredict',
    number: '01',
    name: 'ATMOPREDICT',
    category: 'CLIMATE INTELLIGENCE',
    description: 'NASA Space Apps Challenge Winner',
    overview: 'An advanced climate prediction system analyzing historical meteorological data to forecast environmental shifts with precision.',
    challenge: 'Processing massive satellite datasets and creating accurate predictive models for climate anomalies',
    solution: 'Implemented multi-model ensemble learning with geospatial data processing and visualization mapping',
    impact: 'Won NASA Space Apps Challenge - helping climate scientists make informed predictions',
    stack: ['ML', 'Python', 'Satellite Data', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600&h=900&fit=crop',
    github: 'https://github.com/nitinog10/AtmoPredict.git',
    theme: 'from-blue-500 to-cyan-400',
    accentColor: '#0EA5E9',
    icon: <Compass className="w-8 h-8" />,
  },
  {
    id: 'airpulse',
    number: '02',
    name: 'AIRPULSE',
    category: 'ENVIRONMENTAL MONITORING',
    description: 'Real-time National AQI Ecosystem',
    overview: 'A comprehensive air quality monitoring system providing real-time analysis across major Indian urban centers.',
    challenge: 'Aggregating data from multiple sources and providing real-time analysis with predictive modeling',
    solution: 'Built scalable Streamlit application with ML-based forecasting and interactive spatial visualizations',
    impact: 'Provides actionable insights to 10,000+ daily users for health-conscious decisions',
    stack: ['Streamlit', 'Machine Learning', 'Analytics', 'Real-time API'],
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=1600&h=900&fit=crop',
    github: 'https://github.com/nitinog10/air-pulse.git',
    theme: 'from-green-500 to-emerald-400',
    accentColor: '#10B981',
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    id: 'campusmitra',
    number: '03',
    name: 'CAMPUS MITRA',
    category: 'INTELLIGENT ASSISTANTS',
    description: 'Enterprise RAG-Powered AI System',
    overview: 'An intelligent campus assistant powered by advanced RAG and multi-agent architecture for institutional support.',
    challenge: 'Building a knowledge base system that understands complex queries in institutional context',
    solution: 'Orchestrated multiple LLM agents with retrieval-augmented generation for context-aware responses',
    impact: 'Reduced student support queries by 60% while improving satisfaction scores to 92%',
    stack: ['LLMs', 'RAG', 'Python', 'Vector DB'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=1600&h=900&fit=crop',
    github: 'https://github.com/nitinog10/Campus-mitra.git',
    theme: 'from-amber-500 to-orange-400',
    accentColor: '#F59E0B',
    icon: <Layers className="w-8 h-8" />,
  },
  {
    id: 'bharattripai',
    number: '04',
    name: 'BHARAT TRIPAI',
    category: 'INTELLIGENT TRAVEL',
    description: 'Sovereign Travel Intelligence',
    overview: 'A culturally-aware travel assistant designed specifically for Indian exploration and discovery.',
    challenge: 'Creating an AI that understands deep cultural nuances and can recommend authentic experiences',
    solution: 'Developed NLP-powered semantic search with cultural context embeddings and personalized itineraries',
    impact: 'Helped thousands discover hidden gems and cultural landmarks across India',
    stack: ['NLP', 'FastAPI', 'Embeddings', 'Travel Intelligence'],
    image: 'https://images.unsplash.com/photo-1524492707947-2f85a64a6bb8?w=1600&h=900&fit=crop',
    github: 'https://github.com/nitinog10/Beta-20-.git',
    theme: 'from-red-500 to-pink-400',
    accentColor: '#EF4444',
    icon: <Navigation className="w-8 h-8" />,
  },
  {
    id: 'foundationlms',
    number: '05',
    name: 'FOUNDATION LMS',
    category: 'EDUCATION TECHNOLOGY',
    description: 'Scalable Learning Management System',
    overview: 'A modern, responsive learning platform built with cutting-edge architecture for large-scale educational needs.',
    challenge: 'Creating a system that handles high concurrency and provides responsive user experience at scale',
    solution: 'Implemented modular architecture with reactive UI patterns and optimized backend infrastructure',
    impact: 'Supporting 5,000+ concurrent users with 99.5% uptime and sub-100ms response times',
    stack: ['React', 'Architecture', 'Convex', 'Real-time Sync'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&h=900&fit=crop',
    github: 'https://github.com/nitinog10/Learning-management-system.git',
    theme: 'from-purple-500 to-violet-400',
    accentColor: '#8B5CF6',
    icon: <BookOpen className="w-8 h-8" />,
  },
];

const ProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) => {
  return (
    <motion.div
      className="group cursor-pointer h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: '-100px' }}
      onClick={() => onSelect(project)}
    >
      <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-accent/20">
        {/* Image container */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-[0.1] transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-between p-6 md:p-8 hover:from-black hover:via-black/50 z-10">
          {/* Top section */}
          <div className="flex items-start justify-between">
            <motion.div
              className="p-3 rounded-xl"
              style={{
                background: `${project.accentColor}20`,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <div style={{ color: project.accentColor }}>{project.icon}</div>
            </motion.div>
            <motion.span
              className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {project.number}
            </motion.span>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                {project.name}
              </h3>
              <p className="text-white/70 text-sm">{project.description}</p>
            </div>

            {/* Hover CTA */}
            <motion.div
              className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase">View Case Study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          }}
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Modal content */}
              <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-xl">
                {/* Hero image */}
                <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Hero content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <motion.div
                      className="p-4 rounded-xl w-fit mb-4"
                      style={{
                        background: `${project.accentColor}20`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div style={{ color: project.accentColor }}>{project.icon}</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p
                        className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </p>
                      <h2 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                        {project.name}
                      </h2>
                      <p className="text-white/70 text-lg max-w-2xl">{project.description}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Left column */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: project.accentColor }}
                        >
                          Overview
                        </h3>
                        <p className="text-white/70 leading-relaxed">{project.overview}</p>
                      </div>

                      <div>
                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: project.accentColor }}
                        >
                          The Challenge
                        </h3>
                        <p className="text-white/70 leading-relaxed">{project.challenge}</p>
                      </div>
                    </motion.div>

                    {/* Right column */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: project.accentColor }}
                        >
                          Our Solution
                        </h3>
                        <p className="text-white/70 leading-relaxed">{project.solution}</p>
                      </div>

                      <div>
                        <h3
                          className="text-xl font-bold mb-3"
                          style={{ color: project.accentColor }}
                        >
                          Impact & Results
                        </h3>
                        <p className="text-white/70 leading-relaxed">{project.impact}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Stack and links */}
                  <motion.div
                    className="pt-12 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-white mb-4">Technology Stack</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.stack.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 rounded-full text-sm font-semibold"
                            style={{
                              background: `${project.accentColor}15`,
                              color: project.accentColor,
                              border: `1px solid ${project.accentColor}40`,
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: `${project.accentColor}25` }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-colors"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        <span className="font-semibold">View Source Code</span>
                      </motion.a>

                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-black font-semibold"
                          style={{ backgroundColor: project.accentColor }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CinematicProjectsGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-10%' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -100]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from('.projects-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      });

      // Stagger cards
      gsap.from('.project-card', {
        duration: 0.8,
        opacity: 0,
        y: 100,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-transparent blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-purple-500/5 via-cyan-500/5 to-transparent blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          style={{ opacity, y }}
        >
          <motion.div
            className="projects-title inline-block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold">
              Featured Works
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Projects &<br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl">
            Explore detailed case studies of transformative projects that showcase innovation,
            technical excellence, and real-world impact.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <div key={project.id} className="project-card">
              <ProjectCard
                project={project}
                index={idx}
                onSelect={setSelectedProject}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interested in collaboration?
          </h3>
          <p className="text-white/60 mb-6">
            Explore my full portfolio or get in touch to discuss your next innovative project.
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 rounded-xl bg-accent text-black font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default CinematicProjectsGallery;
