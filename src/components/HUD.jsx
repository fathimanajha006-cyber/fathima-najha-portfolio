import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Compass,
  User,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  GraduationCap,
  Radio,
  Minimize2,
  Maximize2,
  Eye,
  Sliders,
  Menu,
  X
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

const DISTRICT_ICONS = {
  explore: Compass,
  identity: User,
  projects: Code2,
  lab: Cpu,
  experience: Briefcase,
  vault: Trophy,
  archive: GraduationCap,
  terminal: Radio
};

export default function HUD({
  activeDistrict,
  onSelectDistrict,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { districts } = portfolioData;

  const currentDistrictMeta = districts.find((d) => d.id === activeDistrict) || districts[0];

  return (
    <>
      {/* ========================================================
          TOP HUD BAR
      ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 p-3 md:p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: OS Brand & Coordinates */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                onSelectDistrict('explore');
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#040916]/80 border border-[#00ffcc30] hover:border-[#00ffcc] backdrop-blur-md transition-all cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] animate-ping" />
              <div className="text-left">
                <span className="text-xs md:text-sm font-black font-['Orbitron'] text-white tracking-wider group-hover:text-[#00ffcc]">
                  FATHIMA.OS
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono text-gray-400 ml-2">
                  // KERNEL 4.1
                </span>
              </div>
            </button>

            {/* Current District Tag */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#040916]/70 border border-[#00ffcc20] backdrop-blur-md text-xs font-mono text-gray-300">
              <span className="text-[#00ffcc]">LOC:</span>
              <span className="font-bold text-white uppercase">{currentDistrictMeta.name}</span>
            </div>
          </div>

          {/* Right: Telemetry & Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Reduced Motion Toggle */}
            <button
              onClick={onToggleReducedMotion}
              title={reducedMotion ? 'Enable Full Camera Motion' : 'Enable Reduced Motion'}
              className={`p-2 rounded-lg border backdrop-blur-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                reducedMotion
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                  : 'bg-[#040916]/80 border-[#00ffcc25] text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">
                {reducedMotion ? 'MOTION: REDUCED' : 'MOTION: FULL'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Futuristic Audio' : 'Mute Audio'}
              className={`p-2 rounded-lg border backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
                !isMuted
                  ? 'bg-[#00ffcc20] border-[#00ffcc] text-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
                  : 'bg-[#040916]/80 border-[#00ffcc25] text-gray-400 hover:text-white'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden lg:inline text-[11px] font-mono">
                {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-[#040916]/90 border border-[#00ffcc40] text-[#00ffcc] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          BOTTOM HUD NAVIGATION DECK (DESKTOP)
      ======================================================== */}
      <nav className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#030712]/85 border border-[#00ffcc30] backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          {districts.map((d, idx) => {
            const Icon = DISTRICT_ICONS[d.id] || Compass;
            const isActive = activeDistrict === d.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectDistrict(d.id);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-['Rajdhani'] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(0,255,204,0.4)] scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{d.label}</span>
                <span className="text-[9px] font-mono opacity-50 ml-0.5">[{idx + 1}]</span>

                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00ffcc]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================
          MOBILE BOTTOM BAR / DRAWER
      ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#02040a]/95 backdrop-blur-xl p-6 flex flex-col justify-between animate-fadeIn">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#00ffcc25]">
              <div className="flex items-center gap-2 text-[#00ffcc] font-['Orbitron'] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] animate-ping" />
                <span>FATHIMA.OS NAVIGATION</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {districts.map((d) => {
                const Icon = DISTRICT_ICONS[d.id] || Compass;
                const isActive = activeDistrict === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      soundManager.playClick();
                      onSelectDistrict(d.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isActive
                        ? 'bg-[#00ffcc20] border-[#00ffcc] text-[#00ffcc]'
                        : 'bg-[#061022] border-[#00ffcc20] text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1.5" />
                    <div className="text-xs font-bold font-['Orbitron']">{d.label}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{d.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#00ffcc20] text-center text-xs font-mono text-gray-500">
            FATHIMA NAJHA K // CS ENGINEER
          </div>
        </div>
      )}
    </>
  );
}
