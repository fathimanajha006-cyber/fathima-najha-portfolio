import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

export default function WelcomeScreen({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterCity = () => {
    soundManager.playSuccess();
    soundManager.playWarp();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#e0f2fe]/95 via-[#f0f9ff]/90 to-[#fdf4ff]/95 backdrop-blur-md transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative cute clouds & stars */}
      <div className="absolute top-12 left-12 text-3xl animate-bounceSoft">☁️</div>
      <div className="absolute top-20 right-20 text-3xl animate-bounceSoft" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-16 left-24 text-3xl animate-bounceSoft" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute bottom-20 right-28 text-3xl animate-bounceSoft" style={{ animationDelay: '0.5s' }}>🌷</div>

      <div className="relative max-w-xl w-full p-8 md:p-12 rounded-3xl bg-white/95 border-2 border-sky-100 shadow-[0_25px_60px_rgba(56,189,248,0.25)] text-center space-y-6">
        {/* Cute Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-600 font-bold text-xs font-['Quicksand']">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WELCOME TO MY DIGITAL CITY</span>
        </div>

        {/* Brand Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit'] text-slate-800 tracking-tight">
            FATHIMA NAJHA.OS
          </h1>
          <p className="text-base sm:text-lg font-bold font-['Quicksand'] text-sky-500">
            Computer Science Engineer <span className="text-pink-400">•</span> Creative Developer
          </p>
          <p className="text-sm text-slate-500 font-['Quicksand'] font-medium max-w-md mx-auto pt-1">
            "Welcome to my little digital city. Explore my journey, projects and skills."
          </p>
        </div>

        {/* Enter City Button */}
        <div className="pt-2">
          <button
            onClick={handleEnterCity}
            onMouseEnter={() => soundManager.playHover()}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-['Outfit'] text-base font-black tracking-wide text-white bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-500 hover:to-cyan-500 shadow-xl shadow-sky-200 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden"
          >
            <span>ENTER THE CITY</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Footnote */}
        <div className="pt-2 text-xs font-semibold text-slate-400 font-['Quicksand'] flex items-center justify-center gap-1">
          <span>Made with curiosity & code</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-current" />
        </div>
      </div>
    </div>
  );
}
