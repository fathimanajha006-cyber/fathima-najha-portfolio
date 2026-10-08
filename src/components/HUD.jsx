import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  Map,
  Sparkles,
  Home,
  GraduationCap,
  Code2,
  FlaskConical,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

const ICONS = {
  Home: Home,
  GraduationCap: GraduationCap,
  Code2: Code2,
  FlaskConical: FlaskConical,
  Briefcase: Briefcase,
  Trophy: Trophy,
  FileCheck: FileCheck,
  Radio: Radio
};

export default function HUD({
  activeBuilding,
  onSelectLocation,
  onOpenMap,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion
}) {
  const { districts } = portfolioData;
  const currentMeta = districts.find((d) => d.id === activeBuilding) || districts[0];

  // Speech bubble random tips
  const [guideTip, setGuideTip] = useState('Welcome! Click any building to explore ✨');

  return (
    <>
      {/* ========================================================
          TOP-LEFT: BRAND & LOCATION BREADCRUMB
      ======================================================== */}
      <header className="fixed top-4 left-4 z-40 pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-sky-100 shadow-md backdrop-blur-md">
          <span className="text-xl">🌸</span>
          <div>
            <div className="text-xs md:text-sm font-black font-['Outfit'] text-slate-800 tracking-tight flex items-center gap-1.5">
              <span>FATHIMA NAJHA.OS</span>
            </div>
            <div className="text-[11px] font-bold font-['Quicksand'] text-sky-500 uppercase flex items-center gap-1">
              <span>CITY PLAZA</span>
              {activeBuilding && activeBuilding !== 'city' && (
                <>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-pink-500 font-black">{currentMeta.label}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          TOP-RIGHT: CONTROLS (MAP, AUDIO, MOTION)
      ======================================================== */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
        {/* CITY MAP BUTTON */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenMap();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/95 border border-sky-200 text-sky-700 font-['Outfit'] font-black text-xs shadow-md hover:bg-sky-50 transition-all cursor-pointer"
        >
          <span>🗺️</span>
          <span>CITY MAP</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute cozy audio' : 'Mute audio'}
          className="p-2 rounded-2xl bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md hover:bg-slate-50 transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-500" />}
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          title="Toggle Reduced Motion"
          className="p-2 rounded-2xl bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-md hover:bg-slate-50 transition-all cursor-pointer"
        >
          <Eye className={`w-4 h-4 ${reducedMotion ? 'text-amber-500' : ''}`} />
        </button>
      </div>

      {/* ========================================================
          BOTTOM: EASY NAVIGATION DOCK
      ======================================================== */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-[96vw]">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 border-2 border-sky-100 shadow-[0_10px_35px_rgba(148,163,184,0.3)] backdrop-blur-md overflow-x-auto">
          {districts.map((d) => {
            const Icon = ICONS[d.icon] || Home;
            const isActive = activeBuilding === d.id || (!activeBuilding && d.id === 'city');

            return (
              <button
                key={d.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectLocation(d.id);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-['Outfit'] font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-white shadow-md shadow-sky-200 scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span className="text-sm">{d.emoji}</span>
                <span className="hidden md:inline">{d.label}</span>
                <span className="md:hidden">{d.label.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
