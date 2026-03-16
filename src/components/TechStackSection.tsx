import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
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

const TechNode = ({ tech, position, index, onHover }: any) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const IconComponent = tech.icon;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Smooth floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.3;
    // Gentle rotation
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => { setHovered(true); onHover(tech); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
      >
        {/* Outer glow sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial
            color={tech.color}
            transparent
            opacity={hovered ? 0.15 : 0.05}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Main sphere */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? tech.color : "#0a0a0a"}
            speed={1.5}
            distort={0.2}
            radius={1}
            emissive={tech.color}
            emissiveIntensity={hovered ? 0.8 : 0.1}
            transparent
            opacity={hovered ? 0.6 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Icon */}
        <Html
          center
          distanceFactor={6}
          position={[0, 0, 0]}
          style={{
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: hovered ? 1.2 : 1,
            }}
            transition={{ 
              rotate: { duration: 6, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.3 }
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
            }}
          >
            <IconComponent 
              style={{ 
                color: hovered ? tech.color : '#ffffff', 
                fontSize: '48px',
                filter: hovered 
                  ? `drop-shadow(0 0 20px ${tech.color}) drop-shadow(0 0 40px ${tech.color})` 
                  : 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} 
            />
          </motion.div>
        </Html>
      </group>
    </Float>
  );
};

const SkillNeuralNetwork = () => {
  const [activeTech, setActiveTech] = useState<any>(null);
  const techPositions = useMemo(() => {
    return technologies.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;
      const radius = 5;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ] as [number, number, number];
    });
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-black/40 rounded-3xl overflow-hidden border border-white/5 cursor-move">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.3}
          minDistance={10}
          maxDistance={20}
          enablePan={false}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffc8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff6b6b" />
        <pointLight position={[0, 0, 10]} intensity={1} color="#4ECDC4" />
        
        {technologies.map((tech, i) => (
          <TechNode 
            key={tech.name} 
            tech={tech} 
            position={techPositions[i]} 
            index={i}
            onHover={setActiveTech}
          />
        ))}

        {/* Connection lines with gradient */}
        {techPositions.map((pos, i) => {
          if (i >= techPositions.length - 1) return null;
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...pos, 0, 0, 0])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffc8" opacity={0.08} transparent />
            </line>
          );
        })}
        
        {/* Central core */}
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ffc8"
            emissive="#00ffc8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.1}
            wireframe
          />
        </Sphere>
      </Canvas>

      {/* Info Overlay */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <motion.div
          key={activeTech?.name || 'idle'}
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={activeTech ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.9 }}
          className="bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-accent/20 shadow-[0_0_50px_rgba(0,255,200,0.1)]"
        >
          {activeTech && (
            <>
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <activeTech.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: activeTech.color }} />
                </motion.div>
                <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter leading-none mb-1">{activeTech.name}</h3>
                    <p className="text-[10px] text-accent uppercase tracking-[0.3em] font-medium">{activeTech.category}</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-4 uppercase tracking-widest font-bold">Domain Expertise</p>
              <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    className="h-full bg-accent"
                    transition={{ duration: 1 }}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 text-right pointer-events-none">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-1">TECH ECOSYSTEM V2.0</p>
        <p className="text-xs text-white/60 uppercase tracking-[0.1em]">Drag to Rotate • Scroll to Zoom</p>
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

        {/* Tech Icons Grid */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
              Technology Stack
            </h3>
            <div className="h-px flex-1 ml-8 bg-gradient-to-r from-accent/30 to-transparent" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {technologies.map((tech, i) => (
              <TechIconCard key={tech.name} tech={tech} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TechIconCard = ({ tech, index, isInView }: any) => {
  const [isActive, setIsActive] = useState(false);
  const IconComponent = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        duration: 0.5,
        delay: 0.6 + (index * 0.03),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsActive(!isActive)}
      className={`
        group relative p-6 rounded-2xl cursor-pointer
        transition-all duration-300
        ${isActive 
          ? 'bg-cyan-500/20 border-cyan-400/50' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
        }
        border backdrop-blur-sm
      `}
    >
      {/* Background glow on active */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at center, rgba(34, 211, 238, 0.15), transparent)`,
          boxShadow: isActive ? '0 0 30px rgba(34, 211, 238, 0.3)' : 'none',
        }}
      />

      {/* Icon with rotation on hover */}
      <motion.div
        className="flex items-center justify-center mb-3"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <IconComponent
          className="w-10 h-10 transition-all duration-300"
          style={{
            color: isActive ? '#22d3ee' : tech.color,
            filter: isActive 
              ? 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.8))' 
              : `drop-shadow(0 0 6px ${tech.color}40)`,
          }}
        />
      </motion.div>

      {/* Tech name */}
      <p
        className={`
          text-xs font-bold text-center uppercase tracking-tight
          transition-colors duration-300
          ${isActive ? 'text-cyan-400' : 'text-white/70 group-hover:text-white'}
        `}
      >
        {tech.name}
      </p>

      {/* Category badge */}
      <motion.div
        className="mt-2 text-[10px] text-center uppercase tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 + (index * 0.03) }}
      >
        <span
          className={`
            px-2 py-0.5 rounded-full
            transition-all duration-300
            ${isActive 
              ? 'bg-cyan-500/30 text-cyan-300' 
              : 'bg-white/5 text-white/40 group-hover:text-white/60'
            }
          `}
        >
          {tech.category}
        </span>
      </motion.div>

      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${tech.color}10 50%, transparent 100%)`,
        }}
      />

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TechStackSection;