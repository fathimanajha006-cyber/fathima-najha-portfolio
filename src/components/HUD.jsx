import React from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  Compass,
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Zap
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

const DISTRICT_ICONS = {
  city: Compass,
  education: GraduationCap,
  projects: Code2,
  lab: Cpu,
  experience: Briefcase,
  vault: Trophy,
  certifications: FileCheck,
  contact: Radio
};

export default function HUD({
  activeDistrict,
  onSelectDistrict,
  nearbyBuilding,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
  onSimulateMove
}) {
  const { districts } = portfolioData;
  const currentMeta = districts.find((d) => d.id === activeDistrict) || districts[0];

  return (
    <>
      {/* ========================================================
          TOP-LEFT: MINIMAL OS LOGO & CURRENT LOCATION
      ======================================================== */}
      <div className="fixed top-4 left-4 z-40 pointer-events-auto">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#030814]/80 border border-[#00ffcc25] backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] animate-pulse" />
          <div className="text-left font-['Orbitron']">
            <div className="text-xs font-black text-white tracking-widest">
              FATHIMA.OS
            </div>
            <div className="text-[10px] font-mono text-[#00ffcc] tracking-wider uppercase">
              // {activeDistrict === 'city' ? 'CITY STREETS OVERVIEW' : currentMeta.name}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TOP-RIGHT: MOTION & AUDIO CONTROLS
      ======================================================== */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
        {/* Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          title="Toggle Reduced Motion"
          className={`p-2 rounded-lg border backdrop-blur-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            reducedMotion
              ? 'bg-amber-950/70 border-amber-500 text-amber-300'
              : 'bg-[#030814]/80 border-[#00ffcc20] text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline text-[10px]">
            {reducedMotion ? 'MOTION: REDUCED' : 'MOTION: FULL'}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleMute}
          title="Toggle Audio"
          className={`p-2 rounded-lg border backdrop-blur-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            !isMuted
              ? 'bg-[#00ffcc20] border-[#00ffcc] text-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
              : 'bg-[#030814]/80 border-[#00ffcc20] text-gray-400 hover:text-white'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline text-[10px]">
            {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
          </span>
        </button>
      </div>

      {/* ========================================================
          CENTER: PROXIMITY BUILDING NOTIFICATION
      ======================================================== */}
      {nearbyBuilding && activeDistrict === 'city' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-fadeIn">
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectDistrict(nearbyBuilding.id);
            }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#051124]/90 border border-[#00ffcc] shadow-[0_0_30px_rgba(0,255,204,0.4)] backdrop-blur-md cursor-pointer hover:scale-105 transition-all text-xs font-mono font-bold text-white group"
          >
            <Zap className="w-4 h-4 text-[#00ffcc] animate-bounce" />
            <span>
              NEAR: <span className="text-[#00ffcc]">{nearbyBuilding.title}</span> ({nearbyBuilding.dist}m)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#00ffcc] text-[#020409] font-black">
              PRESS [E] OR CLICK TO ENTER
            </span>
          </button>
        </div>
      )}

      {/* ========================================================
          BOTTOM: SUBTLE FAST-TRAVEL DOCK & CONTROLS HELPER
      ======================================================== */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex flex-col items-center gap-2">
        {/* Movement Hint */}
        {activeDistrict === 'city' && (
          <div className="hidden sm:block text-[11px] font-mono text-gray-400 bg-[#02050e]/80 px-3 py-1 rounded-full border border-gray-800">
            [WASD / ARROWS] TRAVEL STREETS • [DRAG] LOOK • APPROACH BUILDINGS TO ENTER
          </div>
        )}

        {/* Minimal Landmark Quick Jump Dock */}
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-[#030814]/85 border border-[#00ffcc25] backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.8)] overflow-x-auto max-w-[95vw]">
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
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] text-[#020409] shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{d.label}</span>
                <span className="md:hidden">{d.label.slice(0, 4)}</span>
                <span className="text-[9px] font-mono opacity-60">[{idx + 1}]</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ========================================================
          MOBILE ON-SCREEN D-PAD (Only visible on small touch screens in city mode)
      ======================================================== */}
      {activeDistrict === 'city' && (
        <div className="sm:hidden fixed bottom-18 left-4 z-40 pointer-events-auto grid grid-cols-3 gap-1 p-2 rounded-xl bg-[#030814]/80 border border-[#00ffcc25] backdrop-blur-md">
          <div />
          <button
            onTouchStart={() => onSimulateMove?.('w', true)}
            onTouchEnd={() => onSimulateMove?.('w', false)}
            className="p-2.5 rounded bg-[#091b38] text-[#00ffcc] flex items-center justify-center active:bg-[#00ffcc] active:text-black"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div />
          <button
            onTouchStart={() => onSimulateMove?.('a', true)}
            onTouchEnd={() => onSimulateMove?.('a', false)}
            className="p-2.5 rounded bg-[#091b38] text-[#00ffcc] flex items-center justify-center active:bg-[#00ffcc] active:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onTouchStart={() => onSimulateMove?.('s', true)}
            onTouchEnd={() => onSimulateMove?.('s', false)}
            className="p-2.5 rounded bg-[#091b38] text-[#00ffcc] flex items-center justify-center active:bg-[#00ffcc] active:text-black"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onTouchStart={() => onSimulateMove?.('d', true)}
            onTouchEnd={() => onSimulateMove?.('d', false)}
            className="p-2.5 rounded bg-[#091b38] text-[#00ffcc] flex items-center justify-center active:bg-[#00ffcc] active:text-black"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}
