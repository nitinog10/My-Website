import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  SiAmazonwebservices,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiFigma,
  SiVercel,
  SiGooglecloud,
} from "react-icons/si";

const technologies = [
  { icon: SiPython, name: "Python" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiOpenai, name: "OpenAI" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: SiPytorch, name: "PyTorch" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: SiAmazonwebservices, name: "AWS" },
  { icon: SiGooglecloud, name: "GCP" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiRedis, name: "Redis" },
  { icon: SiGit, name: "Git" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiVercel, name: "Vercel" },
];

// Individual tech icon with scroll animation
const TechIcon = ({ tech, index }: { tech: typeof technologies[0]; index: number }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: iconRef,
    offset: ["start end", "end start"]
  });
  
  const isFromLeft = index % 2 === 0;
  const xOffset = isFromLeft ? -30 : 30;
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xOffset, 0, 0, -xOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={iconRef}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
      style={{ opacity, x, scale }}
    >
      <div className="p-3 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.05] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,200,0.15)]">
        <tech.icon className="w-8 h-8 md:w-10 md:h-10 text-white/50 transition-all duration-300 ease-out group-hover:text-accent group-hover:drop-shadow-[0_0_12px_rgba(0,255,200,0.5)]" />
      </div>
      <span className="text-[10px] md:text-xs tracking-[0.12em] text-white/30 uppercase group-hover:text-accent/70 transition-colors duration-300">
        {tech.name}
      </span>
    </motion.div>
  );
};

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-4 mb-24">
          <motion.div
            className="col-span-12 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.2em] text-white/30 uppercase">006</span>
            <span className="block text-xs md:text-sm tracking-[0.3em] text-accent uppercase mt-4">STACK</span>
          </motion.div>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <motion.h2
              className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-white uppercase tracking-tighter leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              TECH<br />
              <span className="text-white/20">STACK</span>
            </motion.h2>
          </div>
        </div>

        {/* Tech icons grid */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-start">
              {technologies.map((tech, index) => (
                <TechIcon key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
