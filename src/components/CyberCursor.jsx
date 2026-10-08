import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const checkPointer = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsPointerDevice(false);
      }
    };
    checkPointer();

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button';

      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth trailing animation loop
    let frameId;
    let currX = -100;
    let currY = -100;

    const animateTrail = () => {
      frameId = requestAnimationFrame(animateTrail);
      currX += (pos.x - currX) * 0.22;
      currY += (pos.y - currY) * 0.22;
      setTrailingPos({ x: currX, y: currY });
    };

    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [pos.x, pos.y]);

  if (!isPointerDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center sharp dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#00ffcc] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_#00ffcc]"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />

      {/* Trailing futuristic crosshair reticle */}
      <div
        className={`fixed rounded-full border border-[#00ffcc] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isHovered
            ? 'w-10 h-10 border-[#ff0055] bg-[#ff005510] rotate-45 scale-110'
            : 'w-6 h-6 border-[#00ffcc70] bg-[#00ffcc05] rotate-0'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      >
        {/* Tiny crosshair ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-1 bg-[#00ffcc]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-1 bg-[#00ffcc]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 h-0.5 bg-[#00ffcc]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1 h-0.5 bg-[#00ffcc]" />
      </div>
    </div>
  );
}
