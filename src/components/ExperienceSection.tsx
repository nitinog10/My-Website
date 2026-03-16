import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'CO-FOUNDER',
    company: 'BUGBICEPS.IN',
    period: 'PRESENT',
    description: 'Co-founding an innovative tech platform. Building solutions that bridge the gap between technology and real-world applications.'
  },
  {
    role: 'HEAD ALUMNI',
    company: 'STUDENT ACTIVITY COUNCIL, OIST',
    period: '2025 — 26',
    description: 'Leading student initiatives and organizing events. Building community engagement and fostering leadership development.'
  },
  {
    role: 'INTERN',
    company: 'ENTOPLEARNING.COM',
    period: '2024',
    description: 'Contributed to educational technology development. Gained hands-on experience in building learning platforms and content systems.'
  },
  {
    role: 'AI DEVELOPER',
    company: 'TECHBUS',
    period: 'BANGALORE · REMOTE',
    description: 'Worked as an AI Developer, contributing to applied AI solutions. Designed and implemented AI-driven features with real-world constraints.'
  },
  {
    role: 'AI DEVELOPER & TECH OPS',
    company: 'HARON INDIA',
    period: 'INDIA',
    description: 'Collaborated in fast-paced teams to deliver functional AI prototypes under strict deadlines. Gained hands-on exposure to industry-oriented AI workflows.'
  },
  {
    role: 'B.TECH (AIML)',
    company: 'ORIENTAL GROUP OF INSTITUTES',
    period: '2024 — PRESENT',
    description: 'Bachelor of Technology in Artificial Intelligence & Machine Learning.'
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-exp-heading]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '[data-exp-item]',
        { x: (i) => (i % 2 === 0 ? -80 : 80), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-exp-list]',
            start: 'top 82%',
            end: 'center 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '[data-exp-progress]',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-exp-list]',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      gsap.to('[data-exp-item]', {
        y: -30,
        opacity: 0.3,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '75% top',
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
    <section ref={sectionRef} className="relative min-h-screen py-32 md:py-44 overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(7,12,16,0.2) 0%, rgba(7,12,16,0.6) 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <aside className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-24">
              <span className="text-xs md:text-sm tracking-[0.28em] text-white/40 uppercase">004 / Experience</span>
              <h2 data-exp-heading className="mt-6 text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] font-semibold text-white uppercase tracking-[-0.03em]">
                Timeline
                <br />
                <span className="text-white/35">That Moves</span>
              </h2>
              <p className="mt-6 text-sm md:text-base text-white/55 leading-relaxed max-w-sm">
                A live chronology of leadership, internships, and builder roles. Scroll drives the rail and each milestone enters, then exits, with clear directional motion.
              </p>
            </div>
          </aside>

          <div data-exp-list className="relative col-span-12 md:col-span-8 pl-0 md:pl-12">
            <div className="absolute left-2 md:left-0 top-2 bottom-2 w-px bg-white/10" />
            <div data-exp-progress className="absolute left-2 md:left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-cyan-200 to-transparent" />

            <div className="space-y-7 md:space-y-8">
              {experiences.map((exp, index) => (
                <article
                  key={`${exp.company}-${index}`}
                  data-exp-item
                  className="relative ml-6 md:ml-10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-5 md:p-6"
                >
                  <span className="absolute -left-[30px] md:-left-[42px] top-7 h-3 w-3 rounded-full bg-accent shadow-[0_0_14px_rgba(0,255,200,0.6)]" />
                  <p className="text-xs tracking-[0.2em] uppercase text-accent/90">{exp.period}</p>
                  <h3 className="mt-2 text-xl md:text-2xl text-white tracking-[-0.02em]">{exp.role}</h3>
                  <p className="mt-1 text-sm md:text-base text-white/70">{exp.company}</p>
                  <p className="mt-4 text-sm text-white/55 leading-relaxed">{exp.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
