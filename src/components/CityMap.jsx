import React from 'react';
import { X, MapPin, Compass, Sparkles, Navigation } from 'lucide-react';
import { DISTRICT_NODES } from './City3D';
import { soundManager } from '../utils/soundManager';

export default function CityMap({ currentDistrictId, onSelectDestination, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-[#030918]/95 border border-[#00ffcc45] shadow-[0_0_50px_rgba(0,255,204,0.2)] text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#00ffcc25]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] animate-ping" />
            <div>
              <h3 className="text-lg md:text-xl font-bold font-['Orbitron'] text-white">
                HOLOGRAPHIC CITY SCHEMATIC
              </h3>
              <p className="text-xs font-mono text-[#00ffcc]">
                SELECT DISTRICT TO INITIATE CINEMATIC TRAVEL
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded bg-[#091b38] border border-[#00ffcc30] hover:border-[#00ffcc] text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top-Down Holographic Radar Matrix */}
        <div className="relative w-full h-80 rounded-xl bg-[#020612] border border-[#00ffcc25] p-4 overflow-hidden flex items-center justify-center">
          {/* Cyber Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffcc08_1px,transparent_1px),linear-gradient(to_bottom,#00ffcc08_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Radar scan sweep line */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,255,204,0.06)_0%,transparent_70%)]" />

          {/* Central Core: NAJHA CENTRAL */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectDestination('core');
              onClose();
            }}
            className={`z-10 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              currentDistrictId === 'core'
                ? 'bg-[#00ffcc25] border-[#00ffcc] text-[#00ffcc] shadow-[0_0_20px_rgba(0,255,204,0.4)]'
                : 'bg-[#07152b] border-[#00ffcc30] text-gray-300 hover:border-[#00ffcc]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#00ffcc]" />
            <span>NAJHA CENTRAL (PLAZA)</span>
            {currentDistrictId === 'core' && (
              <span className="text-[10px] text-[#ff0055] font-black">[HERE]</span>
            )}
          </button>

          {/* Districts mapped onto radar */}
          {DISTRICT_NODES.filter((d) => d.id !== 'core').map((d) => {
            const isCurrent = currentDistrictId === d.id;
            // Map 3D pos (-50 to 50) onto radar container percentages
            const leftPct = 50 + (d.pos.x / 110) * 80;
            const topPct = 50 + (d.pos.z / 150) * 75;

            return (
              <button
                key={d.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectDestination(d.id);
                  onClose();
                }}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-[11px] font-mono font-bold border transition-all cursor-pointer whitespace-nowrap group hover:scale-110 z-20 ${
                  isCurrent
                    ? 'bg-[#00ffcc30] border-[#00ffcc] text-[#00ffcc] shadow-[0_0_25px_rgba(0,255,204,0.5)] scale-105'
                    : 'bg-[#050f22] border-[#00ffcc25] text-gray-300 hover:border-[#00ffcc] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.signColor }} />
                  <span>{d.label}</span>
                  {isCurrent && <span className="text-[#ff0055] text-[9px]">[YOU ARE HERE]</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick District Grid selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
          {DISTRICT_NODES.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                soundManager.playClick();
                onSelectDestination(d.id);
                onClose();
              }}
              className={`p-2 rounded bg-[#040e22] border text-left transition-all cursor-pointer truncate ${
                currentDistrictId === d.id
                  ? 'border-[#00ffcc] text-[#00ffcc]'
                  : 'border-[#00ffcc20] text-gray-400 hover:border-[#00ffcc] hover:text-white'
              }`}
            >
              <div className="text-[10px] text-gray-500">{d.num}</div>
              <div className="font-bold truncate">{d.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
