import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  SiPython, SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiTensorflow, SiPytorch,
  SiDocker, SiKubernetes, SiMongodb, SiPostgresql,
  SiGit, SiFigma, SiVercel, SiGooglecloud,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

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
  { icon: SiDocker, name: "Docker", color: "#2496ED", category: "DevOps" },
  { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5", category: "DevOps" },
  { icon: FaAws, name: "AWS", color: "#FF9900", category: "Cloud" },
  { icon: SiGooglecloud, name: "GCP", color: "#4285F4", category: "Cloud" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248", category: "Database" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", category: "Database" },
  { icon: SiGit, name: "Git", color: "#F05032", category: "Tools" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E", category: "Design" },
  { icon: SiVercel, name: "Vercel", color: "#FFFFFF", category: "Cloud" },
];

const TechNode = ({ tech, position, index, onHover }: any) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const IconComponent = tech.icon;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(time + index) * 0.2;
    groupRef.current.rotation.x = Math.sin(time / 2) * 0.1;
    groupRef.current.rotation.y = Math.cos(time / 2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => { setHovered(true); onHover(tech); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
      >
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? tech.color : "#333"}
            speed={3}
            distort={0.4}
            radius={1}
            emissive={hovered ? tech.color : "#000"}
            emissiveIntensity={hovered ? 2 : 0}
            transparent
            opacity={0.3}
          />
        </mesh>
        <Html
          center
          distanceFactor={10}
          position={[0, 0, 0]}
          style={{
            transition: 'all 0.3s',
            opacity: 1,
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <IconComponent 
              style={{ 
                color: tech.color, 
                fontSize: '32px',
                filter: `drop-shadow(0 0 8px ${tech.color})`,
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
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} />
        
        {technologies.map((tech, i) => (
          <TechNode 
            key={tech.name} 
            tech={tech} 
            position={techPositions[i]} 
            index={i}
            onHover={setActiveTech}
          />
        ))}

        {/* Dynamic connection lines to center */}
        {techPositions.map((pos, i) => (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...pos, 0, 0, 0])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.03} transparent />
          </line>
        ))}
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
        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-1">TECH ECOSYSTEM V1.0</p>
        <p className="text-xs text-white/60 uppercase tracking-[0.1em]">Hold to Rotate • Scroll to Zoom</p>
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

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
                <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + (i * 0.05) }}
                    className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    whileHover={{ y: -4, scale: 1.02 }}
                >
                    {/* Rotating icon on hover */}
                    <motion.div
                      className="flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <tech.icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: tech.color }} />
                    </motion.div>
                    
                    <h4 className="text-sm font-bold text-white text-center mb-1">{tech.name}</h4>
                    <p className="text-xs text-white/40 text-center uppercase tracking-wider">{tech.category}</p>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${tech.color}15, transparent)`,
                      }}
                    />
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;