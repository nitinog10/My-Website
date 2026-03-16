import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useGsapPageAnimations from '@/hooks/useGsapPageAnimations';

const capabilityGroups = [
  {
    title: 'Core AI and ML',
    items: ['Generative AI pipelines', 'Computer vision systems', 'Fine-tuning and eval loops', 'RAG implementation'],
  },
  {
    title: 'Application Engineering',
    items: ['React and Next.js interfaces', 'Node.js and FastAPI services', 'Realtime UX orchestration', 'Cloud deployment workflows'],
  },
  {
    title: 'Production Tooling',
    items: ['MCP server integrations', 'Prompt and context instrumentation', 'Containerized development', 'CI and delivery automation'],
  },
  {
    title: 'Current Focus',
    items: ['Agentic product flows', 'Vision-language interactions', 'AI plus 3D web experiences', 'Reliability and observability'],
  },
];

const WorkWithPage = () => {
  const pageRef = useRef<HTMLElement>(null);
  useGsapPageAnimations(pageRef);

  useEffect(() => {
    document.title = 'What I Work With - NITIN MISHRA';
  }, []);

  return (
    <main ref={pageRef} className="relative min-h-screen px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link to="/" className="text-xs uppercase tracking-[0.24em] text-white/60 hover:text-accent transition-colors">
            Home
          </Link>
          <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.24em]">
            <Link to="/work-with" className="text-accent">Work With</Link>
            <Link to="/projects" className="text-white/50 hover:text-accent transition-colors">Projects</Link>
            <Link to="/experience" className="text-white/50 hover:text-accent transition-colors">Experience</Link>
          </nav>
        </header>

        <section className="pt-12 md:pt-16">
          <p data-page-title className="text-xs uppercase tracking-[0.3em] text-accent">Capabilities</p>
          <h1
            data-page-title
            className="text-[clamp(2.6rem,9vw,7rem)] uppercase tracking-tight leading-[0.86] mt-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What I Work With
          </h1>
          <p data-page-lead className="max-w-3xl text-sm md:text-lg text-white/60 leading-relaxed mt-6">
            This page reframes the old section into a focused capability map with cleaner hierarchy and motion. Each block enters on load, then reveals progressively while scrolling with GSAP and Lenis.
          </p>
        </section>

        <section className="mt-14 md:mt-20 space-y-6 md:space-y-8">
          {capabilityGroups.map((group, index) => (
            <article
              key={group.title}
              data-load-item
              data-reveal
              className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.08] via-white/[0.02] to-transparent p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  className="text-2xl md:text-4xl uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {group.title}
                </h2>
                <span className="text-xs uppercase tracking-[0.24em] text-white/35">0{index + 1}</span>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3 md:gap-4">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/8 bg-black/35 px-4 py-3 text-sm md:text-base text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default WorkWithPage;
