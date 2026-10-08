import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  ChevronRight,
  Sparkles,
  Navigation,
  Bot
} from 'lucide-react';
import { DISTRICT_NODES } from './City3D';
import { soundManager } from '../utils/soundManager';

const ICON_MAP = {
  identity: User,
  education: GraduationCap,
  projects: Code2,
  lab: Cpu,
  experience: Briefcase,
  vault: Trophy,
  certifications: FileCheck,
  contact: Radio
};

const GUIDE_MESSAGES = [
  'Welcome to Najha.OS. The interactive futuristic city that is Fathima\'s portfolio.',
  'Where should we go? I recommend checking out the Project District first.',
  'You can open the City Map in the top-right anytime if you need an overview.',
  'Select any destination to initiate autonomous skyway transit.'
];

export default function CentralTerminal({ onSelectDestination }) {
  const [guideIndex, setGuideIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  // Cycle subtle guide advice
  useEffect(() => {
    const interval = setInterval(() => {
      setGuideIndex((prev) => (prev + 1) % GUIDE_MESSAGES.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const destinations = DISTRICT_NODES.filter((d) => d.id !== 'core');

  return (
    <div className="fixed inset-x-0 bottom-16 sm:bottom-20 z-30 pointer-events-none flex flex-col items-center px-4 animate-fadeIn">
      {/* ========================================================
          SUBTLE COMPANION BOT GUIDE DIALOGUE (NAJHA CENTRAL)
      ======================================================== */}
      {showGuide && (
        <div className="pointer-events-auto mb-3 max-w-lg w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#030918]/90 border border-[#00ffcc40] shadow-[0_0_25px_rgba(0,255,204,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#00ffcc15] border border-[#00ffcc40] text-[#00ffcc]">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[10px] text-[#00ffcc] font-bold">
                CITY GUIDE BOT // ADVICE
              </div>
              <p className="text-xs text-gray-200 font-sans">
                "{GUIDE_MESSAGES[guideIndex]}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowGuide(false)}
            className="text-gray-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded cursor-pointer"
            title="Dismiss Guide"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================
          CENTRAL DESTINATION TERMINAL (WHERE DO YOU WANT TO GO?)
      ======================================================== */}
      <div className="pointer-events-auto w-full max-w-4xl p-4 sm:p-5 rounded-2xl bg-[#030919]/90 border border-[#00ffcc45] shadow-[0_0_40px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#00ffcc20] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping" />
            <span className="text-[#00ffcc] font-bold tracking-widest font-['Orbitron']">
              NAJHA CENTRAL // NAVIGATION TERMINAL
            </span>
          </div>
          <span className="text-gray-400 hidden sm:inline">
            SELECT DESTINATION TO TRAVEL
          </span>
        </div>

        <div className="text-center mb-3">
          <h2 className="text-lg sm:text-2xl font-black font-['Orbitron'] text-white tracking-widest">
            WHERE DO YOU WANT TO GO?
          </h2>
          <p className="text-[11px] sm:text-xs font-mono text-[#38bdf8] mt-0.5">
            CHOOSE A DISTRICT TO INITIATE CINEMATIC TRANSIT ACROSS THE METROPOLIS
          </p>
        </div>

        {/* 8 Futuristic Destination Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {destinations.map((dest) => {
            const Icon = ICON_MAP[dest.id] || Navigation;
            const isHero = dest.id === 'projects';

            return (
              <button
                key={dest.id}
                onClick={() => {
                  soundManager.playWarp();
                  soundManager.playClick();
                  onSelectDestination(dest.id);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`group relative p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHero
                    ? 'bg-gradient-to-br from-[#00ffcc15] via-[#051528] to-[#040e1d] border-[#00ffcc] shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:scale-[1.03]'
                    : 'bg-[#040c1e]/85 border-[#00ffcc25] hover:border-[#00ffcc] hover:bg-[#071734] hover:scale-[1.02]'
                }`}
              >
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-60"
                  style={{ backgroundColor: dest.signColor }}
                />

                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{
                      color: dest.signColor,
                      backgroundColor: `${dest.signColor}18`,
                      border: `1px solid ${dest.signColor}35`
                    }}
                  >
                    {dest.num}
                  </span>
                  <Icon
                    className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                    style={{ color: dest.signColor }}
                  />
                </div>

                <div className="text-xs sm:text-sm font-bold font-['Orbitron'] text-white group-hover:text-[#00ffcc] transition-colors truncate">
                  {dest.label.split('—')[1]?.trim() || dest.label}
                </div>

                <div className="text-[10px] font-mono text-gray-400 flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                  <span className="truncate">TRAVEL</span>
                  <ChevronRight className="w-3 h-3 text-gray-500 group-hover:translate-x-1 group-hover:text-[#00ffcc] transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
