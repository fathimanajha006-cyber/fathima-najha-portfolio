import React from 'react';
import { X, MapPin, Compass, Sparkles } from 'lucide-react';
import { CUTE_BUILDINGS } from './City3D';
import { soundManager } from '../utils/soundManager';

export default function CityMapModal({ activeBuilding, onSelectLocation, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 rounded-3xl bg-white/95 border-2 border-sky-100 shadow-[0_20px_50px_rgba(56,189,248,0.25)] text-slate-800 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🗺️</span>
            <div>
              <h3 className="text-lg font-black font-['Outfit'] text-slate-800">
                NAJHA.OS CITY MAP
              </h3>
              <p className="text-xs font-semibold text-sky-500 font-['Quicksand']">
                Tap any building to jump there directly!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top-down Illustrated Map View */}
        <div className="relative w-full h-72 rounded-2xl bg-gradient-to-b from-sky-50 via-emerald-50/50 to-amber-50/30 border border-sky-200/60 p-4 overflow-hidden flex items-center justify-center">
          {/* Subtle grid & fountain */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Central Plaza Badge */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('city');
              onClose();
            }}
            className={`z-10 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-110 cursor-pointer ${
              activeBuilding === 'city' || !activeBuilding
                ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-200'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <span>⛲</span>
            <span>CENTRAL PLAZA</span>
          </button>

          {/* Radial Positioned Buildings on the Map */}
          {/* 1. Education (Top Center) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('education');
              onClose();
            }}
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-2xl bg-indigo-50 border-2 border-indigo-300 text-indigo-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>🎓</span>
            <span>Education</span>
          </button>

          {/* 2. Projects (Top Right) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('projects');
              onClose();
            }}
            className="absolute top-12 right-6 px-3 py-1.5 rounded-2xl bg-cyan-50 border-2 border-cyan-300 text-cyan-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>💻</span>
            <span>Projects</span>
          </button>

          {/* 3. Tech Lab (Top Left) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('lab');
              onClose();
            }}
            className="absolute top-12 left-6 px-3 py-1.5 rounded-2xl bg-purple-50 border-2 border-purple-300 text-purple-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>🧪</span>
            <span>Tech Lab</span>
          </button>

          {/* 4. Experience (Mid Left) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('experience');
              onClose();
            }}
            className="absolute bottom-20 left-4 px-3 py-1.5 rounded-2xl bg-orange-50 border-2 border-orange-300 text-orange-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>💼</span>
            <span>Experience</span>
          </button>

          {/* 5. Achievements (Mid Right) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('vault');
              onClose();
            }}
            className="absolute bottom-20 right-4 px-3 py-1.5 rounded-2xl bg-yellow-50 border-2 border-yellow-400 text-yellow-950 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>🏆</span>
            <span>Achievements</span>
          </button>

          {/* 6. Certifications (Bottom Left) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('certifications');
              onClose();
            }}
            className="absolute bottom-4 left-14 px-3 py-1.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>📜</span>
            <span>Certifications</span>
          </button>

          {/* 7. Contact (Bottom Right) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onSelectLocation('contact');
              onClose();
            }}
            className="absolute bottom-4 right-14 px-3 py-1.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 font-bold text-xs shadow-sm hover:scale-110 transition-transform cursor-pointer flex items-center gap-1"
          >
            <span>📡</span>
            <span>Contact</span>
          </button>
        </div>

        {/* Quick List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
          {CUTE_BUILDINGS.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                soundManager.playClick();
                onSelectLocation(b.id);
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 text-xs font-bold text-slate-700 transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <span className="text-base">{b.emoji}</span>
              <span className="truncate w-full">{b.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
