import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, ChevronRight, Sparkles, Cpu } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const BOOT_LOGS = [
  'INITIALIZING FATHIMA.OS KERNEL v4.1...',
  'ALLOCATING QUANTUM MEMORY CHANNELS... OK',
  'LOADING DIGITAL ENVIRONMENT & 3D MESH SHADERS...',
  'CONNECTING PROJECT DATABASE (AGRIQUEUE / I-O SIM)...',
  'LOADING EXPERIENCE MATRIX & ACADEMIC REGISTERS...',
  'LOADING SKILLS & HARDWARE ARCHITECTURE MODULES...',
  'VERIFYING CRYPTOGRAPHIC HANDSHAKE...',
  'SYSTEM READY.'
];

export default function BootSequence({ onComplete }) {
  const [logIndex, setLogIndex] = useState(0);
  const [bootReady, setBootReady] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    soundManager.playBoot();
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          soundManager.playHover();
          return prev + 1;
        } else {
          clearInterval(interval);
          setBootReady(true);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    soundManager.playSuccess();
    soundManager.playWarp();
    setIsEntering(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const handleSkip = () => {
    soundManager.playClick();
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#02040a] text-white transition-opacity duration-700 ${
        isEntering ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#071329] via-[#02050c] to-[#010206] opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffcc08_1px,transparent_1px),linear-gradient(to_bottom,#00ffcc08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Cyber Scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-35" />

      {/* Skip button in top right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono tracking-widest text-[#00ffcc] border border-[#00ffcc33] hover:border-[#00ffcc] hover:bg-[#00ffcc15] transition-all cursor-pointer z-20"
      >
        <span>BYPASS BOOT</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Center Console Container */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-8 mx-4 border border-[#00ffcc30] bg-[#050b18]/85 backdrop-blur-md rounded-lg shadow-[0_0_50px_rgba(0,255,204,0.15)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#00ffcc25]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff0055] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc]" />
            <span className="font-mono text-xs tracking-wider text-[#00ffcc]">
              SYS.KERNEL // BOOT SEQUENCE 4.1
            </span>
          </div>
          <div className="font-mono text-xs text-gray-400">
            PORT: 8080 // SECURE
          </div>
        </div>

        {/* Console Boot Logs */}
        <div className="mb-8 font-mono text-xs md:text-sm space-y-2 h-44 overflow-hidden text-gray-300">
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 transition-all duration-200 ${
                idx === logIndex ? 'text-[#00ffcc] font-semibold' : 'text-gray-400'
              }`}
            >
              <span className="text-gray-500 font-bold">&gt;</span>
              <span>{log}</span>
              {idx === logIndex && !bootReady && (
                <span className="w-2 h-4 bg-[#00ffcc] inline-block animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Final System Ready & Hero Title */}
        {bootReady ? (
          <div className="pt-4 border-t border-[#00ffcc25] animate-fadeIn text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffcc15] border border-[#00ffcc44] text-[#00ffcc] text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>DIGITAL ENVIRONMENT SYNCHRONIZED</span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider text-white font-['Orbitron'] uppercase drop-shadow-[0_0_20px_rgba(0,255,204,0.4)]">
                FATHIMA NAJHA K
              </h1>
              <p className="mt-2 text-sm md:text-base font-medium tracking-widest text-[#38bdf8] font-['Rajdhani'] uppercase">
                COMPUTER SCIENCE ENGINEER <span className="text-[#ff0055] mx-1.5">•</span> CREATIVE DEVELOPER
              </p>
              <p className="mt-1 text-xs text-gray-400 font-mono italic">
                "Exploring technology, one system at a time."
              </p>
            </div>

            {/* Glowing Enter Button */}
            <div className="pt-2">
              <button
                onClick={handleEnter}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded font-['Orbitron'] text-sm font-bold tracking-widest text-[#02040a] bg-gradient-to-r from-[#00ffcc] via-[#38bdf8] to-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,255,204,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Cpu className="w-4 h-4 text-[#02040a]" />
                <span>ENTER FATHIMA.OS</span>
                <ChevronRight className="w-4 h-4 text-[#02040a] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-4 border-t border-[#00ffcc20] text-xs font-mono text-gray-500">
            <span className="animate-pulse">MOUNTING CYBER CITY GEOMETRY...</span>
            <span>{Math.round(((logIndex + 1) / BOOT_LOGS.length) * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
