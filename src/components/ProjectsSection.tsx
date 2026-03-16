import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'ATMOPREDICT',
    description: 'NASA Space Apps Challenge winning project. Weather prediction model using historical climate data for accurate forecasting and environmental analysis.',
    stack: 'Machine Learning · Python · Earth Observation Data',
    company: 'NASA SPACE APPS — WINNER',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    github: 'https://github.com/nitinog10/AtmoPredict.git'
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
    name: 'CAMPUS MITRA',
    description: 'RAG-powered AI chat platform for campus assistance. Helps students with queries using retrieval-augmented generation.',
    stack: 'RAG · LLM · AI Chat · Python',
    company: 'AI ASSISTANT',
    image: '/campusmitra.png',
    github: 'https://github.com/nitinog10/Campus-mitra.git'
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
    name: 'BHARATTRIPAI',
    description: 'Smart AI-based travel companion for India. An intelligent platform that helps travelers explore India with personalized recommendations and insights.',
    stack: 'AI · Travel · Python · NLP',
    company: 'AI TRAVEL',
    image: '/Bharattripai.png',
    github: 'https://github.com/nitinog10/Beta-20-.git'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-project-heading]',
        { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '[data-project-card]',
        { y: 70, rotateX: 12, opacity: 0, transformOrigin: 'center top' },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-project-grid]',
            start: 'top 82%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      gsap.to('[data-project-card]', {
        y: -40,
        opacity: 0.2,
        scale: 0.94,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '70% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 md:py-44 overflow-hidden" style={{ background: 'radial-gradient(circle at 10% 10%, rgba(0,255,200,0.07), transparent 34%), radial-gradient(circle at 90% 85%, rgba(255,120,90,0.09), transparent 34%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20">
          <span className="text-xs md:text-sm tracking-[0.28em] text-white/40 uppercase">003 / Projects</span>
          <h2 data-project-heading className="mt-5 text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.85] tracking-[-0.04em] text-white uppercase">
            Build Log
            <br />
            <span className="text-white/35">In Public</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-white/50 leading-relaxed">
            Real products, fast iterations, and systems built to ship. Every card opens code or demos and every scroll step feels like moving across a live board.
          </p>
        </div>

        <div data-project-grid className="grid grid-cols-12 gap-5 md:gap-6" style={{ perspective: '1200px' }}>
          {projects.map((project, index) => {
            const isFeature = index === 0;

            return (
              <article
                data-project-card
                key={project.name}
                className={`${isFeature ? 'col-span-12 md:col-span-7' : 'col-span-12 md:col-span-5'} group relative rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl overflow-hidden transition-transform duration-500 hover:-translate-y-1`}
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={`${isFeature ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] tracking-[0.22em] text-white/70 uppercase">
                    0{index + 1}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-accent mb-3">{project.company}</p>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white">{project.name}</h3>
                    <p className="mt-3 text-sm text-white/70 max-w-2xl leading-relaxed">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.split('·').map((item) => (
                        <span key={`${project.name}-${item}`} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-white/70 bg-black/30">
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
