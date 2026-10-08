import React from 'react';
import { ChevronRight, ArrowLeft, DoorOpen, Navigation } from 'lucide-react';
import { DISTRICT_NODES } from './City3D';
import { soundManager } from '../utils/soundManager';

export default function ArrivalOverlay({
  currentDistrictId,
  onEnterDistrict,
  onReturnToCentral
}) {
  const district = DISTRICT_NODES.find((d) => d.id === currentDistrictId) || DISTRICT_NODES[0];

  return (
    <div className="fixed inset-x-0 bottom-24 z-30 pointer-events-none flex justify-center px-4 animate-fadeIn">
      <div className="pointer-events-auto max-w-md w-full p-5 rounded-2xl bg-[#030a1c]/95 border border-[#00ffcc50] shadow-[0_0_45px_rgba(0,255,204,0.3)] backdrop-blur-xl text-center space-y-3">
        {/* District arrival header */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#00ffcc]">
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping" />
          <span className="font-bold tracking-widest">{district.name}</span>
          <span className="px-2 py-0.5 rounded bg-[#00ffcc20] text-[10px] font-black">
            ARRIVED
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-['Orbitron'] text-white tracking-wider">
          {district.name}
        </h3>

        <p className="text-xs font-mono text-gray-300">
          Landmark destination reached. Building entrance online and synchronized.
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playWarp();
              soundManager.playClick();
              onEnterDistrict();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-['Orbitron'] font-bold text-xs sm:text-sm tracking-wider text-[#02050f] bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] hover:shadow-[0_0_30px_rgba(0,255,204,0.7)] transition-all cursor-pointer"
          >
            <DoorOpen className="w-4 h-4 text-[#02050f]" />
            <span>ENTER {district.label.split('—')[1]?.trim() || district.label}</span>
            <ChevronRight className="w-4 h-4 text-[#02050f] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onReturnToCentral();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-mono text-xs text-gray-300 border border-white/10 hover:border-[#00ffcc30] hover:text-white bg-[#071324] transition-all cursor-pointer"
            title="Return to Central Plaza"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CENTRAL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
