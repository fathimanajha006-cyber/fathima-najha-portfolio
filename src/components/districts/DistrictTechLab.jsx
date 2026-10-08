import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Terminal,
  Code,
  Globe,
  Wrench,
  CheckCircle2,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

export default function DistrictTechLab() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSkill, setActiveSkill] = useState(portfolioData.techLab.skills[0]);

  const { categories, skills } = portfolioData.techLab;

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#00ffcc25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#a855f7]">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span>DISTRICT_03 // COMPUTATIONAL MATRIX & RUNTIMES</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            TECH LAB
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-[#061022]/80 p-1.5 rounded-lg border border-[#a855f730]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#a855f7] to-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Floating Holographic Skill Modules Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {filteredSkills.map((skill) => {
            const isSelected = activeSkill.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => {
                  soundManager.playClick();
                  setActiveSkill(skill);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#101b38] border-[#a855f7] shadow-[0_0_22px_rgba(168,85,247,0.35)] scale-[1.03] z-10'
                    : 'bg-[#040916]/85 border-[#a855f720] hover:border-[#a855f760] hover:bg-[#071328]'
                }`}
              >
                {/* Tech badge */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-gray-500 group-hover:text-gray-400">
                    {skill.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping" />
                  )}
                </div>

                <div className="text-base md:text-lg font-bold font-['Orbitron'] text-white">
                  {skill.name}
                </div>

                <div className="text-[11px] font-mono text-[#38bdf8] mt-1">
                  {skill.type}
                </div>

                {/* Subtle cyber corner marker */}
                <div className="absolute bottom-1 right-1 text-[9px] font-mono text-gray-700 group-hover:text-[#a855f7]">
                  #MOD
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Skill Diagnostic Terminal */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-[#061022]/95 border border-[#a855f740] shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#a855f725]">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#a855f7]" />
                <span className="text-xs font-mono tracking-widest text-[#a855f7]">
                  HOLOGRAPHIC INSPECTOR // 0xLAB
                </span>
              </div>
              <span className="text-xs font-mono text-gray-400">
                ACTIVE FOCUS
              </span>
            </div>

            <div>
              <div className="text-2xl md:text-3xl font-extrabold font-['Orbitron'] text-white">
                {activeSkill.name}
              </div>
              <div className="text-xs font-mono text-[#00ffcc] mt-1">
                CATEGORY: {activeSkill.category.toUpperCase()} // TYPE: {activeSkill.type.toUpperCase()}
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
              {activeSkill.desc}
            </p>

            {/* Key Paradigms / Engineering Concepts */}
            <div className="pt-2">
              <div className="text-xs font-mono text-gray-400 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>ARCHITECTURAL CONCEPTS & PROFICIENCIES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeSkill.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-[#030712] border border-[#a855f720] text-xs font-mono flex items-center gap-2 text-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffcc] shrink-0" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Philosophy note */}
          <div className="mt-6 pt-4 border-t border-[#a855f720] text-[11px] font-mono text-gray-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
            <span>Honest skill engineering — evaluated through practical projects and live codebases.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
