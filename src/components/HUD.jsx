import React from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  Compass,
  MapPin,
  FastForward,
  Navigation,
  ExternalLink,
  ChevronRight,
  User,
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio
} from 'lucide-react';
import { DISTRICT_NODES } from './City3D';
import { soundManager } from '../utils/soundManager';

const ICON_MAP = {
  core: Compass,
  identity: User,
  education: GraduationCap,
  projects: Code2,
  lab: Cpu,
  experience: Briefcase,
  vault: Trophy,
  certifications: FileCheck,
  contact: Radio
};

export default function HUD({
  currentDistrictId,
  isTraveling,
  travelProgress,
  targetDistrictId,
  onSelectDestination,
  onSkipTravel,
  onOpenMap,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion
}) {
  const currentDistrict = DISTRICT_NODES.find((d) => d.id === currentDistrictId) || DISTRICT_NODES[0];
  const targetDistrict = DISTRICT_NODES.find((d) => d.id === targetDistrictId) || DISTRICT_NODES[0];

  return (
    <>
      {/* ========================================================
          TOP-LEFT: BRAND IDENTITY & CURRENT LOCATION
      ======================================================== */}
      <header className="fixed top-4 left-4 z-40 pointer-events-auto">
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#030918]/85 border border-[#00ffcc30] backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] animate-ping" />
          <div className="text-left font-['Orbitron']">
            <div className="text-xs md:text-sm font-black text-white tracking-widest">
              FATHIMA NAJHA.OS
            </div>
            <div className="text-[10px] font-mono text-[#00ffcc] tracking-wider">
              // KERNEL 4.1 • LOC: {currentDistrict.label}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          TOP-RIGHT: CONTROLS ([ CITY MAP ], MOTION, AUDIO)
      ======================================================== */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
        {/* CITY MAP BUTTON */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenMap();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#030918]/90 border border-[#00ffcc40] text-[#00ffcc] hover:bg-[#00ffcc20] font-mono text-xs font-bold tracking-wider shadow-md transition-all cursor-pointer"
        >
          <span>[ CITY MAP ]</span>
        </button>

        {/* Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          title="Toggle Reduced Motion"
          className={`p-2 rounded-lg border backdrop-blur-md text-xs font-mono transition-all cursor-pointer ${
            reducedMotion
              ? 'bg-amber-950/70 border-amber-500 text-amber-300'
              : 'bg-[#030918]/85 border-[#00ffcc25] text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className={`p-2 rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
            !isMuted
              ? 'bg-[#00ffcc20] border-[#00ffcc] text-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
              : 'bg-[#030918]/85 border-[#00ffcc25] text-gray-400 hover:text-white'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ========================================================
          CENTER: TRANSIT TRAVEL HUD (DURING TRAVEL)
      ======================================================== */}
      {isTraveling && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-full max-w-md px-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-[#030a1c]/95 border border-[#00ffcc50] shadow-[0_0_35px_rgba(0,255,204,0.3)] backdrop-blur-xl text-center space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#00ffcc]">
              <span className="flex items-center gap-1.5 font-bold">
                <Navigation className="w-3.5 h-3.5 animate-pulse" />
                <span>TRANSIT IN PROGRESS: {targetDistrict.name}</span>
              </span>
              <button
                onClick={onSkipTravel}
                className="px-2 py-0.5 rounded bg-[#091b38] border border-[#00ffcc40] hover:bg-[#00ffcc25] text-[10px] text-white cursor-pointer"
              >
                [ SKIP TRAVEL ]
              </button>
            </div>

            {/* Travel Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#02050f] border border-[#00ffcc30] p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00ffcc] via-[#38bdf8] to-[#00e5ff] transition-all duration-100"
                style={{ width: `${travelProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          BOTTOM: ELEGANT NAVIGATION DECK
      ======================================================== */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-[96vw]">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#020716]/90 border border-[#00ffcc30] backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-x-auto">
          {DISTRICT_NODES.map((d) => {
            const Icon = ICON_MAP[d.id] || Compass;
            const isActive = currentDistrictId === d.id && !isTraveling;

            return (
              <button
                key={d.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectDestination(d.id);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] text-[#02050f] shadow-[0_0_15px_rgba(0,255,204,0.4)] scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{d.label}</span>
                <span className="md:hidden">{d.label.slice(0, 5)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
