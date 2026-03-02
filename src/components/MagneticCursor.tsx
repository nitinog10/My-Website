import { useEffect, useRef, useCallback } from 'react';

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);
  const prevRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Lerp position (instant tracking, no lag)
    const lerpFactor = 0.35;
    currentRef.current.x += (posRef.current.x - currentRef.current.x) * lerpFactor;
    currentRef.current.y += (posRef.current.y - currentRef.current.y) * lerpFactor;

    // Calculate velocity for rotation
    const dx = posRef.current.x - prevRef.current.x;
    const dy = posRef.current.y - prevRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 1.5) {
      // Rotate in direction of movement
      targetRotationRef.current += speed * 1.8;
    }

    // Smooth rotation lerp
    rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.12;

    prevRef.current.x = posRef.current.x;
    prevRef.current.y = posRef.current.y;

    el.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
    el.style.opacity = visibleRef.current ? '1' : '0';

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      visibleRef.current = true;
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Hide on mobile via SSR check
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  const cornerSize = 10;
  const gap = 8;
  const strokeWidth = 2;
  const color = 'rgba(255, 255, 255, 0.85)';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ opacity: 0, willChange: 'transform' }}
    >
      {/* Viewfinder container */}
      <div style={{ width: 44, height: 44, position: 'relative' }}>
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Top-left corner */}
        <svg
          style={{ position: 'absolute', top: gap, left: gap }}
          width={cornerSize}
          height={cornerSize}
          viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        >
          <polyline
            points={`0,${cornerSize} 0,0 ${cornerSize},0`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        </svg>

        {/* Top-right corner */}
        <svg
          style={{ position: 'absolute', top: gap, right: gap }}
          width={cornerSize}
          height={cornerSize}
          viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        >
          <polyline
            points={`0,0 ${cornerSize},0 ${cornerSize},${cornerSize}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        </svg>

        {/* Bottom-right corner */}
        <svg
          style={{ position: 'absolute', bottom: gap, right: gap }}
          width={cornerSize}
          height={cornerSize}
          viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        >
          <polyline
            points={`${cornerSize},0 ${cornerSize},${cornerSize} 0,${cornerSize}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        </svg>

        {/* Bottom-left corner */}
        <svg
          style={{ position: 'absolute', bottom: gap, left: gap }}
          width={cornerSize}
          height={cornerSize}
          viewBox={`0 0 ${cornerSize} ${cornerSize}`}
        >
          <polyline
            points={`0,0 0,${cornerSize} ${cornerSize},${cornerSize}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="square"
          />
        </svg>
      </div>
    </div>
  );
};

export default MagneticCursor;