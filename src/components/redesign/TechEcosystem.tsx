import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { 
    name: 'Python', 
    category: 'AI/ML', 
    color: '#3776AB', 
    x: 2, y: 1, z: 0,
    description: 'Primary language for AI/ML development',
    usedIn: 'AtmoPredict, AirPulse, Campus Mitra',
    projects: ['Climate Intelligence', 'Air Quality Network']
  },
  { 
    name: 'PyTorch', 
    category: 'AI/ML', 
    color: '#EE4C2C', 
    x: 2.5, y: 0.5, z: -0.5,
    description: 'Deep learning framework for neural networks',
    usedIn: 'Computer Vision, NLP Models',
    projects: ['Object Detection', 'Model Fine-tuning']
  },
  { 
    name: 'TensorFlow', 
    category: 'AI/ML', 
    color: '#FF6F00', 
    x: 2, y: -0.5, z: 0.5,
    description: 'ML platform for production systems',
    usedIn: 'Predictive Models, Data Pipelines',
    projects: ['Climate Prediction', 'AQI Forecasting']
  },
  { 
    name: 'OpenAI', 
    category: 'AI/ML', 
    color: '#412991', 
    x: 1.5, y: 0, z: 0,
    description: 'LLM integration and prompt engineering',
    usedIn: 'Campus Mitra, RAG Systems',
    projects: ['AI Assistant', 'Multi-Agent Systems']
  },
  { 
    name: 'TypeScript', 
    category: 'Frontend', 
    color: '#3178C6', 
    x: -2, y: 1, z: 0,
    description: 'Type-safe JavaScript for scalable apps',
    usedIn: 'All web applications',
    projects: ['Portfolio', 'LMS Platform']
  },
  { 
    name: 'React', 
    category: 'Frontend', 
    color: '#61DAFB', 
    x: -2.5, y: 0.5, z: 0.5,
    description: 'UI library for interactive interfaces',
    usedIn: 'Foundation LMS, Portfolio',
    projects: ['Learning Platform', 'Web Apps']
  },
  { 
    name: 'Next.js', 
    category: 'Frontend', 
    color: '#FFFFFF', 
    x: -2, y: 0, z: -0.5,
    description: 'React framework for production',
    usedIn: 'Full-stack applications',
    projects: ['Enterprise Apps', 'API Routes']
  },
  { 
    name: 'Node.js', 
    category: 'Backend', 
    color: '#339933', 
    x: 0, y: -2, z: 0,
    description: 'JavaScript runtime for backend services',
    usedIn: 'API Development, Microservices',
    projects: ['REST APIs', 'Real-time Services']
  },
  { 
    name: 'FastAPI', 
    category: 'Backend', 
    color: '#009688', 
    x: 0.5, y: -2.5, z: 0.5,
    description: 'High-performance Python API framework',
    usedIn: 'AI Model Serving, Data APIs',
    projects: ['ML Endpoints', 'Data Processing']
  },
  { 
    name: 'Docker', 
    category: 'DevOps', 
    color: '#2496ED', 
    x: 0, y: 2, z: 1,
    description: 'Containerization for deployment',
    usedIn: 'All production systems',
    projects: ['Microservices', 'CI/CD']
  },
  { 
    name: 'Kubernetes', 
    category: 'DevOps', 
    color: '#326CE5', 
    x: 0.5, y: 2.5, z: 0.5,
    description: 'Container orchestration at scale',
    usedIn: 'Production deployments',
    projects: ['Scalable Systems', 'Auto-scaling']
  },
  { 
    name: 'AWS', 
    category: 'Cloud', 
    color: '#FF9900', 
    x: -1.5, y: -1.5, z: 1,
    description: 'Cloud infrastructure and services',
    usedIn: 'Hosting, Storage, Compute',
    projects: ['Production Apps', 'Data Storage']
  },
  { 
    name: 'PostgreSQL', 
    category: 'Database', 
    color: '#4169E1', 
    x: 1.5, y: -1.5, z: -1,
    description: 'Relational database for structured data',
    usedIn: 'Data persistence, Analytics',
    projects: ['User Data', 'Transactions']
  },
];

const TechNode = ({ tech, index, onHover }: any) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time * 0.5 + index) * 0.001;
    meshRef.current.rotation.y += 0.002;
    
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[tech.x, tech.y, tech.z]}
      onPointerOver={() => { setHovered(true); onHover(tech); }}
      onPointerOut={() => { setHovered(false); onHover(null); }}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={tech.color}
        emissive={tech.color}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const ConnectionLines = ({ techs }: any) => {
  const points = techs.map((t: any) => new THREE.Vector3(t.x, t.y, t.z));
  
  return (
    <>
      {points.map((point: THREE.Vector3, i: number) => {
        if (i === points.length - 1) return null;
        return (
          <Line
            key={i}
            points={[point, points[i + 1]]}
            color="rgba(0, 255, 200, 0.2)"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
    </>
  );
};

const Scene = ({ onTechHover }: any) => {
  return (
    <>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffc8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      
      <ConnectionLines techs={techStack} />
      
      {techStack.map((tech, i) => (
        <TechNode key={tech.name} tech={tech} index={i} onHover={onTechHover} />
      ))}
      
      {/* Central core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
          wireframe
        />
      </Sphere>
    </>
  );
};

const TechEcosystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });
  const [hoveredTech, setHoveredTech] = useState<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.3em] text-accent uppercase font-bold mb-4 block">
            002 — TECHNICAL ECOSYSTEM
          </span>
          <h2 className="text-[clamp(3rem, 10vw, 8rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
            WHAT I<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              WORK WITH
            </span>
          </h2>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          ref={canvasRef}
          className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Scene onTechHover={setHoveredTech} />
          </Canvas>

          {/* Hover info overlay */}
          <motion.div
            className="absolute bottom-8 left-8 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={hoveredTech ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          >
            {hoveredTech && (
              <div className="bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-accent/30">
                <h3 className="text-2xl font-bold text-white mb-1">{hoveredTech.name}</h3>
                <p className="text-xs text-accent uppercase tracking-widest">{hoveredTech.category}</p>
              </div>
            )}
          </motion.div>

          {/* Instructions */}
          <div className="absolute top-8 right-8 text-right pointer-events-none">
            <p className="text-xs text-white/40 uppercase tracking-wider">Drag to rotate • Explore the ecosystem</p>
          </div>
        </motion.div>

        {/* Category legend */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
        >
          {['Language', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Cloud'].map((cat, i) => (
            <motion.div
              key={cat}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all"
              whileHover={{ y: -4 }}
            >
              <p className="text-sm font-bold text-white uppercase">{cat}</p>
              <p className="text-xs text-white/50 mt-1">
                {techStack.filter(t => t.category === cat).length} tools
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechEcosystem;
