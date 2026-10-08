import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Play,
  RotateCcw,
  Calendar,
  Award,
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  Send,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

export default function BuildingInteriorModal({ activeBuilding, onClose }) {
  const { profile, projects, techLab, experience, achievements, certifications, education } =
    portfolioData;

  // Project 1: AgriQueue State
  const [agriStep, setAgriStep] = useState(0);
  const [agriTokens, setAgriTokens] = useState([
    { id: 'AQ-9081', crop: 'Organic Tomato', slot: '09:30 AM', status: 'Passed Weighbridge' },
    { id: 'AQ-9082', crop: 'Paddy (Grade A)', slot: '10:00 AM', status: 'In Inspection' }
  ]);

  // Project 2: I/O Comparison State
  const [ioMode, setIoMode] = useState('programmed');
  const [ioRunning, setIoRunning] = useState(false);
  const [ioProgress, setIoProgress] = useState(0);

  // Tech Lab State
  const [activeSkill, setActiveSkill] = useState(techLab.skills[0]);

  // Contact Form State
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  // Trigger simulated I/O data transfer
  const handleRunIo = () => {
    if (ioRunning) return;
    soundManager.playClick();
    setIoRunning(true);
    setIoProgress(0);

    const speed = ioMode === 'dma' ? 25 : ioMode === 'interrupt' ? 60 : 110;
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setIoProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIoRunning(false);
        soundManager.playSuccess();
      }
    }, speed);
  };

  const handleSpawnToken = () => {
    soundManager.playClick();
    const crops = ['Paddy', 'Organic Tomato', 'Sweet Corn', 'Spices'];
    const newId = `AQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setAgriTokens((prev) => [
      { id: newId, crop: crops[Math.floor(Math.random() * crops.length)], slot: '11:00 AM', status: 'Token Issued' },
      ...prev.slice(0, 2)
    ]);
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    soundManager.playSuccess();
    setSentMessage(true);
    const sub = encodeURIComponent(`Hello from ${contactName || 'Collaborator'}`);
    const body = encodeURIComponent(contactMessage);
    window.open(`mailto:${profile.email}?subject=${sub}&body=${body}`, '_blank');
  };

  const handleCelebrate = () => {
    soundManager.playSuccess();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#f472b6', '#facc15', '#4ade80']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/35 backdrop-blur-md animate-fadeIn pt-16 pb-18">
      <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-white/98 border-2 border-sky-100 shadow-[0_25px_60px_rgba(56,189,248,0.25)] flex flex-col overflow-hidden text-slate-800">
        {/* ========================================================
            TOP BAR: BACK TO CITY PLAZA
        ======================================================== */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-100 bg-sky-50/50 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 font-['Outfit'] font-black text-xs shadow-sm transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← BACK TO CITY PLAZA</span>
          </button>

          <div className="flex items-center gap-2 font-['Outfit'] font-bold text-xs text-slate-500">
            <span>INSIDE:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 uppercase font-black">
              {activeBuilding}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            SCROLLABLE CONTENT AREA
        ======================================================== */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* ========================================================
              1. EDUCATION BUILDING
          ======================================================== */}
          {activeBuilding === 'education' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-100 flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-indigo-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                    <span>🎓</span>
                    <span>EDUCATION TOWER</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-indigo-950">
                    Academic Journey
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-700 font-['Quicksand'] font-semibold mt-1">
                    Foundational engineering, computer science fundamentals & mathematics.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold font-['Quicksand'] text-indigo-600 px-2.5 py-0.5 rounded-full bg-indigo-50">
                          {edu.period}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black font-['Outfit'] text-slate-800 mt-1.5">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-bold text-slate-600 font-['Quicksand']">
                          {edu.institution}
                        </p>
                        {edu.university && (
                          <p className="text-xs text-slate-400 font-medium">{edu.university}</p>
                        )}
                      </div>

                      <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-200/70 text-right">
                        <div className="text-[10px] font-bold text-indigo-400 font-['Quicksand']">SCORE / CGPA</div>
                        <div className="text-lg sm:text-xl font-black font-['Outfit'] text-indigo-600">
                          {edu.score}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="text-xs text-slate-600 flex items-start gap-2 font-['Quicksand'] font-medium">
                          <span className="text-indigo-500 font-bold">🌸</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. PROJECTS BUILDING
          ======================================================== */}
          {activeBuilding === 'projects' && (
            <div className="space-y-8">
              <div className="p-6 rounded-3xl bg-cyan-50/60 border border-cyan-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-cyan-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>💻</span>
                  <span>CREATIVE TECHNOLOGY STUDIO</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-cyan-950">
                  Featured Projects
                </h2>
                <p className="text-xs sm:text-sm text-cyan-700 font-['Quicksand'] font-semibold mt-1">
                  Explore full-stack applications and interactive systems simulations.
                </p>
              </div>

              {/* PROJECT 1: AGRIQUEUE */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-cyan-600 px-3 py-1 rounded-full bg-cyan-50">
                      PROJECT 01 • SMART FARM PROCUREMENT
                    </span>
                    <h3 className="text-2xl font-black font-['Outfit'] text-slate-800 mt-2">
                      AGRIQUEUE
                    </h3>
                    <p className="text-sm font-bold text-slate-500 font-['Quicksand']">
                      Smart Farm Procurement Management System
                    </p>
                  </div>

                  <a
                    href="https://github.com/fathimanajha006-cyber"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 text-white font-['Outfit'] font-black text-xs hover:bg-slate-800 transition-all"
                  >
                    <span>VIEW ON GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-['Quicksand'] leading-relaxed">
                  A hackathon-ready smart farm procurement system engineered to reduce waiting hours and unnecessary travel for farmers at agricultural mandis.
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {projects[0].stack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-xl bg-cyan-50 text-cyan-700 text-xs font-bold font-['Outfit']">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Interactive Visual Pipeline (Farmer -> Slot -> Token -> Queue -> Procurement -> AI Forecast) */}
                <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-['Outfit'] text-slate-700">
                      INTERACTIVE FLOW PIPELINE (CLICK TO INSPECT):
                    </span>
                    <button
                      onClick={handleSpawnToken}
                      className="text-xs font-bold font-['Quicksand'] text-cyan-700 px-3 py-1 rounded-xl bg-white shadow-sm hover:bg-cyan-50 cursor-pointer"
                    >
                      + Spawn Test Token
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {[
                      { emoji: '👨🌾', label: 'FARMER' },
                      { emoji: '📅', label: 'SLOT' },
                      { emoji: '🎟️', label: 'TOKEN' },
                      { emoji: '👥', label: 'QUEUE' },
                      { emoji: '🏭', label: 'PROCUREMENT' },
                      { emoji: '🤖', label: 'AI FORECAST' }
                    ].map((step, idx) => (
                      <button
                        key={step.label}
                        onClick={() => {
                          soundManager.playClick();
                          setAgriStep(idx);
                        }}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          agriStep === idx
                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-md scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300'
                        }`}
                      >
                        <div className="text-xl mb-1">{step.emoji}</div>
                        <div className="text-[11px] font-black font-['Outfit']">{step.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Step Description Card */}
                  <div className="p-4 rounded-xl bg-white border border-sky-100 text-xs font-['Quicksand'] font-medium text-slate-600">
                    {agriStep === 0 && '👨🌾 Farmer requests booking via mobile app, reducing chaotic queue buildup at mandi gates.'}
                    {agriStep === 1 && '📅 System checks weighbridge bandwidth and allocates an optimal arrival time slot.'}
                    {agriStep === 2 && '🎟️ Generates a tamper-proof digital QR token verifying farmer identity, crop category, and lot size.'}
                    {agriStep === 3 && '👥 Live WebSocket queue notifies farmers with arrival alerts so they only travel when their batch is called.'}
                    {agriStep === 4 && '🏭 Weighbridge integration, quality grading evaluation, and automated digital ledger updates.'}
                    {agriStep === 5 && '🤖 Python AI machine learning model forecasting seasonal crop arrival patterns and storage capacity.'}
                  </div>
                </div>
              </div>

              {/* PROJECT 2: I/O DATA TRANSFER SIMULATION */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 px-3 py-1 rounded-full bg-indigo-50">
                      PROJECT 02 • SYSTEMS ARCHITECTURE IN C
                    </span>
                    <h3 className="text-2xl font-black font-['Outfit'] text-slate-800 mt-2">
                      I/O DATA TRANSFER COMPARISON
                    </h3>
                    <p className="text-sm font-bold text-slate-500 font-['Quicksand']">
                      Interactive Hardware Simulator: Programmed vs Interrupt vs DMA
                    </p>
                  </div>

                  <button
                    onClick={handleRunIo}
                    disabled={ioRunning}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-['Outfit'] font-black text-xs shadow-md hover:opacity-90 cursor-pointer disabled:opacity-50"
                  >
                    {ioRunning ? 'SIMULATING...' : '▶ START TRANSFER'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'programmed', title: 'PROGRAMMED I/O', note: '100% Busy Polling', color: 'rose' },
                    { id: 'interrupt', title: 'INTERRUPT-DRIVEN', note: 'IRQ Context Switch', color: 'amber' },
                    { id: 'dma', title: 'DMA BURST', note: '2% CPU (High Speed)', color: 'emerald' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        soundManager.playClick();
                        setIoMode(m.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        ioMode === m.id
                          ? 'bg-indigo-50 border-indigo-400 shadow-sm ring-2 ring-indigo-200'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-black font-['Outfit'] text-slate-800">{m.title}</div>
                      <div className="text-[11px] font-bold font-['Quicksand'] text-slate-500 mt-0.5">{m.note}</div>
                    </button>
                  ))}
                </div>

                {/* Hardware diagram */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-base">🧠</div>
                    <div className="text-xs font-black font-['Outfit'] mt-1">CPU CORE</div>
                    <div className="text-[10px] text-slate-500 font-['Quicksand']">Registers & ALU</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-base">⚡</div>
                    <div className="text-xs font-black font-['Outfit'] mt-1">SYSTEM BUS</div>
                    <div className="text-[10px] text-slate-500 font-['Quicksand']">Data & Address</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="text-base">💾</div>
                    <div className="text-xs font-black font-['Outfit'] mt-1">MEMORY (RAM)</div>
                    <div className="text-[10px] text-slate-500 font-['Quicksand']">Main Storage</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold font-['Quicksand'] text-slate-500">
                    <span>Transfer Progress:</span>
                    <span className="text-indigo-600">{ioProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-150 rounded-full"
                      style={{ width: `${ioProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              3. TECH LAB BUILDING
          ======================================================== */}
          {activeBuilding === 'lab' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-purple-50/60 border border-purple-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-purple-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>🧪</span>
                  <span>COZY SCIENCE & TECH LAB</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-purple-950">
                  Skills & Tools Matrix
                </h2>
                <p className="text-xs sm:text-sm text-purple-700 font-['Quicksand'] font-semibold mt-1">
                  Click any technology object to read what I build with it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Skill tiles */}
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {techLab.skills.map((s) => {
                    const isSelected = activeSkill.name === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => {
                          soundManager.playClick();
                          setActiveSkill(s);
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-500 text-white border-purple-500 shadow-md scale-105'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-400 font-['Quicksand']">{s.badge}</div>
                        <div className="text-base font-black font-['Outfit'] mt-1">{s.name}</div>
                        <div className="text-[11px] font-medium opacity-80">{s.type}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Skill Inspector */}
                <div className="md:col-span-5 p-6 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-purple-600 px-2.5 py-0.5 rounded-full bg-purple-100 font-['Outfit']">
                      SKILL OVERVIEW
                    </span>
                    <h3 className="text-2xl font-black font-['Outfit'] text-slate-800 mt-2">
                      {activeSkill.name}
                    </h3>
                    <p className="text-xs font-bold font-['Quicksand'] text-slate-400 mt-0.5">
                      CATEGORY: {activeSkill.category.toUpperCase()}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-['Quicksand'] mt-3 leading-relaxed font-medium">
                      {activeSkill.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <div className="text-xs font-black font-['Outfit'] text-slate-700 mb-2">KEY CONCEPTS:</div>
                      <div className="space-y-1">
                        {activeSkill.keyConcepts.map((k, i) => (
                          <div key={i} className="text-xs font-['Quicksand'] font-semibold text-slate-600 flex items-center gap-1.5">
                            <span className="text-purple-500">✨</span>
                            <span>{k}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              4. EXPERIENCE BUILDING
          ======================================================== */}
          {activeBuilding === 'experience' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-orange-50/60 border border-orange-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-orange-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>💼</span>
                  <span>CORPORATE OFFICE TOWER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-orange-950">
                  Internships & Industry Experience
                </h2>
                <p className="text-xs sm:text-sm text-orange-700 font-['Quicksand'] font-semibold mt-1">
                  Practical exposure, mobile development sprints, and engineering practices.
                </p>
              </div>

              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold font-['Quicksand'] text-orange-600 px-3 py-1 rounded-full bg-orange-50">
                          {exp.company}
                        </span>
                        <h3 className="text-xl font-black font-['Outfit'] text-slate-800 mt-2">
                          {exp.role}
                        </h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold font-['Quicksand'] text-slate-600">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-['Quicksand'] leading-relaxed font-medium">
                      {exp.desc}
                    </p>

                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="text-xs text-slate-600 font-['Quicksand'] font-medium flex items-start gap-2">
                          <span className="text-orange-500 font-bold">›</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              5. ACHIEVEMENTS BUILDING
          ======================================================== */}
          {activeBuilding === 'vault' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-yellow-50/60 border border-yellow-200/70">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-yellow-800 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>🏆</span>
                  <span>GOLDEN TROPHY TOWER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-yellow-950">
                  Hackathons & Honors
                </h2>
                <p className="text-xs sm:text-sm text-yellow-800 font-['Quicksand'] font-semibold mt-1">
                  Competitive hackathon awards and innovation recognition.
                </p>
              </div>

              <div className="space-y-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    onClick={handleCelebrate}
                    className="p-6 rounded-3xl bg-white border-2 border-yellow-200/80 hover:border-yellow-400 shadow-sm transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-2xl bg-yellow-100 text-yellow-800 text-2xl group-hover:scale-110 transition-transform">
                        🏆
                      </div>
                      <div>
                        <div className="text-xs font-bold text-yellow-700 font-['Quicksand']">
                          {ach.year} • {ach.badgeType}
                        </div>
                        <h3 className="text-xl font-black font-['Outfit'] text-slate-800 mt-0.5">
                          {ach.title}
                        </h3>
                        <div className="text-sm font-black font-['Outfit'] text-amber-600 mt-1">
                          AWARD: {ach.award}
                        </div>
                        <div className="text-xs font-semibold text-slate-400 font-['Quicksand']">
                          {ach.institution}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-['Quicksand'] font-medium pt-2 border-t border-slate-100">
                      {ach.desc}
                    </p>

                    <div className="text-xs font-bold text-yellow-600 font-['Quicksand']">
                      🎉 Tap to celebrate trophy unlock!
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              6. CERTIFICATIONS BUILDING
          ======================================================== */}
          {activeBuilding === 'certifications' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>📜</span>
                  <span>CUTE LIBRARY ARCHIVE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-emerald-950">
                  Certifications & Workshops
                </h2>
                <p className="text-xs sm:text-sm text-emerald-700 font-['Quicksand'] font-semibold mt-1">
                  Verified credentials and technical workshops completed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold font-['Quicksand'] text-slate-400 mb-1">
                        <span>{c.year}</span>
                        <span className="text-emerald-600">{c.type}</span>
                      </div>
                      <h4 className="text-sm font-black font-['Outfit'] text-slate-800 leading-snug">
                        {c.title}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-500 font-['Quicksand']">
                      {c.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              7. CONTACT BUILDING
          ======================================================== */}
          {activeBuilding === 'contact' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-700 text-xs font-bold font-['Quicksand'] mb-2 shadow-sm">
                  <span>📡</span>
                  <span>COMMUNICATION TOWER</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-rose-950">
                  "LET'S BUILD SOMETHING TOGETHER."
                </h2>
                <p className="text-xs sm:text-sm text-rose-700 font-['Quicksand'] font-semibold mt-1">
                  Have an internship, project, or friendly hello? Connect directly!
                </p>
              </div>

              {/* Direct channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-rose-300 text-left transition-all cursor-pointer"
                >
                  <div className="text-2xl mb-2">✉️</div>
                  <div className="text-xs font-bold text-slate-400 font-['Quicksand']">EMAIL</div>
                  <div className="text-sm font-black font-['Outfit'] text-slate-800 truncate">
                    {profile.email}
                  </div>
                  <div className="text-xs font-bold text-rose-500 font-['Quicksand'] mt-1">
                    {copiedEmail ? 'Copied to clipboard!' : 'Tap to copy →'}
                  </div>
                </button>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-400 text-left transition-all"
                >
                  <div className="text-2xl mb-2">🐙</div>
                  <div className="text-xs font-bold text-slate-400 font-['Quicksand']">GITHUB</div>
                  <div className="text-sm font-black font-['Outfit'] text-slate-800 truncate">
                    {profile.githubHandle}
                  </div>
                  <div className="text-xs font-bold text-sky-500 font-['Quicksand'] mt-1">
                    View profile & code →
                  </div>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 text-left transition-all"
                >
                  <div className="text-2xl mb-2">💼</div>
                  <div className="text-xs font-bold text-slate-400 font-['Quicksand']">LINKEDIN</div>
                  <div className="text-sm font-black font-['Outfit'] text-slate-800 truncate">
                    {profile.linkedinHandle}
                  </div>
                  <div className="text-xs font-bold text-indigo-500 font-['Quicksand'] mt-1">
                    Connect on LinkedIn →
                  </div>
                </a>
              </div>

              {/* Message form */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
                <h3 className="text-base font-black font-['Outfit'] text-slate-800">
                  Send a Quick Friendly Message
                </h3>
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-['Quicksand'] font-semibold focus:outline-none focus:border-rose-400"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-['Quicksand'] font-semibold focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Hello Fathima! I loved your portfolio..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-['Quicksand'] font-medium focus:outline-none focus:border-rose-400"
                  />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-semibold text-slate-400 font-['Quicksand']">
                      Direct mail protocol
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-['Outfit'] font-black text-xs shadow-md shadow-rose-200 transition-all cursor-pointer"
                    >
                      SEND MESSAGE 💌
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
