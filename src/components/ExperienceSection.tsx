import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "CO-FOUNDER",
    company: "BUGBICEPS.IN",
    period: "PRESENT",
    description: "Co-founding an innovative tech platform aiming to simplify complex engineering concepts into high-impact digital solutions.",
    tags: ["Entrepreneurship", "Product Vision", "Leadership"]
  },
  {
    role: "HEAD ALUMNI",
    company: "OIST BHOPAL",
    period: "2025 — 26",
    description: "Leading one of the largest student bodies, managing external relations and mentorship programs for technical students.",
    tags: ["Community", "Strategy", "Public Speaking"]
  },
  {
    role: "INTERN",
    company: "ENTOPLEARNING.COM",
    period: "2024",
    description: "Built the foundational LMS modules, focus on core backend performance and scalable educational infrastructure.",
    tags: ["Backend", "LMS", "Python"]
  },
  {
    role: "AI DEVELOPER",
    company: "TECHBUS",
    period: "BANGALORE",
    description: "Engineered high-accuracy NLP models for conversational bots and integrated them into existing CRM workflows.",
    tags: ["AI", "NLP", "Remote"]
  },
  {
    role: "AI & TECH OPS",
    company: "HARON INDIA",
    period: "INDIA",
    description: "Collaborated in fast-paced teams to automate operational workflows using advanced AI prototypes.",
    tags: ["Tech Ops", "Automation", "AI"]
  },
  {
    role: "B.TECH (AIML)",
    company: "ORIENTAL GROUP",
    period: "2024 — PRESENT",
    description: "Specializing in the intersection of Artificial Intelligence and Machine Learning architecture.",
    tags: ["AIML", "Engineering", "Core"]
  }
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });

  useEffect(() => {
    if (!scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth;
      const horizontalScrollLength = scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex px-[10vw]">
          
          {/* Introductory entry card */}
          <div className="min-w-[60vw] md:min-w-[40vw] flex flex-col justify-center pr-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(4rem,12vw,12rem)] font-bold text-white uppercase tracking-tighter leading-none mb-4 -ml-2">
                CAREER<br />
                <span className="text-white/10 outline-text">STORY</span>
              </h2>
              <div className="flex items-center gap-6 mt-8">
                <div className="h-px w-24 bg-accent" />
                <span className="text-[10px] md:text-sm tracking-[0.6em] text-accent uppercase font-bold">Journey through time</span>
              </div>
            </motion.div>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, i) => (
            <div key={i} className="min-w-[80vw] md:min-w-[45vw] lg:min-w-[35vw] flex items-center">
              <div className="experience-card group relative w-full h-[500px] bg-[#111] rounded-[40px] p-8 md:p-12 border border-white/5 mx-4 flex flex-col justify-between hover:bg-[#161618] transition-all duration-500 overflow-hidden shadow-2xl">
                
                {/* Visual accents */}
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[80px] pointer-events-none group-hover:bg-accent/10 transition-colors" />
                <div className="absolute -bottom-12 -right-12 text-[180px] leading-none font-black text-white/[0.02] uppercase pointer-events-none tracking-tighter grayscale italic select-none">
                  {i + 1}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-accent text-[10px] md:text-xs font-black tracking-[0.4em] uppercase py-1 border-b border-accent/20">
                       {exp.period}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:translate-x-2 transition-transform duration-500 delay-75">
                    {exp.role.split(' ')[0]}<br />
                    <span className="text-white/40">{exp.role.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  
                  <p className="text-accent text-sm md:text-md uppercase tracking-[0.1em] font-medium mb-8">
                    @{exp.company}
                  </p>
                </div>

                <div className="relative z-10">
                  <p className="text-white/40 text-sm md:text-md leading-relaxed max-w-sm mb-8">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-white/20 uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10 rounded-full group-hover:border-accent/40 group-hover:text-accent/60 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom line progress simulator */}
                <div className="absolute bottom-0 left-0 h-1 bg-accent/30 w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}

          {/* End marker */}
          <div className="min-w-[40vw] flex items-center justify-center">
            <div className="h-px w-32 bg-white/10" />
            <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] px-8">Continuing</span>
            <div className="h-px w-32 bg-white/10" />
          </div>
        </div>
      </div>
      
      {/* Horizontal Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.6em] font-bold">Scroll horizontally to traverse</span>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
             <motion.div 
                className="absolute inset-0 bg-accent w-full"
                style={{ scaleX: 0, transformOrigin: "0% 50%" }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
             />
        </div>
      </div>
      
      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;