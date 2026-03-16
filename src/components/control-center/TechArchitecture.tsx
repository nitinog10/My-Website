import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { X, Info } from 'lucide-react';

const techNodes = [
  // AI/ML Layer
  { id: 'python', name: 'Python', layer: 'ai', x: 200, y: 100, color: '#3776AB', category: 'AI/ML' },
  { id: 'pytorch', name: 'PyTorch', layer: 'ai', x: 350, y: 80, color: '#EE4C2C', category: 'AI/ML' },
  { id: 'tensorflow', name: 'TensorFlow', layer: 'ai', x: 500, y: 100, color: '#FF6F00', category: 'AI/ML' },
  { id: 'openai', name: 'OpenAI', layer: 'ai', x: 350, y: 150, color: '#412991', category: 'AI/ML' },
  
  // Frontend Layer
  { id: 'react', name: 'React', layer: 'frontend', x: 200, y: 300, color: '#61DAFB', category: 'Frontend' },
  { id: 'nextjs', name: 'Next.js', layer: 'frontend', x: 350, y: 280, color: '#FFFFFF', category: 'Frontend' },
  { id: 'typescript', name: 'TypeScript', layer: 'frontend', x: 500, y: 300, color: '#3178C6', category: 'Frontend' },
  
  // Backend Layer
  { id: 'nodejs', name: 'Node.js', layer: 'backend', x: 200, y: 500, color: '#339933', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', layer: 'backend', x: 350, y: 480, color: '#009688', category: 'Backend' },
  { id: 'postgresql', name: 'PostgreSQL', layer: 'backend', x: 500, y: 500, color: '#4169E1', category: 'Backend' },
  
  // DevOps Layer
  { id: 'docker', name: 'Docker', layer: 'devops', x: 200, y: 700, color: '#2496ED', category: 'DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', layer: 'devops', x: 350, y: 680, color: '#326CE5', category: 'DevOps' },
  { id: 'aws', name: 'AWS', layer: 'devops', x: 500, y: 700, color: '#FF9900', category: 'DevOps' },
];

const connections = [
  // AI to Frontend
  { from: 'python', to: 'react' },
  { from: 'pytorch', to: 'nextjs' },
  { from: 'openai', to: 'nextjs' },
  
  // Frontend to Backend
  { from: 'react', to: 'nodejs' },
  { from: 'nextjs', to: 'fastapi' },
  { from: 'typescript', to: 'nodejs' },
  
  // Backend to DevOps
  { from: 'nodejs', to: 'docker' },
  { from: 'fastapi', to: 'kubernetes' },
  { from: 'postgresql', to: 'docker' },
  
  // Cross-layer
  { from: 'python', to: 'fastapi' },
  { from: 'docker', to: 'aws' },
  { from: 'kubernetes', to: 'aws' },
];

interface TechArchitectureProps {
  onClose: () => void;
}

const TechNode = ({ node, onHover, isHovered }: any) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;

    gsap.fromTo(
      nodeRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: Math.random() * 0.5,
      }
    );

    // Floating animation
    gsap.to(nodeRef.current, {
      y: '+=10',
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer group"
      style={{
        left: node.x,
        top: node.y,
        transform: 'translate(-50%, -50%)',
      }}
      onHoverStart={() => onHover(node)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.2 }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
        style={{
          backgroundColor: node.color,
          width: '80px',
          height: '80px',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />

      {/* Node */}
      <div
        className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all"
        style={{
          borderColor: isHovered ? node.color : `${node.color}40`,
          boxShadow: isHovered ? `0 0 20px ${node.color}` : 'none',
        }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: node.color }}
        />
      </div>

      {/* Label */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <p
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: isHovered ? node.color : '#fff' }}
        >
          {node.name}
        </p>
      </div>

      {/* Pulse ring */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: node.color }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

const TechArchitecture = ({ onClose }: TechArchitectureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate connection lines
    const lines = svgRef.current.querySelectorAll('line');
    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          delay: i * 0.1,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  const layers = [
    { name: 'AI/ML LAYER', y: 100, color: '#FF00F5' },
    { name: 'FRONTEND LAYER', y: 300, color: '#00F0FF' },
    { name: 'BACKEND LAYER', y: 500, color: '#00FF94' },
    { name: 'DEVOPS LAYER', y: 700, color: '#FFD700' },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <button
            onClick={onClose}
            className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-mono uppercase">Close Module</span>
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Info className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                TECH ARCHITECTURE
              </h1>
              <p className="text-sm text-purple-400 font-mono">
                SYSTEM LAYER VISUALIZATION
              </p>
            </div>
          </div>
        </div>

        {/* Architecture visualization */}
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[900px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            {/* Layer labels */}
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="absolute left-8"
                style={{ top: layer.y - 40 }}
              >
                <div
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: `${layer.color}10`,
                    borderColor: `${layer.color}40`,
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: layer.color }}
                  >
                    {layer.name}
                  </p>
                </div>
              </div>
            ))}

            {/* Connection lines */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {connections.map((conn, i) => {
                const fromNode = techNodes.find((n) => n.id === conn.from);
                const toNode = techNodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const isActive =
                  hoveredNode?.id === conn.from || hoveredNode?.id === conn.to;

                return (
                  <line
                    key={i}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isActive ? fromNode.color : 'rgba(0,240,255,0.2)'}
                    strokeWidth={isActive ? 3 : 1}
                    strokeDasharray="5,5"
                    opacity={isActive ? 0.8 : 0.3}
                  />
                );
              })}
            </svg>

            {/* Tech nodes */}
            {techNodes.map((node) => (
              <TechNode
                key={node.id}
                node={node}
                onHover={setHoveredNode}
                isHovered={hoveredNode?.id === node.id}
              />
            ))}

            {/* Hover info */}
            <AnimatePresence>
              {hoveredNode && (
                <motion.div
                  className="absolute bottom-8 left-8 right-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div
                    className="p-6 rounded-xl border-2 bg-black/90 backdrop-blur-md"
                    style={{ borderColor: `${hoveredNode.color}40` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className="text-2xl font-black uppercase mb-2"
                          style={{ color: hoveredNode.color }}
                        >
                          {hoveredNode.name}
                        </h3>
                        <p className="text-sm text-white/60 mb-4">
                          {hoveredNode.category} • {hoveredNode.layer.toUpperCase()} LAYER
                        </p>
                        <p className="text-white/80">
                          Core technology in the {hoveredNode.layer} architecture layer,
                          connected to multiple system components.
                        </p>
                      </div>
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${hoveredNode.color}20`,
                          border: `2px solid ${hoveredNode.color}`,
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: hoveredNode.color }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="p-4 rounded-xl border bg-black/50"
                style={{ borderColor: `${layer.color}40` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <p
                    className="text-sm font-bold uppercase"
                    style={{ color: layer.color }}
                  >
                    {layer.name.replace(' LAYER', '')}
                  </p>
                </div>
                <p className="text-xs text-white/60">
                  {techNodes.filter((n) => n.layer === layer.name.toLowerCase().split(' ')[0]).length} technologies
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechArchitecture;
