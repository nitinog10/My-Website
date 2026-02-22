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

// 3D Project card
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const isFromLeft = index % 2 === 0;
  const xOffset = isFromLeft ? -80 : 80;
  
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
    <motion.div
      ref={cardRef}
      className="group"
      style={{ opacity, x, scale }}
    >
      <div className={`grid grid-cols-12 gap-6 md:gap-10 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
        {/* Image */}
        <motion.div 
          className={`col-span-12 md:col-span-7 ${index % 2 === 1 ? 'md:col-start-6' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
            <motion.div
              className="relative overflow-hidden rounded-xl"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
              whileHover={{
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* View project overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs uppercase tracking-wider border border-white/20">
                  View Project
                </span>
              </div>
            </motion.div>
          </a>
        </motion.div>

        {/* Content */}
        <div className={`col-span-12 md:col-span-5 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:text-right' : ''} pt-4 md:pt-0`}>
          {/* Index */}
          <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white/5 leading-none block mb-2">
            0{index + 1}
          </span>
          
          {/* Company badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
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
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h3>
          
          {/* Description */}
          <p className={`text-sm text-white/50 leading-relaxed mb-6 max-w-md ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
            {project.description}
          </p>
          
          {/* Stack */}
          <span className="text-xs text-white/30 uppercase tracking-[0.15em] block mb-4">
            {project.stack}
          </span>

          {/* GitHub link */}
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors duration-300 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
          >
            <span>VIEW ON GITHUB</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
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
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">004</span>
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
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
