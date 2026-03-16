import { useEffect, useRef } from 'react';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiFigma,
  SiVercel,
  SiGooglecloud,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

type Tool = {
  name: string;
  icon: IconType;
};

type Group = {
  title: string;
  subtitle: string;
  tools: Tool[];
};

const stackGroups: Group[] = [
  {
    title: 'AI + ML Core',
    subtitle: 'Modeling, inference, and experimentation loop',
    tools: [
      { name: 'Python', icon: SiPython },
      { name: 'OpenAI', icon: SiOpenai },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'PyTorch', icon: SiPytorch },
    ],
  },
  {
    title: 'Product + Frontend',
    subtitle: 'Interfaces and systems that users can feel',
    tools: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Figma', icon: SiFigma },
    ],
  },
  {
    title: 'Platform + Cloud',
    subtitle: 'Deployment, infra, and scalable runtime',
    tools: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'AWS', icon: FaAws },
      { name: 'GCP', icon: SiGooglecloud },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
  {
    title: 'Data + Workflow',
    subtitle: 'Storage and collaboration backbone',
    tools: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Redis', icon: SiRedis },
      { name: 'Git', icon: SiGit },
    ],
  },
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-stack-heading]',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '[data-stack-panel]',
        { y: 80, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-stack-grid]',
            start: 'top 82%',
            end: 'center 55%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '[data-tech-pill]',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-stack-grid]',
            start: 'top 72%',
            end: 'bottom 65%',
            scrub: true,
          },
        }
      );

      gsap.to('[data-stack-panel]', {
        y: -40,
        scale: 0.96,
        opacity: 0.25,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '78% top',
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
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 85% 10%, rgba(255,199,87,0.12), transparent 38%), radial-gradient(circle at 8% 88%, rgba(0,255,200,0.12), transparent 42%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="text-xs md:text-sm tracking-[0.28em] text-white/40 uppercase">006 / What I Work With</span>
          <h2 data-stack-heading className="mt-6 text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.88] uppercase tracking-[-0.03em] text-white">
            Tools,
            <br />
            <span className="text-white/35">Platforms, Flow</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-white/55 leading-relaxed">
            I combine model engineering, frontend craftsmanship, and cloud-native deployment into one shipping loop. This board separates the stack by intent, not just by logo.
          </p>
        </div>

        <div data-stack-grid className="grid grid-cols-12 gap-4 md:gap-6" style={{ perspective: '1000px' }}>
          {stackGroups.map((group) => (
            <article
              data-stack-panel
              key={group.title}
              className="col-span-12 md:col-span-6 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 md:p-7"
            >
              <h3 className="text-xl md:text-2xl text-white tracking-[-0.02em]">{group.title}</h3>
              <p className="mt-2 text-sm text-white/55">{group.subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <div
                    data-tech-pill
                    key={`${group.title}-${tool.name}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white/80"
                  >
                    <tool.icon className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                    <span className="tracking-[0.08em] uppercase">{tool.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <div className="col-span-12 mt-2 rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/[0.02] to-accent/10 p-5 md:p-7">
            <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-white/60">Build Principle</p>
            <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
              Every project starts from user outcomes, then moves through rapid prototype cycles, model tuning, and production hardening. The stack is selected per problem, not trend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
