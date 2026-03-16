import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'ATMOPREDICT',
    subtitle: 'Climate Intelligence System',
    description: 'NASA Space Apps Challenge winner. Advanced ML system for climate prediction using satellite data with real-time anomaly detection.',
    fullStory: 'A comprehensive climate intelligence platform that processes vast amounts of satellite data to predict environmental shifts. Features include real-time anomaly detection, interactive 3D visualizations, and actionable insights for environmental planning. The system achieved 94.2% accuracy in climate pattern prediction.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200',
    tech: ['Python', 'ML', 'Satellite Data', 'Data Science'],
    github: 'https://github.com/nitinog10/AtmoPredict.git',
    color: '#0EA5E9',
    stats: { accuracy: '94.2%', datasets: '50K+', impact: 'Global' },
  },
  {
    id: '02',
    title: 'AIRPULSE',
    subtitle: 'Real-time Air Quality Network',
    description: 'National AQI analysis ecosystem with predictive modeling for air quality across major Indian urban centers.',
    fullStory: 'Comprehensive air quality monitoring platform featuring predictive analytics, real-time data streaming from 50+ cities, and geospatial visualization. The system processes millions of data points daily to provide environmental health insights and early warning systems for pollution spikes.',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=1200',
    tech: ['Streamlit', 'ML', 'Analytics', 'Geospatial'],
    github: 'https://github.com/nitinog10/air-pulse.git',
    color: '#10B981',
    stats: { cities: '50+', users: '10K+', updates: 'Real-time' },
  },
  {
    id: '03',
    title: 'CAMPUS MITRA',
    subtitle: 'Institutional AI Assistant',
    description: 'Enterprise RAG-powered AI with multi-agent orchestration for complex institutional query resolution.',
    fullStory: 'Multi-agent AI system leveraging retrieval-augmented generation to provide 24/7 campus support. Seamlessly integrates institutional knowledge with conversational intelligence, handling 1000+ queries daily with 96.8% accuracy and sub-2-second response times.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=1200',
    tech: ['LLMs', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/nitinog10/Campus-mitra.git',
    color: '#F59E0B',
    stats: { queries: '1000+/day', accuracy: '96.8%', response: '<2s' },
  },
  {
    id: '04',
    title: 'BHARATTRIPAI',
    subtitle: 'Intelligent Travel Companion',
    description: 'NLP-powered travel assistant for Indian cultural discovery with semantic location search.',
    fullStory: 'AI-powered travel platform leveraging NLP and cultural semantic understanding to create unique Indian travel experiences. Features hidden gem discovery across 5K+ locations, supports 10+ languages, and provides culturally-aware itinerary planning with 98% cultural accuracy score.',
    image: 'https://images.unsplash.com/photo-1524492707947-2f85a64a6bb8?w=1200',
    tech: ['NLP', 'Travel AI', 'FastAPI', 'Semantic Search'],
    github: 'https://github.com/nitinog10/Beta-20-.git',
    color: '#EF4444',
    stats: { locations: '5K+', languages: '10+', culture: '98%' },
  },
  {
    id: '05',
    title: 'FOUNDATION LMS',
    subtitle: 'Scalable Learning Platform',
    description: 'Enterprise learning management with microservices architecture for high-concurrency environments.',
    fullStory: 'Enterprise-grade LMS with microservices architecture supporting 50K+ students. Features real-time collaboration, performance-optimized for 10K requests per second, and maintains 99.9% uptime. Built with modern reactive UI patterns and modular backend design.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200',
    tech: ['React', 'Architecture', 'Convex', 'NodeJS'],
    github: 'https://github.com/nitinog10/Learning-management-system.git',
    color: '#8B5CF6',
    stats: { students: '50K+', uptime: '99.9%', rps: '10K' },
  },
];

const ProjectCard = ({ project, onClick }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[600px] rounded-3xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Project number */}
        <motion.div
          className="absolute top-8 left-8 text-white/20 font-black text-6xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {project.id}
        </motion.div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-semibold mb-3" style={{ color: project.color }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          style={{ color: project.color }}
          whileHover={{ gap: 12 }}
        >
          View Case Study <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${project.color}20, transparent)` }}
      />
    </motion.div>
  );
};

const ProjectDetail = ({ project, onClose }: any) => {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      detailRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      ref={detailRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen p-6 md:p-12">
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        <div className="max-w-6xl mx-auto">
          {/* Hero image */}
          <motion.div
            className="relative h-[60vh] rounded-3xl overflow-hidden mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Project number overlay */}
            <div className="absolute bottom-8 left-8">
              <span className="text-8xl font-black text-white/20">{project.id}</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: project.color }}>
                  {project.subtitle}
                </span>
                <h1 className="text-6xl font-black uppercase tracking-tight text-white mt-2 mb-6">
                  {project.title}
                </h1>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  {project.fullStory}
                </p>

                {/* Tech stack */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-white transition-all"
                    style={{ backgroundColor: project.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Sidebar stats */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-8 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6">
                    Project Stats
                  </h3>
                  {Object.entries(project.stats).map(([key, value]: any, i: number) => (
                    <motion.div
                      key={key}
                      className="mb-6 last:mb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <p className="text-3xl font-black text-white mb-1">{value}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">{key}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">
                    Category
                  </h3>
                  <p className="text-lg font-bold text-white">{project.subtitle}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen py-32 overflow-hidden bg-black"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
              004 — FEATURED WORK
            </span>
            <h2 className="text-[clamp(3rem, 10vw, 8rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
              PROJECTS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                SHOWCASE
              </span>
            </h2>
            <p className="text-lg text-white/60 mt-6 max-w-2xl">
              A curated collection of AI-powered systems, platforms, and experiences that push the boundaries of technology.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsShowcase;
