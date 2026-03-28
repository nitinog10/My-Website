import { MotionValue, motion, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

function SpotlightText({
    children,
    className
}: {
    children: string;
    className?: string;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Create a dynamic mask that follows the mouse
    const maskImage = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 40%, transparent 100%)`;

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`relative inline-block cursor-none select-none ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={onMouseMove}
            style={{ pointerEvents: 'auto' }}
        >
            {/* Layer 1: Base White Text */}
            <span className="relative z-10 block text-white transition-opacity duration-300">
                {children}
            </span>

            {/* Layer 2: Gradient Reveal (Overlay) */}
            <motion.span
                className="absolute inset-0 z-20 block whitespace-nowrap"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    opacity: isHovered ? 1 : 0,

                    color: 'transparent',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',

                    backgroundImage: 'linear-gradient(90deg, #00ffc8, #60d5f0, #00ffc8)',
                    backgroundSize: '200% 100%',

                    filter: 'drop-shadow(0 0 10px #00ffc8)',
                }}
                animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear"
                }}
            >
                {children}
            </motion.span>

            {/* Mouse Flow Glow */}
            <motion.div
                className="absolute z-0 pointer-events-none blur-2xl"
                style={{
                    background: 'radial-gradient(circle, rgba(0,255,200,0.4) 0%, transparent 70%)',
                    left: 0, top: 0,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '150px',
                    height: '150px',
                    opacity: isHovered ? 1 : 0,
                }}
            />
        </div>
    );
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

    // Z-Index transforms - crucial to ensure the visible slide captures mouse events!
    const zIndex1 = useTransform(scrollYProgress, [0, 0.2, 0.21], [50, 50, 0]);
    const zIndex2 = useTransform(scrollYProgress, [0.19, 0.2, 0.5, 0.51], [0, 50, 50, 0]);
    const zIndex3 = useTransform(scrollYProgress, [0.49, 0.5, 0.8, 0.81], [0, 50, 50, 0]);

    return (
        <div className="absolute inset-0 flex flex-col justify-center p-10 z-40 w-full h-full pointer-events-none">

            <motion.div
                style={{ opacity: opacity1, y: y1, zIndex: zIndex1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto"
            >
                <div className="mb-4">
                    <SpotlightText className="text-6xl md:text-9xl font-bold tracking-tighter uppercase">
                        NITIN MISHRA
                    </SpotlightText>
                </div>
                <SpotlightText className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
                    AI Engineer & Developer
                </SpotlightText>
            </motion.div>

            <motion.div
                style={{ opacity: opacity2, y: y2, zIndex: zIndex2 }}
                className="absolute inset-0 flex items-center justify-start pl-10 md:pl-20 pointer-events-auto"
            >
                <SpotlightText className="text-5xl md:text-7xl font-bold max-w-2xl leading-tight">
                    Building Intelligent Systems.
                </SpotlightText>
            </motion.div>

            <motion.div
                style={{ opacity: opacity3, y: y3, zIndex: zIndex3 }}
                className="absolute inset-0 flex items-center justify-end pr-10 md:pr-20 pointer-events-auto"
            >
                <SpotlightText className="text-5xl md:text-7xl font-bold max-w-2xl text-right leading-tight">
                    Scalable AI Solutions.
                </SpotlightText>
            </motion.div>
        </div>
    );
}
