import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useGsapPageAnimations from '@/hooks/useGsapPageAnimations';

const timeline = [
  {
    period: '2025 - Present',
    role: 'Co-Founder',
    org: 'bugbiceps.in',
    detail: 'Building product direction, technical foundations, and applied AI experiences for real user workflows.',
  },
  {
    period: '2025 - 2026',
    role: 'Head Alumni',
    org: 'Student Activity Council, OIST',
    detail: 'Led alumni and student collaboration initiatives with event systems and mentorship loops.',
  },
  {
    period: '2024',
    role: 'AI Intern',
    org: 'Entop Learning',
    detail: 'Delivered learning-focused features and contributed to practical AI implementation in educational products.',
  },
  {
    period: '2024',
    role: 'AI Developer',
    org: 'Techbus (Remote)',
    detail: 'Shipped AI modules under practical constraints and collaborated across product and engineering teams.',
  },
  {
    period: '2024 - Present',
    role: 'B.Tech AIML',
    org: 'Oriental Group of Institutes',
    detail: 'Academic foundation in machine learning, model design, and software engineering practices.',
  },
];

const ExperiencePage = () => {
  const pageRef = useRef<HTMLElement>(null);
  useGsapPageAnimations(pageRef);

  useEffect(() => {
    document.title = 'Experience Timeline - NITIN MISHRA';
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
            <Link to="/projects" className="text-white/50 hover:text-accent transition-colors">Projects</Link>
            <Link to="/experience" className="text-accent">Experience</Link>
          </nav>
        </header>

        <section className="pt-12 md:pt-16">
          <p data-page-title className="text-xs uppercase tracking-[0.3em] text-accent">Journey</p>
          <h1
            data-page-title
            className="text-[clamp(2.6rem,9vw,7rem)] uppercase tracking-tight leading-[0.86] mt-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Experience Timeline
          </h1>
          <p data-page-lead className="max-w-3xl text-sm md:text-lg text-white/60 leading-relaxed mt-6">
            A cleaner narrative timeline with stronger rhythm, reduced visual repetition, and animation pacing tuned for long-scroll reading.
          </p>
        </section>

        <section className="mt-14 md:mt-20 relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
          <div className="space-y-8 md:space-y-10">
            {timeline.map((item, index) => (
              <article
                key={`${item.role}-${item.period}`}
                data-load-item
                data-reveal
                className={`relative rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7 md:w-[48%] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
              >
                <div className="absolute left-3 md:left-auto md:right-[-35px] top-7 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,255,200,0.5)]" />
                <p className="text-xs uppercase tracking-[0.24em] text-accent">{item.period}</p>
                <h2
                  className="text-2xl md:text-4xl uppercase tracking-tight mt-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.role}
                </h2>
                <p className="text-sm uppercase tracking-[0.2em] text-white/55 mt-2">{item.org}</p>
                <p className="mt-5 text-sm md:text-base text-white/65 leading-relaxed">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExperiencePage;
