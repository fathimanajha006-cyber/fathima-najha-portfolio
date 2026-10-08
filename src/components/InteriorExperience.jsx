import React, { useState } from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  ArrowLeft,
  Calendar,
  Sparkles,
  Zap,
  Play,
  Activity,
  Layers,
  Database,
  TrendingUp,
  Server,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Info,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

export default function InteriorExperience({ activeDistrict, onReturnToCity }) {
  // Projects State
  const [activeProjectTab, setActiveProjectTab] = useState('agriqueue');
  const [agriActiveNode, setAgriActiveNode] = useState(0);
  const [agriTokens, setAgriTokens] = useState([
    { id: 'AQ-9042', crop: 'Paddy (Grade A)', slot: '09:30 AM', status: 'INSPECTION PASSED' },
    { id: 'AQ-9043', crop: 'Organic Tomato', slot: '10:00 AM', status: 'IN WEIGHBRIDGE' },
    { id: 'AQ-9044', crop: 'Winter Wheat', slot: '10:30 AM', status: 'TOKEN ISSUED' }
  ]);
  const [ioMode, setIoMode] = useState('programmed');
  const [ioRunning, setIoRunning] = useState(false);
  const [ioProgress, setIoProgress] = useState(0);
  const [ioPacketState, setIoPacketState] = useState('Standby');

  // Tech Lab State
  const [activeSkill, setActiveSkill] = useState(portfolioData.techLab.skills[0]);

  // Certifications Modal State
  const [selectedCert, setSelectedCert] = useState(null);

  // Contact Form State
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [transmitState, setTransmitState] = useState('idle');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const { profile, projects, techLab, experience, achievements, certifications, education } =
    portfolioData;

  // I/O Simulation Handler
  const handleStartIo = () => {
    if (ioRunning) return;
    soundManager.playClick();
    setIoRunning(true);
    setIoProgress(0);

    const speed = ioMode === 'programmed' ? 120 : ioMode === 'interrupt' ? 70 : 25;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      setIoProgress(progress);

      if (ioMode === 'programmed') {
        if (progress < 40) setIoPacketState('I/O Device -> CPU Accumulator');
        else if (progress < 85) setIoPacketState('CPU Busy-Wait Loop -> Memory (RAM)');
        else setIoPacketState('Accumulator Verified');
      } else if (ioMode === 'interrupt') {
        if (progress < 30) setIoPacketState('Device Asserts IRQ Signal');
        else if (progress < 70) setIoPacketState('CPU Context Switches to ISR');
        else setIoPacketState('ISR Transfers Byte to RAM');
      } else {
        if (progress < 20) setIoPacketState('CPU Initializes DMA Registers');
        else if (progress < 85) setIoPacketState('DMA Controller Direct Bus Burst -> RAM');
        else setIoPacketState('DMA Interrupt on Completion (CPU Unaffected)');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIoRunning(false);
        soundManager.playSuccess();
      }
    }, speed);
  };

  const handleSpawnAgriToken = () => {
    soundManager.playClick();
    const crops = ['Paddy (Grade A)', 'Organic Tomato', 'Spices & Cardamom', 'Sweet Corn'];
    const id = `AQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setAgriTokens((prev) => [
      { id, crop: crops[Math.floor(Math.random() * crops.length)], slot: '11:15 AM', status: 'TOKEN ISSUED' },
      ...prev.slice(0, 3)
    ]);
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTransmitMessage = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    soundManager.playClick();
    setTransmitState('transmitting');
    setTimeout(() => {
      soundManager.playSuccess();
      setTransmitState('sent');
      const sub = encodeURIComponent(`Inquiry from ${contactForm.name || 'Collaborator'} via FATHIMA.OS`);
      const body = encodeURIComponent(contactForm.message);
      window.open(`mailto:${profile.email}?subject=${sub}&body=${body}`, '_blank');
    }, 1200);
  };

  const handleCelebrate = () => {
    soundManager.playSuccess();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ffcc', '#f59e0b', '#38bdf8']
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between text-white font-sans animate-fadeIn">
      {/* ========================================================
          TOP ACTION BAR (RETURN TO CITY & DISTRICT TITLE)
      ======================================================== */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#00ffcc25]">
        <button
          onClick={() => {
            soundManager.playClick();
            onReturnToCity();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00ffcc15] border border-[#00ffcc50] hover:bg-[#00ffcc30] text-[#00ffcc] hover:text-white text-xs font-mono font-bold tracking-wider transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>[ RETURN TO CITY STREETS ]</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping" />
          <span className="text-white font-bold tracking-wider">
            INSIDE: {activeDistrict.toUpperCase()} FACILITY
          </span>
        </div>
      </div>

      {/* ========================================================
          DISTRICT INTERIOR 1: EDUCATION TOWER
      ======================================================== */}
      {activeDistrict === 'education' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#040e1d]/90 border border-[#38bdf840] shadow-[0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#38bdf8]">
              <GraduationCap className="w-4 h-4" />
              <span>FUTURISTIC UNIVERSITY TOWER // ACADEMIC ATRIUM</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Orbitron'] text-white mt-2">
              EDUCATION ARCHIVE
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Rigorous foundations in Computer Science & Engineering, mathematics, and systems design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#030914]/90 border border-[#38bdf825] hover:border-[#38bdf8] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-[#38bdf8]">{edu.period}</span>
                    <span className="px-2 py-0.5 rounded bg-[#38bdf815] text-[#38bdf8] border border-[#38bdf830]">
                      {edu.score}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white group-hover:text-[#38bdf8] transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-semibold text-gray-300 font-['Rajdhani'] mt-1">
                    {edu.institution}
                  </div>
                  {edu.university && (
                    <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                      {edu.university}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800 space-y-1.5">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="text-xs text-gray-300 flex items-start gap-1.5 font-sans">
                      <span className="text-[#00ffcc] font-bold">›</span>
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
          DISTRICT INTERIOR 2: PROJECTS RESEARCH FACILITY
      ======================================================== */}
      {activeDistrict === 'projects' && (
        <div className="space-y-6">
          {/* Project Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#040e1d]/90 border border-[#00ffcc30]">
            <div>
              <div className="text-xs font-mono text-[#00ffcc] flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                <span>GIANT TECHNOLOGY RESEARCH FACILITY // SYSTEMS LAB</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-['Orbitron'] text-white mt-1">
                PROJECT DISTRICT
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#02050e] p-1 rounded-lg border border-[#00ffcc25]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveProjectTab('agriqueue');
                }}
                className={`px-4 py-2 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
                  activeProjectTab === 'agriqueue'
                    ? 'bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                01. AGRIQUEUE
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveProjectTab('io');
                }}
                className={`px-4 py-2 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
                  activeProjectTab === 'io'
                    ? 'bg-gradient-to-r from-[#38bdf8] to-[#a855f7] text-[#02040a] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                02. I/O DATA TRANSFER
              </button>
            </div>
          </div>

          {/* PROJECT 1: AGRIQUEUE INTERACTIVE PIPELINE */}
          {activeProjectTab === 'agriqueue' && (
            <div className="space-y-5">
              <div className="p-6 rounded-xl bg-[#050e1f]/90 border border-[#00ffcc35] backdrop-blur-xl">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30]">
                      HACKATHON-READY SMART PROCUREMENT
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black font-['Orbitron'] text-white mt-1.5">
                      AGRIQUEUE
                    </h3>
                    <p className="text-sm font-semibold font-['Rajdhani'] text-[#38bdf8]">
                      Smart Farm Procurement Management System
                    </p>
                    <p className="max-w-2xl text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
                      Eradicates mandi waiting lines, traffic jams, and unnecessary farmer travel through dynamic slot booking, encrypted QR tokens, and real-time live queue progression.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-w-xs">
                    {projects[0].stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#091b38] text-[#00ffcc] border border-[#00ffcc20]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#00ffcc20]">
                  <a
                    href="https://github.com/fathimanajha006-cyber"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#00ffcc20] border border-[#00ffcc50] hover:bg-[#00ffcc40] text-xs font-mono text-[#00ffcc] transition-all cursor-pointer"
                  >
                    <span>VIEW REPOSITORY ON GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleSpawnAgriToken}
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#38bdf820] border border-[#38bdf850] hover:bg-[#38bdf840] text-xs font-mono text-[#38bdf8] transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>GENERATE SIMULATED TOKEN</span>
                  </button>
                </div>
              </div>

              {/* Interactive Node Sequence (FARMER -> SLOT -> TOKEN -> QUEUE -> PROCUREMENT -> AI FORECAST) */}
              <div className="p-6 rounded-xl bg-[#030814]/95 border border-[#00ffcc40]">
                <div className="text-xs font-mono text-gray-400 mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#00ffcc]" />
                  <span>INTERACTIVE CONTROL CENTER PIPELINE // CLICK ANY NODE TO INSPECT</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {projects[0].flowNodes.map((node, idx) => {
                    const isSelected = agriActiveNode === idx;
                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          soundManager.playClick();
                          setAgriActiveNode(idx);
                        }}
                        className={`p-3 rounded-lg border text-center transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#0a1e3d] border-[#00ffcc] shadow-[0_0_20px_rgba(0,255,204,0.4)] scale-105'
                            : 'bg-[#050b18] border-[#00ffcc20] hover:border-[#00ffcc50]'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-gray-400">0{idx + 1}</div>
                        <div className="text-xs font-bold font-['Orbitron'] text-white mt-1">
                          {node.label}
                        </div>
                        <div className="text-[9px] font-mono text-gray-400 mt-0.5">{node.sub}</div>
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-ping" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Live Node Telemetry Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#00ffcc20]">
                  <div className="p-3.5 rounded bg-[#02050e] border border-[#00ffcc20] text-xs font-mono">
                    <span className="text-[#00ffcc] font-bold">
                      ACTIVE FOCUS: {projects[0].flowNodes[agriActiveNode].label}
                    </span>
                    <p className="text-gray-300 mt-1 leading-relaxed">
                      {agriActiveNode === 0 && 'Farmers submit arrival requests via smartphone PWA, reducing unscheduled queue buildup.'}
                      {agriActiveNode === 1 && 'Intelligent load balancer checks weighbridge capacity and issues dedicated time slots.'}
                      {agriActiveNode === 2 && 'Cryptographic digital QR token issued with verified crop batch weight and mandi gate credentials.'}
                      {agriActiveNode === 3 && 'Real-time WebSocket queue tracks live gate ingress and calls farmers 15 mins before inspection.'}
                      {agriActiveNode === 4 && 'Automated digital weighing, quality grading, and instantaneous escrow payment clearance.'}
                      {agriActiveNode === 5 && 'Python predictive model evaluates regional crop trends to forecast mandi storage saturation.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#02050e] border border-[#00ffcc20] text-xs font-mono space-y-1">
                    <span className="text-[#38bdf8] font-bold">DISPATCHED TOKEN STREAM:</span>
                    {agriTokens.slice(0, 3).map((tok) => (
                      <div key={tok.id} className="flex justify-between py-0.5 border-b border-gray-900 text-[11px]">
                        <span className="text-[#00ffcc]">{tok.id}</span>
                        <span className="text-gray-300 truncate max-w-[120px]">{tok.crop}</span>
                        <span className="text-emerald-400">{tok.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 2: I/O DATA TRANSFER SIMULATION */}
          {activeProjectTab === 'io' && (
            <div className="space-y-5">
              <div className="p-6 rounded-xl bg-[#050e1f]/90 border border-[#38bdf835] backdrop-blur-xl">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#38bdf815] text-[#38bdf8] border border-[#38bdf830]">
                      COMPUTER ARCHITECTURE & SYSTEMS IN C
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black font-['Orbitron'] text-white mt-1.5">
                      I/O DATA TRANSFER COMPARISON
                    </h3>
                    <p className="text-sm font-semibold font-['Rajdhani'] text-[#a855f7]">
                      Hardware Bus Simulation: Programmed I/O vs Interrupt-Driven I/O vs DMA
                    </p>
                    <p className="max-w-2xl text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
                      Evaluates how data travels between the CPU Core, System Bus, Main Memory (RAM), and Peripheral I/O Devices under distinct transfer mechanisms.
                    </p>
                  </div>

                  <button
                    onClick={handleStartIo}
                    disabled={ioRunning}
                    className={`px-5 py-2.5 rounded font-['Orbitron'] text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      ioRunning
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#38bdf8] to-[#a855f7] text-[#02040a] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span>{ioRunning ? 'SIMULATING...' : 'START TRANSFER'}</span>
                  </button>
                </div>

                {/* Mode Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#38bdf820]">
                  {projects[1].modes.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        soundManager.playClick();
                        setIoMode(m.id);
                      }}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        ioMode === m.id
                          ? 'bg-[#0f2444] border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'bg-[#02050e] border-[#38bdf820] hover:border-[#38bdf850]'
                      }`}
                    >
                      <div className="text-xs font-bold font-['Orbitron'] text-white">{m.name}</div>
                      <div className="flex justify-between text-[11px] font-mono text-gray-400 mt-1">
                        <span>CPU Load:</span>
                        <span className={m.cpuLoad === '100%' ? 'text-rose-400 font-bold' : m.cpuLoad === '32%' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {m.cpuLoad}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-gray-400">
                        <span>Speed:</span>
                        <span className="text-[#38bdf8]">{m.transferSpeed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Units Grid & Live Bus */}
              <div className="p-6 rounded-xl bg-[#030814]/95 border border-[#38bdf840] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                  <div className={`p-4 rounded-lg border ${ioMode === 'programmed' && ioRunning ? 'border-rose-500 bg-rose-950/30 animate-pulse' : 'border-[#38bdf830] bg-[#050b18]'}`}>
                    <div className="text-[10px] font-mono text-gray-400">UNIT 01</div>
                    <div className="text-sm font-bold font-['Orbitron'] text-white">CPU CORE</div>
                    <div className="text-xs font-mono text-gray-400 mt-1">
                      {ioMode === 'programmed' && ioRunning ? '100% BUSY-WAIT' : ioMode === 'interrupt' && ioRunning ? 'SERVICING ISR' : '2% IDLE (DMA)'}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#050b18]">
                    <div className="text-[10px] font-mono text-gray-400">UNIT 02</div>
                    <div className="text-sm font-bold font-['Orbitron'] text-white">SYSTEM BUS</div>
                    <div className="text-xs font-mono text-[#38bdf8] mt-1">{ioPacketState}</div>
                  </div>

                  <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#050b18]">
                    <div className="text-[10px] font-mono text-gray-400">UNIT 03</div>
                    <div className="text-sm font-bold font-['Orbitron'] text-white">MAIN RAM</div>
                    <div className="text-xs font-mono text-[#a855f7] mt-1">DDR Buffer 0x7FFF</div>
                  </div>

                  <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#050b18]">
                    <div className="text-[10px] font-mono text-gray-400">UNIT 04</div>
                    <div className="text-sm font-bold font-['Orbitron'] text-white">I/O DEVICE</div>
                    <div className="text-xs font-mono text-cyan-400 mt-1">Ready for Burst</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">TRANSFER COMPLETION:</span>
                    <span className="text-[#38bdf8] font-bold">{ioProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-black border border-[#38bdf830] p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#00ffcc] transition-all"
                      style={{ width: `${ioProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          DISTRICT INTERIOR 3: TECH LAB FACILITY
      ======================================================== */}
      {activeDistrict === 'lab' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#090518]/90 border border-[#a855f740] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#a855f7]">
              <Cpu className="w-4 h-4" />
              <span>GLOWING RESEARCH LABORATORY // PHYSICAL SKILL OBJECTS</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Orbitron'] text-white mt-2">
              TECH LAB
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Click any physical/holographic skill object to inspect practical engineering uses and paradigms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techLab.skills.map((skill) => {
                const isSelected = activeSkill.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSkill(skill);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#150e2d] border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105 z-10'
                        : 'bg-[#05030f] border-[#a855f720] hover:border-[#a855f760]'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-gray-500 mb-1">{skill.badge}</div>
                    <div className="text-base font-bold font-['Orbitron'] text-white">{skill.name}</div>
                    <div className="text-[11px] font-mono text-[#38bdf8] mt-1">{skill.type}</div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-[#070314]/95 border border-[#a855f740] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-[#a855f7]">HOLOGRAPHIC INSPECTION:</div>
                <h3 className="text-2xl font-bold font-['Orbitron'] text-white">{activeSkill.name}</h3>
                <div className="text-xs font-mono text-[#00ffcc]">TYPE: {activeSkill.type}</div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans mt-2">
                  {activeSkill.desc}
                </p>

                <div className="pt-3 border-t border-gray-800">
                  <div className="text-xs font-mono text-gray-400 mb-2">KEY CONCEPTS & LEARNINGS:</div>
                  <div className="space-y-1.5">
                    {activeSkill.keyConcepts.map((k, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]" />
                        <span>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-800 text-[10px] font-mono text-gray-400">
                Factual skill records • Evaluated across project implementations.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DISTRICT INTERIOR 4: EXPERIENCE TOWER
      ======================================================== */}
      {activeDistrict === 'experience' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#040e1d]/90 border border-[#00ffcc40] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
              <Briefcase className="w-4 h-4" />
              <span>CORPORATE SKYSCRAPER // SPATIAL TIMELINE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Orbitron'] text-white mt-2">
              EXPERIENCE TOWER
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Industry immersion, enterprise agile practices, and mobile application development.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#030914]/90 border border-[#00ffcc30] hover:border-[#00ffcc] transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30]">
                      {exp.company}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-['Orbitron'] text-white mt-1.5">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#38bdf8] px-3 py-1 rounded bg-[#07172e] border border-[#38bdf830]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">{exp.desc}</p>

                <div className="pt-3 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="text-xs text-gray-300 flex items-start gap-1.5 font-sans">
                      <span className="text-[#00ffcc] font-bold">›</span>
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
          DISTRICT INTERIOR 5: ACHIEVEMENT VAULT TOWER
      ======================================================== */}
      {activeDistrict === 'vault' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#181104]/90 border border-[#f59e0b40] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
              <Trophy className="w-4 h-4" />
              <span>TROPHY & VAULT TOWER // COMPETITIVE HONORS</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Orbitron'] text-white mt-2">
              ACHIEVEMENT VAULT
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Collectible holographic badges and major competitive hackathon podiums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                onClick={handleCelebrate}
                className="p-6 rounded-xl bg-[#090601]/95 border border-[#f59e0b35] hover:border-[#f59e0b] transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-[#f59e0b20] border border-[#f59e0b] text-[#f59e0b] shrink-0 group-hover:scale-110 transition-transform">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/60">{ach.year} • {ach.badgeType}</div>
                    <h3 className="text-lg md:text-xl font-bold font-['Orbitron'] text-white mt-1">
                      {ach.title}
                    </h3>
                    <div className="text-sm font-['Rajdhani'] font-bold text-[#f59e0b] mt-0.5">
                      AWARD: {ach.award}
                    </div>
                    <div className="text-xs font-mono text-gray-400 mt-0.5">{ach.institution}</div>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans pt-2 border-t border-gray-800">
                  {ach.desc}
                </p>
                <div className="text-[10px] font-mono text-[#00ffcc]">Click to celebrate badge unlock →</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          DISTRICT INTERIOR 6: CERTIFICATION ARCHIVE
      ======================================================== */}
      {activeDistrict === 'certifications' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#031317]/90 border border-[#00ffcc40] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
              <FileCheck className="w-4 h-4" />
              <span>HOLOGRAPHIC ARCHIVE // 9 VERIFIED WORKSHOPS & CERTIFICATES</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-['Orbitron'] text-white mt-2">
              CERTIFICATION ARCHIVE
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-1">
              Collectible holographic credentials across mobile development, AI infrastructure, and design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCert(c);
                }}
                className="p-4 rounded-xl bg-[#02090c]/90 border border-[#00ffcc25] hover:border-[#00ffcc] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-2">
                    <span>{c.year}</span>
                    <span className="text-[#00ffcc]">{c.type}</span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold font-['Orbitron'] text-white group-hover:text-[#00ffcc] transition-colors">
                    {c.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
                  <span className="truncate max-w-[180px]">{c.issuer}</span>
                  <ShieldCheck className="w-4 h-4 text-[#00ffcc]" />
                </div>
              </div>
            ))}
          </div>

          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="p-6 rounded-xl bg-[#041018] border border-[#00ffcc50] max-w-md w-full space-y-3">
                <div className="text-[10px] font-mono text-[#38bdf8]">{selectedCert.type} • {selectedCert.year}</div>
                <h3 className="text-lg font-bold font-['Orbitron'] text-white">{selectedCert.title}</h3>
                <div className="text-xs font-mono text-gray-300">ISSUED BY: {selectedCert.issuer}</div>
                <div className="pt-3 text-right">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-1.5 rounded bg-[#00ffcc] text-[#02040a] font-mono text-xs font-bold cursor-pointer"
                  >
                    DISMISS
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          DISTRICT INTERIOR 7: CONTACT / COMMUNICATION TOWER
      ======================================================== */}
      {activeDistrict === 'contact' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-[#14060c]/90 border border-[#f43f5e40] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f43f5e]">
              <Radio className="w-4 h-4" />
              <span>COMMUNICATION TOWER // ENCRYPTED TERMINAL</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-['Orbitron'] text-white mt-2">
              "LET'S BUILD SOMETHING."
            </h2>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl">
              Open to collaborative projects, hackathon opportunities, software engineering roles, and technical discussions.
            </p>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[#f43f5e25]">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f43f5e] text-white font-['Orbitron'] font-bold text-xs cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.5)]"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL'}</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#070e1c] border border-[#38bdf840] hover:border-[#38bdf8] text-xs font-mono text-[#38bdf8]"
              >
                <span>GITHUB: {profile.githubHandle}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#070e1c] border border-[#a855f740] hover:border-[#a855f7] text-xs font-mono text-[#a855f7]"
              >
                <span>LINKEDIN: {profile.linkedinHandle}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Transmission Console */}
          <div className="p-6 rounded-xl bg-[#090206]/95 border border-[#f43f5e30]">
            <div className="text-xs font-mono text-[#f43f5e] mb-3">TRANSMIT ENCRYPTED MESSAGE:</div>
            <form onSubmit={handleTransmitMessage} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Callsign"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="px-3 py-2 rounded bg-[#030103] border border-[#f43f5e30] focus:border-[#f43f5e] focus:outline-none text-white text-xs font-mono"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="px-3 py-2 rounded bg-[#030103] border border-[#f43f5e30] focus:border-[#f43f5e] focus:outline-none text-white text-xs font-mono"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder="State your opportunity, collaboration, or message..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#030103] border border-[#f43f5e30] focus:border-[#f43f5e] focus:outline-none text-white text-xs font-sans"
              />
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] font-mono text-gray-500">Direct mail protocol (AES-256)</span>
                <button
                  type="submit"
                  disabled={transmitState === 'transmitting'}
                  className="px-6 py-2 rounded bg-[#f43f5e] text-white font-['Orbitron'] font-bold text-xs cursor-pointer"
                >
                  {transmitState === 'transmitting' ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
