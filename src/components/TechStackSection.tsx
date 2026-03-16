import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  SiPython, SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiTensorflow, SiPytorch,
  SiDocker, SiKubernetes, SiMongodb, SiPostgresql,
  SiGit, SiFigma, SiVercel, SiGooglecloud, SiKeras, SiPandas, SiGreensock,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbTransform } from "react-icons/tb";

const technologies = [
  { icon: SiPython, name: "Python", color: "#3776AB", category: "Language" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6", category: "Language" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", category: "Language" },
  { icon: SiReact, name: "React", color: "#61DAFB", category: "Frontend" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF", category: "Frontend" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933", category: "Backend" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", category: "Frontend" },
  { icon: SiOpenai, name: "OpenAI", color: "#412991", category: "AI" },
  { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00", category: "AI" },
  { icon: SiPytorch, name: "PyTorch", color: "#EE4C2C", category: "AI" },
  { icon: SiKeras, name: "Keras", color: "#D00000", category: "AI" },
  { icon: TbTransform, name: "Transformers", color: "#FFD21E", category: "AI" },
  { icon: SiPandas, name: "Pandas", color: "#150458", category: "Data Science" },
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5", category: "DevOps" },
  { icon: FaAws, name: "AWS", color: "#FF9900", category: "Cloud" },
  { icon: SiGooglecloud, name: "GCP", color: "#4285F4", category: "Cloud" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "Tools" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },
  { icon: SiVercel, name: "Vercel", color: "#FFFFFF", category: "Cloud" },
  { icon: SiGreensock, name: "GSAP", color: "#88CE02", category: "Animation" },
];

const TechNode = ({ tech, position, onHover }: any) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = tech.icon;

  return (
    <group
      position={position}
      onPointerOver={() => { setHovered(true); onHover(tech); }}
      onPointerOut={() => { setHovered(false); onHover(null); }}
    >
      {/* Icon only - no sphere */}
      <Html
        center
        distanceFactor={120}
        position={[0, 0, 0]}
        style={{
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <IconComponent 
          style={{ 
            color: hovered ? tech.color : '#ffffff', 
            fontSize: hovered ? '3px' : '2px',
            filter: hovered 
              ? `drop-shadow(0 0 30px ${tech.color}) drop-shadow(0 0 60px ${tech.color})` 
              : 'drop-shadow(0 0 12px rgba(255,255,255,0.8))',
            transition: 'all 0.3s ease',
          }} 
        />
      </Html>
    </group>
  );
};

const TechOrbit = ({ techs, radius, speed, tilt, onHover }: any) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * speed;
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00ffc8" transparent opacity={0.2} />
      </mesh>

      {techs.map((tech: any, i: number) => {
        const angle = (i / techs.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <TechNode
            key={tech.name}
            tech={tech}
            position={[x, 0, z]}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
};

const SkillNeuralNetwork = () => {
  const [activeTech, setActiveTech] = useState<any>(null);
  
  // Split technologies into 3 orbits
  const orbits = useMemo(() => {
    const orbit1 = technologies.slice(0, 8);
    const orbit2 = technologies.slice(8, 16);
    const orbit3 = technologies.slice(16);
    
    return [
      { techs: orbit1, radius: 3, speed: 0.15, tilt: 0.3 },
      { techs: orbit2, radius: 5, speed: -0.12, tilt: -0.2 },
      { techs: orbit3, radius: 7, speed: 0.1, tilt: 0.4 },
    ];
  }, []);

  return (
    <div className="relative w-full h-[700px] bg-black/40 rounded-3xl overflow-hidden border border-white/5">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={70} />
        <OrbitControls 
          enableZoom={true}
          autoRotate={false}
          minDistance={5}
          maxDistance={15}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 4}
        />
        
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#00ffc8" />
        <pointLight position={[-10, -10, -10]} intensity={2.5} color="#ff6b6b" />
        <pointLight position={[0, 0, 10]} intensity={2.5} color="#4ECDC4" />
        <directionalLight position={[0, 10, 5]} intensity={2} color="#ffffff" />
        
        {orbits.map((orbit, i) => (
          <TechOrbit
            key={i}
            techs={orbit.techs}
            radius={orbit.radius}
            speed={orbit.speed}
            tilt={orbit.tilt}
            onHover={setActiveTech}
          />
        ))}
        
        {/* Central core */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#00ffc8"
            emissive="#00ffc8"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Canvas>

      {/* Info Overlay */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <motion.div
          key={activeTech?.name || 'idle'}
          initial={{ opacity: 0, x: -20 }}
          animate={activeTech ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-accent/20"
        >
          {activeTech && (
            <div className="flex items-center gap-3">
              <activeTech.icon className="w-10 h-10" style={{ color: activeTech.color }} />
              <div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{activeTech.name}</h3>
                <p className="text-[10px] text-accent uppercase tracking-wider">{activeTech.category}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 text-right pointer-events-none">
        <p className="text-[10px] text-white/30 uppercase tracking-widest">ORBITAL SYSTEM</p>
        <p className="text-xs text-white/60 uppercase tracking-wide mt-1">Drag to Explore</p>
      </div>
    </div>
  );
};

const TechStackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section ref={sectionRef} id="tech-stack" className="min-h-screen py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0a0a0b] relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] md:text-sm tracking-[0.5em] text-accent font-bold uppercase py-1 border-b border-accent/30">006 | INVENTORY</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter leading-[0.8]">
              TECHNICAL<br />
              <span className="text-white/20">SYSTEMS</span>
            </h2>
          </motion.div>
          
          <motion.div 
             className="max-w-xs"
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
             transition={{ delay: 0.4 }}
          >
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed mb-4">
              A breakdown of the core technologies I use to develop artificial intelligence and high-performance applications.
            </p>
            <div className="h-0.5 w-12 bg-accent/40" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SkillNeuralNetwork />
        </motion.div>

        {/* Tech Icons Grid - Simple */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/30" />
            <h3 className="mx-6 text-sm font-bold text-white/50 uppercase tracking-[0.3em]">
              Tech Stack
            </h3>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/30" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {technologies.map((tech, i) => (
              <TechIcon key={tech.name} tech={tech} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TechIcon = ({ tech, index, isInView }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
      exit={{ opacity: 0, scale: 0, rotate: 180 }}
      transition={{
        duration: 0.6,
        delay: 0.5 + (index * 0.04),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      className="relative cursor-pointer group"
    >
      {/* Glow effect on hover or active */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: (isHovered || isActive) ? 0.6 : 0,
          scale: (isHovered || isActive) ? 1.5 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: (isHovered || isActive) ? 'rgba(34, 211, 238, 0.5)' : 'transparent',
          visibility: (isHovered || isActive) ? 'visible' : 'hidden',
        }}
      />

      {/* Icon with rotation */}
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative"
      >
        <IconComponent
          className="w-12 h-12 md:w-14 md:h-14 transition-all duration-300"
          style={{
            color: (isHovered || isActive) ? '#22d3ee' : '#666666',
            filter: (isHovered || isActive)
              ? 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 32px rgba(34, 211, 238, 0.4))' 
              : 'drop-shadow(0 0 8px rgba(102, 102, 102, 0.3))',
          }}
        />
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-cyan-400/30">
          <p className="text-xs font-bold text-cyan-400">{tech.name}</p>
        </div>
      </motion.div>

      {/* Active ring indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Hover ring pulse */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default TechStackSection;
