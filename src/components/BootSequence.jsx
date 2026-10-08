import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, ChevronRight, Sparkles, Cpu, Play } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const BOOT_STAGES = [
  { time: 0, text: 'INITIALIZING FATHIMA.OS KERNEL 6.2...' },
  { time: 2, text: 'SYNCHRONIZING DIGITAL METROPOLIS MESH & LIGHTS...' },
  { time: 4, text: 'DISCOVERING 7 ARCHITECTURAL LANDMARKS...' },
  { time: 6, text: 'LINKING PROJECT LAB, TECH MATRIX & VAULT...' },
  { time: 8, text: 'ESTABLISHING CYBER COMPANION TELEMETRY...' },
  { time: 10, text: 'SYSTEM ONLINE // DIGITAL ENVIRONMENT SYNCHRONIZED.' }
];

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: boot log, 1: cinematic reveal, 2: enter prompt
  const [logIndex, setLogIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    soundManager.playBoot();

    // Stage 1: Terminal Logs (0 - 4s)
    const logTimer = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_STAGES.length - 1) {
          soundManager.playHover();
          return prev + 1;
        } else {
          clearInterval(logTimer);
          setPhase(1);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(logTimer);
  }, []);

  const handleEnterWorld = () => {
    soundManager.playSuccess();
    soundManager.playWarp();
    setIsWarping(true);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
        isWarping ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Dim Gradient (lets 3D city shine through during cinematic reveal) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 0
            ? 'bg-[#020409]'
            : 'bg-gradient-to-t from-[#020409]/95 via-[#020409]/40 to-transparent'
        }`}
      />

      {/* Bypass / Skip in top corner */}
      <button
        onClick={handleEnterWorld}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#00ffcc] border border-[#00ffcc30] hover:bg-[#00ffcc15] transition-all cursor-pointer"
      >
        <span>BYPASS CINEMATIC</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* ========================================================
          PHASE 0: TERMINAL BOOT SEQUENCE (0 - 4s)
      ======================================================== */}
      {phase === 0 && (
        <div className="relative z-10 w-full max-w-xl mx-4 p-6 rounded-xl bg-[#030814]/90 border border-[#00ffcc30] shadow-[0_0_40px_rgba(0,255,204,0.15)] font-mono space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#00ffcc20] text-xs text-[#00ffcc]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
              <span>SYS.KERNEL // BOOT DIAGNOSTICS</span>
            </div>
            <span className="text-gray-400">CALICUT // 2026</span>
          </div>

          <div className="space-y-1.5 text-xs text-gray-300 min-h-[140px]">
            {BOOT_STAGES.slice(0, logIndex + 1).map((s, idx) => (
              <div
                key={idx}
                className={idx === logIndex ? 'text-[#00ffcc] font-bold' : 'text-gray-400'}
              >
                &gt; {s.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          PHASE 1: CINEMATIC REVEAL & AVATAR PERCH (REFERENCE 2)
      ======================================================== */}
      {phase >= 1 && (
        <div className="relative z-10 max-w-2xl mx-4 text-center space-y-6 animate-fadeIn">
          {/* System Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ffcc15] border border-[#00ffcc40] text-xs font-mono text-[#00ffcc]">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span>SYSTEM ONLINE // ENTER THE DIGITAL CITY</span>
          </div>

          {/* Title Card */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-['Orbitron'] text-white tracking-widest drop-shadow-[0_0_35px_rgba(0,255,204,0.5)]">
              FATHIMA.OS
            </h1>
            <p className="text-base sm:text-xl font-bold font-['Rajdhani'] text-[#38bdf8] tracking-widest uppercase">
              COMPUTER SCIENCE ENGINEER <span className="text-[#ff0055] mx-1">•</span> CREATIVE DEVELOPER
            </p>
            <p className="text-xs sm:text-sm font-mono text-gray-400 italic">
              "The city itself is the portfolio. Travel through the streets and discover my world."
            </p>
          </div>

          {/* Primary Call to Action Button */}
          <div className="pt-2">
            <button
              onClick={handleEnterWorld}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-['Orbitron'] text-sm sm:text-base font-extrabold tracking-widest text-[#020409] bg-gradient-to-r from-[#00ffcc] via-[#38bdf8] to-[#00e5ff] hover:shadow-[0_0_40px_rgba(0,255,204,0.8)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Play className="w-5 h-5 fill-current text-[#020409]" />
              <span>EXPLORE MY DIGITAL CITY</span>
              <ChevronRight className="w-5 h-5 text-[#020409] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Control instruction hint */}
          <div className="text-xs font-mono text-gray-400">
            [WASD / ARROWS] TO MOVE STREETS • [DRAG MOUSE] TO LOOK • [SHIFT] SPRINT
          </div>
        </div>
      )}
    </div>
  );
}
