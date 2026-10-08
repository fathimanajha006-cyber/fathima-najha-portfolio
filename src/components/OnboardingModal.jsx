import React from 'react';
import { Sparkles, Check, Compass, Hand, Map } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

export default function OnboardingModal({ onDismiss }) {
  const handleAcknowledge = () => {
    soundManager.playSuccess();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-7 rounded-3xl bg-white/98 border-2 border-sky-100 shadow-[0_20px_50px_rgba(56,189,248,0.3)] text-slate-800 space-y-6 text-center">
        {/* Flower / Greeting Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-600 font-bold text-xs font-['Quicksand']">
          <span>WELCOME TO NAJHA.OS 🌷</span>
        </div>

        <div>
          <h3 className="text-2xl font-black font-['Outfit'] text-slate-800 tracking-tight">
            Explore My Digital City
          </h3>
          <p className="text-sm text-slate-500 font-['Quicksand'] mt-1 font-semibold">
            Every building tells a part of my story, projects, and skills!
          </p>
        </div>

        {/* How to explore guides */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
            <span className="text-2xl p-2 rounded-xl bg-white shadow-sm">🖱️</span>
            <div>
              <div className="text-xs font-bold text-slate-800 font-['Outfit']">DRAG / SWIPE</div>
              <div className="text-xs text-slate-500 font-['Quicksand']">Gently look around the cozy 3D city</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="text-2xl p-2 rounded-xl bg-white shadow-sm">👆</span>
            <div>
              <div className="text-xs font-bold text-slate-800 font-['Outfit']">CLICK / TAP</div>
              <div className="text-xs text-slate-500 font-['Quicksand']">Tap any building to fly over and explore</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-2xl p-2 rounded-xl bg-white shadow-sm">🗺️</span>
            <div>
              <div className="text-xs font-bold text-slate-800 font-['Outfit']">MAP & DOCK</div>
              <div className="text-xs text-slate-500 font-['Quicksand']">Jump directly anywhere using bottom buttons</div>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="pt-2">
          <button
            onClick={handleAcknowledge}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-500 hover:to-cyan-500 text-white font-['Outfit'] font-black text-sm tracking-wider shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            GOT IT — EXPLORE CITY ✨
          </button>
        </div>
      </div>
    </div>
  );
}
