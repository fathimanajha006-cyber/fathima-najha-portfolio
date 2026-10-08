import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, ChevronRight, Sparkles, Cpu, Play } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const TERMINAL_LOGS = [
  'SYSTEM INITIALIZING...',
  'NAJHA.OS KERNEL 4.1 ONLINE',
  'LOADING DIGITAL CITY...',
  'SYNCHRONIZING 8 METROPOLIS DISTRICTS...',
  'AUTONOMOUS TRANSIT SKYWAY ARMED...',
  'CITY CORE ONLINE.'
];

export default function OpeningExperience({ onEnterCity }) {
  const [stage, setStage] = useState('terminal'); // 'terminal' | 'reveal' | 'ready'
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    soundManager.playBoot();

    // Step through terminal diagnostics
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < TERMINAL_LOGS.length - 1) {
          soundManager.playHover();
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setStage('ready');
            soundManager.playSuccess();
          }, 400);
          return prev;
        }
      });
    }, 380);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    soundManager.playWarp();
    soundManager.playClick();
    onEnterCity();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 pointer-events-auto">
      {/* Dark overlay that fades to reveal city skyline */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          stage === 'terminal' ? 'bg-[#02050f]' : 'bg-gradient-to-t from-[#02050f]/95 via-[#02050f]/60 to-transparent'
        }`}
      />

      {/* Bypass in top right */}
      <button
        onClick={handleStart}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-[#00ffcc] border border-[#00ffcc30] hover:bg-[#00ffcc15] transition-all cursor-pointer"
      >
        <span>BYPASS BOOT</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Terminal Screen (0 - 3s) */}
      {stage === 'terminal' && (
        <div className="relative z-10 w-full max-w-lg p-6 rounded-xl bg-[#030918]/90 border border-[#00ffcc30] shadow-[0_0_40px_rgba(0,255,204,0.15)] font-mono space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#00ffcc20] text-xs text-[#00ffcc]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
              <span>NAJHA.OS // KERNEL 4.1</span>
            </div>
            <span className="text-gray-400">CALICUT // 2026</span>
          </div>

          <div className="space-y-1.5 text-xs text-gray-300 min-h-[140px]">
            {TERMINAL_LOGS.slice(0, logIndex + 1).map((log, idx) => (
              <div
                key={idx}
                className={idx === logIndex ? 'text-[#00ffcc] font-bold' : 'text-gray-400'}
              >
                &gt; {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reveal Screen with First-Time Guide */}
      {stage === 'ready' && (
        <div className="relative z-10 w-full max-w-xl p-8 rounded-2xl bg-[#040d20]/92 border border-[#00ffcc40] shadow-[0_0_50px_rgba(0,255,204,0.2)] text-center space-y-6 animate-fadeIn backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ffcc15] border border-[#00ffcc40] text-xs font-mono text-[#00ffcc]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CITY CORE ONLINE // ALL DISTRICTS SYNCHRONIZED</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black font-['Orbitron'] text-white tracking-widest drop-shadow-[0_0_30px_rgba(0,255,204,0.5)]">
              FATHIMA NAJHA.OS
            </h1>
            <p className="text-base sm:text-lg font-bold font-['Rajdhani'] text-[#38bdf8] tracking-widest uppercase">
              COMPUTER SCIENCE ENGINEER <span className="text-[#ff0055] mx-1">•</span> CREATIVE DEVELOPER
            </p>
            <p className="text-xs sm:text-sm font-mono text-gray-400 italic">
              "Welcome to my digital world. An interactive futuristic city that is my portfolio."
            </p>
          </div>

          {/* Quick First-Time Guide */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left pt-2 border-t border-[#00ffcc20]">
            <div className="p-2.5 rounded bg-[#020714] border border-[#00ffcc20]">
              <div className="text-[10px] font-mono text-[#00ffcc] font-bold">DRAG</div>
              <div className="text-[11px] text-gray-300 font-sans">Look around city</div>
            </div>
            <div className="p-2.5 rounded bg-[#020714] border border-[#00ffcc20]">
              <div className="text-[10px] font-mono text-[#38bdf8] font-bold">CLICK</div>
              <div className="text-[11px] text-gray-300 font-sans">Interact landmarks</div>
            </div>
            <div className="p-2.5 rounded bg-[#020714] border border-[#00ffcc20]">
              <div className="text-[10px] font-mono text-[#a855f7] font-bold">MAP</div>
              <div className="text-[11px] text-gray-300 font-sans">Choose district</div>
            </div>
            <div className="p-2.5 rounded bg-[#020714] border border-[#00ffcc20]">
              <div className="text-[10px] font-mono text-[#f59e0b] font-bold">TRAVEL</div>
              <div className="text-[11px] text-gray-300 font-sans">Cinematic transit</div>
            </div>
          </div>

          {/* Enter City Button */}
          <div className="pt-2">
            <button
              onClick={handleStart}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-['Orbitron'] text-sm sm:text-base font-extrabold tracking-widest text-[#02050f] bg-gradient-to-r from-[#00ffcc] via-[#38bdf8] to-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,255,204,0.7)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Play className="w-4 h-4 fill-current text-[#02050f]" />
              <span>ENTER CITY</span>
              <ChevronRight className="w-4 h-4 text-[#02050f] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
