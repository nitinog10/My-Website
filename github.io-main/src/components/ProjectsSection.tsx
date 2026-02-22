import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    name: 'BHARATTRIPAI',
    description: 'Smart AI-based travel companion for India. An intelligent platform that helps travelers explore India with personalized recommendations and insights.',
    stack: 'AI · Travel · Python · NLP',
    company: 'AI TRAVEL',
    image: '/Bharattripai.png',
    github: 'https://github.com/nitinog10/Beta-20-.git'
  },
  {
    name: 'LEARNING MANAGEMENT SYSTEM',
    description: 'A comprehensive platform for managing courses, students, and educational content with modern features.',
    stack: 'Full Stack · Education · React',
    company: 'EDTECH',
    image: '/learning management system.png',
    github: 'https://github.com/nitinog10/Learning-management-system.git'
  },
  {
    name: 'CAMPUS MITRA',
    description: 'RAG-powered AI chat platform for campus assistance. Helps students with queries using retrieval-augmented generation.',
    stack: 'RAG · LLM · AI Chat · Python',
    company: 'AI ASSISTANT',
    image: '/campusmitra.png',
    github: 'https://github.com/nitinog10/Campus-mitra.git'
  },
  {
    name: 'AIRPULSE',
    description: 'A Streamlit app to analyze the current AQI of different areas over the country and provide insights and future predictions.',
    stack: 'Streamlit · Python · ML · Data Analytics',
    company: 'ENVIRONMENT',
    image: '/airpulse.png',
    github: 'https://github.com/nitinog10/air-pulse.git'
  },
  {
    name: 'ATMOPREDICT',
    description: 'NASA Space Apps Challenge winning project. Weather prediction model using historical climate data for accurate forecasting and environmental analysis.',
    stack: 'Machine Learning · Python · Earth Observation Data',
    company: 'NASA SPACE APPS — WINNER',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    github: 'https://github.com/nitinog10/AtmoPredict.git'
  }
];

// 3D Project card with timeline layout
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isLeft = index % 2 === 0;
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const xOffset = isLeft ? -80 : 80;
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateX(-(e.clientY - centerY) / 30);
    setRotateY((e.clientX - centerX) / 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div ref={cardRef} className="relative">
      {/* Timeline point */}
      <motion.div
        className="absolute left-1/2 top-10 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(0,255,200,0.6)]" />
      </motion.div>

      {/* Card container - alternating sides */}
      <div className={`flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center`}>
        <motion.div
          className={`relative w-full md:w-[44%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
          style={{ opacity, x, scale }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Connector line */}
          <div
            className={`absolute top-12 ${isLeft ? 'right-0' : 'left-0'} w-12 h-px hidden md:block`}
            style={{
              background: isLeft 
                ? 'linear-gradient(to right, transparent, rgba(0,255,200,0.3))' 
                : 'linear-gradient(to left, transparent, rgba(0,255,200,0.3))'
            }}
          />

          {/* Card */}
          <motion.div
            className="group relative rounded-xl overflow-hidden transition-all duration-300 ease-out"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
            whileHover={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Project image */}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="block relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* View project overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs uppercase tracking-wider border border-white/20">
                  View Project
                </span>
              </div>
            </a>

            {/* Content */}
            <div className="p-4 md:p-5">
              {/* Company badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                style={{ 
                  background: 'rgba(0,255,200,0.08)', 
                  border: '1px solid rgba(0,255,200,0.15)'
                }}>
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] tracking-[0.12em] text-accent uppercase font-medium">
                  {project.company}
                </span>
              </div>
              
              {/* Project name */}
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
                {project.name}
              </h3>
              
              {/* Description */}
              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Stack */}
              <span className="text-[10px] text-white/30 uppercase tracking-[0.12em] block mb-3">
                {project.stack}
              </span>

              {/* GitHub link */}
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors duration-300"
              >
                <span>VIEW ON GITHUB</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <section ref={ref} className="min-h-screen py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-24">
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">003</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">WORK</span>
          </motion.div>
          
          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <motion.h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: 'var(--font-heading)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              SELECTED<br />
              <span className="text-white/20">PROJECTS</span>
            </motion.h2>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
