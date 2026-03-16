import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useGsapPageAnimations from '@/hooks/useGsapPageAnimations';

const projects = [
  {
    name: 'AtmoPredict',
    type: 'Climate Intelligence',
    summary: 'NASA Space Apps winning build using climate history and forecasting models for environmental planning.',
    stack: ['Machine Learning', 'Python', 'Earth Data'],
    href: 'https://github.com/nitinog10/AtmoPredict.git',
    year: '2024',
  },
  {
    name: 'AirPulse',
    type: 'AQI Analytics',
    summary: 'Interactive AQI application that tracks current conditions and predicts trends across regions in India.',
    stack: ['Streamlit', 'Python', 'Data Modeling'],
    href: 'https://github.com/nitinog10/air-pulse.git',
    year: '2024',
  },
  {
    name: 'Campus Mitra',
    type: 'RAG Assistant',
    summary: 'Campus support assistant using retrieval-augmented generation to answer student questions with context.',
    stack: ['RAG', 'LLM', 'Python'],
    href: 'https://github.com/nitinog10/Campus-mitra.git',
    year: '2025',
  },
  {
    name: 'BharatTripAI',
    type: 'Travel Intelligence',
    summary: 'AI travel companion for personalized India itineraries with language-aware recommendations.',
    stack: ['AI', 'NLP', 'Product Design'],
    href: 'https://github.com/nitinog10/Beta-20-.git',
    year: '2025',
  },
];

const ProjectsPage = () => {
  const pageRef = useRef<HTMLElement>(null);
  useGsapPageAnimations(pageRef);

  useEffect(() => {
    document.title = 'Projects - NITIN MISHRA';
  }, []);

  return (
    <main ref={pageRef} className="relative min-h-screen px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link to="/" className="text-xs uppercase tracking-[0.24em] text-white/60 hover:text-accent transition-colors">
            Home
          </Link>
          <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.24em]">
            <Link to="/work-with" className="text-white/50 hover:text-accent transition-colors">Work With</Link>
            <Link to="/projects" className="text-accent">Projects</Link>
            <Link to="/experience" className="text-white/50 hover:text-accent transition-colors">Experience</Link>
          </nav>
        </header>

        <section className="pt-12 md:pt-16">
          <p data-page-title className="text-xs uppercase tracking-[0.3em] text-accent">Selected Work</p>
          <h1
            data-page-title
            className="text-[clamp(2.6rem,9vw,7rem)] uppercase tracking-tight leading-[0.86] mt-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Projects Lab
          </h1>
          <p data-page-lead className="max-w-3xl text-sm md:text-lg text-white/60 leading-relaxed mt-6">
            A rebuilt project view with stronger visual hierarchy and cleaner storytelling blocks. Animations are timed for route-entry first and scroll reveal second.
          </p>
        </section>

        <section className="mt-14 md:mt-20 grid lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <article
              key={project.name}
              data-load-item
              data-reveal
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-white/35">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>

              <h2
                className="text-3xl md:text-5xl uppercase leading-[0.9] tracking-tight mt-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.name}
              </h2>

              <p className="mt-6 text-sm md:text-base text-white/65 leading-relaxed">{project.summary}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="text-xs uppercase tracking-[0.18em] border border-white/15 rounded-full px-3 py-1 text-white/70">
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/60 hover:text-accent transition-colors"
              >
                View Repository
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
