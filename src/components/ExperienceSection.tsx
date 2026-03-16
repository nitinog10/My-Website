import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Award, Briefcase, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "CO-FOUNDER",
    company: "BUGBICEPS.IN",
    period: "PRESENT",
    description: "Co-founding an innovative tech platform aiming to simplify complex engineering concepts into high-impact digital solutions.",
    tags: ["Entrepreneurship", "Product Vision", "Leadership"],
    icon: Briefcase,
    color: "#FF6B6B"
  },
  {
    id: 2,
    role: "HEAD ALUMNI",
    company: "OIST BHOPAL",
    period: "2025 — 26",
    description: "Leading one of the largest student bodies, managing external relations and mentorship programs for technical students.",
    tags: ["Community", "Strategy", "Public Speaking"],
    icon: Award,
    color: "#4ECDC4"
  },
  {
    id: 3,
    role: "INTERN",
    company: "ENTOPLEARNING.COM",
    period: "2024",
    description: "Built the foundational LMS modules, focus on core backend performance and scalable educational infrastructure.",
    tags: ["Backend", "LMS", "Python"],
    icon: Briefcase,
    color: "#45B7D1"
  },
  {
    id: 4,
    role: "AI DEVELOPER",
    company: "TECHBUS",
    period: "BANGALORE",
    description: "Engineered high-accuracy NLP models for conversational bots and integrated them into existing CRM workflows.",
    tags: ["AI", "NLP", "Remote"],
    icon: Briefcase,
    color: "#FFA502"
  },
  {
    id: 5,
    role: "AI & TECH OPS",
    company: "HARON INDIA",
    period: "INDIA",
    description: "Collaborated in fast-paced teams to automate operational workflows using advanced AI prototypes.",
    tags: ["Tech Ops", "Automation", "AI"],
    icon: Briefcase,
    color: "#95E1D3"
  },
  {
    id: 6,
    role: "B.TECH (AIML)",
    company: "ORIENTAL GROUP",
    period: "2024 — PRESENT",
    description: "Specializing in the intersection of Artificial Intelligence and Machine Learning architecture.",
    tags: ["AIML", "Engineering", "Core"],
    icon: GraduationCap,
    color: "#C8E9F3"
  }
];

type ExperienceCardProps = {
  experience: typeof experiences[0];
  index: number;
};

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Staggered entrance animation on scroll
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
        rotationY: 45,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  const IconComponent = experience.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 w-full sm:w-[380px] h-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="group relative rounded-2xl p-6 md:p-8 overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          background: "rgba(17, 17, 20, 0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
        }}
        animate={isHovered ? { y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background gradient based on color */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: experience.color }}
        />

        {/* Timeline connector line - animated */}
        {index < experiences.length - 1 && (
          <div className="absolute -bottom-8 left-1/2 w-px h-8 hidden sm:block">
            <motion.div
              className="w-full h-full"
              style={{
                background: `linear-gradient(to bottom, ${experience.color}, transparent)`,
              }}
              animate={isHovered ? { opacity: 1, height: "30px" } : { opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Timeline dot */}
        <motion.div
          className="absolute -left-4 top-8 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black hidden sm:flex"
          style={{
            backgroundColor: experience.color,
            boxShadow: `0 0 20px ${experience.color}80`,
          }}
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <IconComponent className="w-4 h-4 text-white" />
        </motion.div>

        {/* Mobile icon */}
        <div className="sm:hidden mb-4 flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${experience.color}20`, border: `1px solid ${experience.color}` }}
          >
            <IconComponent className="w-5 h-5" style={{ color: experience.color }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Period badge */}
          <motion.span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider uppercase"
            style={{
              color: experience.color,
              backgroundColor: `${experience.color}15`,
              border: `1px solid ${experience.color}40`,
            }}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {experience.period}
          </motion.span>

          {/* Role and company */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            {experience.role}
          </h3>
          <p className="text-sm font-semibold text-white/70 mb-4" style={{ color: `${experience.color}cc` }}>
            @ {experience.company}
          </p>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3">
            {experience.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.slice(0, 2).map((tag) => (
              <motion.span
                key={tag}
                className="text-xs px-2 py-1 rounded-md bg-black/30 border border-white/10 text-white/70 font-medium"
                whileHover={{ backgroundColor: `${experience.color}30`, borderColor: experience.color }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
            {experience.tags.length > 2 && (
              <span className="text-xs px-2 py-1 rounded-md bg-black/30 border border-white/10 text-white/50">
                +{experience.tags.length - 2}
              </span>
            )}
          </div>

          {/* Hover action */}
          <motion.div
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: experience.color }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            Learn more <ChevronRight className="w-3 h-3" />
          </motion.div>
        </div>

        {/* Floating element animation */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: experience.color,
            filter: "blur(20px)",
          }}
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const scrollX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -((experiences.length - 1) * 420)]
  );

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

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
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress on scroll
            if (scrollRef.current) {
              const progress = self.getVelocity() * 0.01;
              scrollRef.current.style.filter = `brightness(${1 - Math.abs(progress) * 0.05})`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden select-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black opacity-60 pointer-events-none" />

      {/* Section content */}
      <div className="absolute inset-0 flex flex-col justify-center">
        {/* Header - visible on left */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none px-6 md:px-12 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[clamp(2.5rem, 8vw, 5rem)] font-bold text-white uppercase tracking-tighter leading-[0.9] mb-4">
              MY<br />
              <span className="text-white/20">JOURNEY</span>
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-xs md:text-sm tracking-[0.3em] text-accent uppercase font-bold">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div ref={scrollRef} className="flex gap-8 px-[10vw] pt-20">
            {/* Intro card */}
            <div className="min-w-[90vw] md:min-w-[50vw] flex flex-col justify-center pr-20">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md mb-6">
                  A timeline of my professional evolution, from student innovator to full-stack AI engineer. Each milestone represents growth, learning, and contribution to the field of artificial intelligence and product development.
                </p>
                <div className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest">
                  <div className="w-8 h-px bg-accent" />
                  {experiences.length} Chapters
                </div>
              </motion.div>
            </div>

            {/* Experience cards */}
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}

            {/* End spacer */}
            <div className="min-w-[30vw]" />
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="text-xs md:text-sm text-white/50 font-medium">Horizontal Scroll</span>
        <motion.div
          className="w-12 h-1 rounded-full bg-white/10"
          style={{
            scaleX: useTransform(
              scrollYProgress,
              [0, 1],
              [0, 1]
            ),
          }}
        />
      </motion.div>
    </section>
  );
};

export default ExperienceSection;