import React, { useState, useEffect } from 'react';
import {
  Code2,
  Workflow,
  Cpu,
  Layers,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Database,
  TrendingUp,
  Sliders,
  Server
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

export default function DistrictProjects() {
  const [selectedProject, setSelectedProject] = useState('agriqueue');

  // AGRIQUEUE SIMULATION STATE
  const [agriActiveNode, setAgriActiveNode] = useState(0);
  const [agriAutoPlay, setAgriAutoPlay] = useState(true);
  const [agriTokens, setAgriTokens] = useState([
    { id: 'AQ-8910', crop: 'Paddy (Grade A)', slot: '09:30 AM', status: 'INSPECTION PASSED' },
    { id: 'AQ-8911', crop: 'Tomato (Organic)', slot: '10:00 AM', status: 'IN WEIGHBRIDGE' },
    { id: 'AQ-8912', crop: 'Wheat (Winter)', slot: '10:15 AM', status: 'TOKEN ISSUED' }
  ]);
  const [forecastYield, setForecastYield] = useState([45, 62, 78, 92, 85, 96, 110]);

  // I/O SIMULATION STATE
  const [ioMode, setIoMode] = useState('programmed'); // 'programmed' | 'interrupt' | 'dma'
  const [ioRunning, setIoRunning] = useState(false);
  const [ioProgress, setIoProgress] = useState(0);
  const [ioPacketPos, setIoPacketPos] = useState('idle'); // 'device' | 'cpu' | 'bus' | 'memory'

  // AgriQueue Auto Loop
  useEffect(() => {
    let timer;
    if (agriAutoPlay && selectedProject === 'agriqueue') {
      timer = setInterval(() => {
        setAgriActiveNode((prev) => (prev + 1) % portfolioData.projects[0].flowNodes.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [agriAutoPlay, selectedProject]);

  // I/O Transfer Simulation Engine
  const startIoTransfer = () => {
    if (ioRunning) return;
    soundManager.playClick();
    setIoRunning(true);
    setIoProgress(0);

    const speedMap = { programmed: 140, interrupt: 70, dma: 30 };
    const stepInterval = speedMap[ioMode] || 80;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setIoProgress(progress);

      // Packet route based on mode
      if (ioMode === 'programmed') {
        if (progress < 45) setIoPacketPos('device -> cpu');
        else if (progress < 90) setIoPacketPos('cpu (busy-wait) -> memory');
        else setIoPacketPos('memory verified');
      } else if (ioMode === 'interrupt') {
        if (progress < 30) setIoPacketPos('device asserts IRQ');
        else if (progress < 70) setIoPacketPos('cpu isr handler');
        else setIoPacketPos('transfer to memory');
      } else {
        // DMA
        if (progress < 20) setIoPacketPos('cpu setups dma regs');
        else if (progress < 85) setIoPacketPos('dma burst bus -> memory');
        else setIoPacketPos('dma interrupt done');
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIoRunning(false);
        soundManager.playSuccess();
      }
    }, stepInterval);
  };

  const handleGenerateAgriToken = () => {
    soundManager.playClick();
    const crops = ['Paddy', 'Organic Tomato', 'Spices & Cardamom', 'Sweet Corn', 'Groundnut'];
    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    const randomId = `AQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setAgriTokens((prev) => [
      { id: randomId, crop: randomCrop, slot: '11:00 AM', status: 'TOKEN ISSUED' },
      ...prev.slice(0, 3)
    ]);
  };

  const currentIoModeData = portfolioData.projects[1].modes.find((m) => m.id === ioMode);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#00ffcc25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span>DISTRICT_02 // SYSTEM SCHEMATICS & PROTOTYPES</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            PROJECT DISTRICT
          </h2>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 bg-[#061022]/80 p-1.5 rounded-lg border border-[#00ffcc30]">
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedProject('agriqueue');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
              selectedProject === 'agriqueue'
                ? 'bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] text-[#02040a] shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>01. AGRIQUEUE</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedProject('io-comparison');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
              selectedProject === 'io-comparison'
                ? 'bg-gradient-to-r from-[#38bdf8] to-[#a855f7] text-[#02040a] shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>02. I/O DATA TRANSFER</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          PROJECT 1: AGRIQUEUE
      ======================================================== */}
      {selectedProject === 'agriqueue' && (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="p-6 rounded-xl bg-[#061022]/90 border border-[#00ffcc35] backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00ffcc08] rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30]">
                  <Sparkles className="w-3 h-3" />
                  <span>HACKATHON-READY ARCHITECTURE</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-['Orbitron'] text-white mt-2">
                  AGRIQUEUE
                </h3>
                <p className="text-sm md:text-base text-[#38bdf8] font-['Rajdhani'] font-semibold">
                  Smart Farm Procurement Management System
                </p>
                <p className="max-w-3xl mt-2 text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                  {portfolioData.projects[0].summary}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {portfolioData.projects[0].stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#091833] text-[#00ffcc] border border-[#00ffcc25]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Telemetry Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#00ffcc20]">
              <div className="p-3 rounded-lg bg-[#040b18] border border-[#00ffcc20]">
                <div className="text-[11px] font-mono text-gray-400">WAIT TIME REDUCTION</div>
                <div className="text-xl md:text-2xl font-bold font-['Orbitron'] text-[#00ffcc]">
                  -74%
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">Eliminates Mandi Congestion</div>
              </div>
              <div className="p-3 rounded-lg bg-[#040b18] border border-[#00ffcc20]">
                <div className="text-[11px] font-mono text-gray-400">DAILY ACTIVE SLOTS</div>
                <div className="text-xl md:text-2xl font-bold font-['Orbitron'] text-[#38bdf8]">
                  1,420+
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">Multi-district Procurement</div>
              </div>
              <div className="p-3 rounded-lg bg-[#040b18] border border-[#00ffcc20]">
                <div className="text-[11px] font-mono text-gray-400">TOKEN ACCURACY</div>
                <div className="text-xl md:text-2xl font-bold font-['Orbitron'] text-[#a855f7]">
                  99.4%
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">Tamper-Proof Verification</div>
              </div>
              <div className="p-3 rounded-lg bg-[#040b18] border border-[#00ffcc20]">
                <div className="text-[11px] font-mono text-gray-400">AI PREDICTION MODEL</div>
                <div className="text-xl md:text-2xl font-bold font-['Orbitron'] text-[#fbbf24]">
                  ACTIVE
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">Python Demand Forecaster</div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SYSTEM FLOW VISUALIZATION (CONTROL CENTER) */}
          <div className="p-6 rounded-xl bg-[#040916]/95 border border-[#00ffcc40] shadow-[0_0_30px_rgba(0,255,204,0.1)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-[#00ffcc]" />
                <h4 className="text-base md:text-lg font-bold font-['Orbitron'] text-white">
                  LIVE SYSTEM FLOW VISUALIZATION & CONTROL CENTER
                </h4>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAgriAutoPlay(!agriAutoPlay)}
                  className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    agriAutoPlay
                      ? 'bg-[#00ffcc20] text-[#00ffcc] border border-[#00ffcc50]'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${agriAutoPlay ? 'animate-pulse' : ''}`} />
                  <span>{agriAutoPlay ? 'AUTOPLAY: ON' : 'PAUSED'}</span>
                </button>

                <button
                  onClick={handleGenerateAgriToken}
                  className="px-3 py-1.5 rounded text-xs font-mono bg-[#38bdf820] text-[#38bdf8] border border-[#38bdf850] hover:bg-[#38bdf840] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>DISPATCH NEW TOKEN</span>
                </button>
              </div>
            </div>

            {/* FLOW NODES CHAIN */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative py-2">
              {portfolioData.projects[0].flowNodes.map((node, idx) => {
                const isActive = agriActiveNode === idx;
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      soundManager.playClick();
                      setAgriActiveNode(idx);
                      setAgriAutoPlay(false);
                    }}
                    className={`relative p-3.5 rounded-lg border transition-all duration-300 cursor-pointer text-center group ${
                      isActive
                        ? 'bg-[#0a1c38] border-[#00ffcc] shadow-[0_0_20px_rgba(0,255,204,0.35)] scale-105 z-10'
                        : 'bg-[#060f21] border-[#00ffcc20] hover:border-[#00ffcc60]'
                    }`}
                  >
                    {/* Step number badge */}
                    <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-500 group-hover:text-[#00ffcc]">
                      0{idx + 1}
                    </div>

                    {/* Active pulse */}
                    {isActive && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00ffcc] animate-ping" />
                    )}

                    <div className="mt-3 text-xs md:text-sm font-bold font-['Orbitron'] text-white">
                      {node.label}
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-gray-400">
                      {node.sub}
                    </div>

                    {/* Neon flow connector line */}
                    {idx < portfolioData.projects[0].flowNodes.length - 1 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#00ffcc]">
                        <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce' : 'opacity-40'}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* LIVE TELEMETRY SUB-PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#00ffcc20]">
              {/* Active Node Detail */}
              <div className="p-4 rounded-lg bg-[#061022] border border-[#00ffcc25]">
                <div className="text-xs font-mono text-[#00ffcc] flex items-center gap-2 mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>ACTIVE NODE TELEMETRY</span>
                </div>
                <div className="text-sm font-bold font-['Orbitron'] text-white">
                  {portfolioData.projects[0].flowNodes[agriActiveNode].label}
                </div>
                <p className="mt-1 text-xs text-gray-300">
                  {agriActiveNode === 0 && 'Farmers submit procurement request via mobile PWA or SMS terminal.'}
                  {agriActiveNode === 1 && 'Algorithmic capacity scheduler assigns optimal unloading time window.'}
                  {agriActiveNode === 2 && 'Cryptographically signed digital QR token dispatched to farmer.'}
                  {agriActiveNode === 3 && 'WebSocket live queue updates farmer with real-time lane movement.'}
                  {agriActiveNode === 4 && 'Automated weighbridge integration & instant digital payment clearance.'}
                  {agriActiveNode === 5 && 'Python predictive model evaluates regional crop trends and storage.'}
                </p>
              </div>

              {/* Real-time Token Feed */}
              <div className="p-4 rounded-lg bg-[#061022] border border-[#00ffcc25]">
                <div className="text-xs font-mono text-[#38bdf8] flex items-center gap-2 mb-2">
                  <Database className="w-3.5 h-3.5" />
                  <span>DISPATCHED TOKEN STREAM</span>
                </div>
                <div className="space-y-1.5">
                  {agriTokens.slice(0, 3).map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center justify-between text-[11px] font-mono px-2 py-1 rounded bg-[#030814] border border-[#38bdf820]"
                    >
                      <span className="text-[#00ffcc] font-bold">{token.id}</span>
                      <span className="text-gray-300 truncate max-w-[100px]">{token.crop}</span>
                      <span className="text-emerald-400">{token.slot}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Demand Forecast Visualizer */}
              <div className="p-4 rounded-lg bg-[#061022] border border-[#00ffcc25]">
                <div className="text-xs font-mono text-[#fbbf24] flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>AI DEMAND FORECAST MATRIX</span>
                </div>
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {forecastYield.map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-[#fbbf24] to-[#f59e0b] rounded-t transition-all duration-500"
                        style={{ height: `${(val / 120) * 100}%` }}
                      />
                      <span className="text-[9px] font-mono text-gray-500">M{idx + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-[10px] font-mono text-gray-400 text-center">
                  Predictive Confidence: 94.6% // Seasonal Peak in M7
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PROJECT 2: I/O DATA TRANSFER COMPARISON
      ======================================================== */}
      {selectedProject === 'io-comparison' && (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="p-6 rounded-xl bg-[#061022]/90 border border-[#38bdf835] backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider bg-[#38bdf815] text-[#38bdf8] border border-[#38bdf830]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SYSTEMS & COMPUTER ARCHITECTURE</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-['Orbitron'] text-white mt-2">
                  I/O DATA TRANSFER COMPARISON
                </h3>
                <p className="text-sm md:text-base text-[#a855f7] font-['Rajdhani'] font-semibold">
                  Programmed I/O vs Interrupt-Driven I/O vs DMA Simulation
                </p>
                <p className="max-w-3xl mt-2 text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                  {portfolioData.projects[1].summary} Built in C with complete hardware register-level modeling.
                </p>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {portfolioData.projects[1].stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#091833] text-[#38bdf8] border border-[#38bdf825]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#38bdf820]">
              {portfolioData.projects[1].modes.map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => {
                    soundManager.playClick();
                    setIoMode(mode.id);
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    ioMode === mode.id
                      ? 'bg-[#0e2448] border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-[1.02]'
                      : 'bg-[#040b18] border-[#38bdf820] hover:border-[#38bdf850]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-['Orbitron'] text-white">
                      {mode.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#38bdf820] text-[#38bdf8]">
                      {mode.tag}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 text-xs font-mono">
                    <span className="text-gray-400">CPU Load:</span>
                    <span
                      className={`font-bold ${
                        mode.cpuLoad === '100%'
                          ? 'text-rose-400'
                          : mode.cpuLoad === '32%'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {mode.cpuLoad}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono mt-1">
                    <span className="text-gray-400">Transfer Rate:</span>
                    <span className="text-[#38bdf8] font-bold">{mode.transferSpeed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HARDWARE INTERACTIVE SCHEMATIC */}
          <div className="p-6 rounded-xl bg-[#040916]/95 border border-[#38bdf840] shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#38bdf8]" />
                <h4 className="text-base md:text-lg font-bold font-['Orbitron'] text-white">
                  MICRO-ARCHITECTURE BUS SIMULATOR: {currentIoModeData?.name}
                </h4>
              </div>

              {/* Run Transfer Button */}
              <button
                onClick={startIoTransfer}
                disabled={ioRunning}
                className={`px-5 py-2 rounded font-['Orbitron'] text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  ioRunning
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#38bdf8] to-[#a855f7] text-[#02040a] hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{ioRunning ? 'SIMULATING TRANSFER...' : 'START DATA TRANSFER'}</span>
              </button>
            </div>

            {/* HARDWARE BLOCKS LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[#02050e] border border-[#38bdf825] relative">
              {/* CPU CORE */}
              <div
                className={`p-4 rounded-lg border text-center transition-all ${
                  ioMode === 'programmed' && ioRunning
                    ? 'border-rose-500 bg-rose-950/40 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse'
                    : ioMode === 'interrupt' && ioRunning
                    ? 'border-amber-500 bg-amber-950/30'
                    : 'border-[#38bdf830] bg-[#061022]'
                }`}
              >
                <div className="text-[10px] font-mono text-gray-400">HARDWARE UNIT 01</div>
                <div className="text-sm font-bold font-['Orbitron'] text-white mt-1">CPU CORE</div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  ALU & Accumulator Registers
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800 text-xs font-mono">
                  {ioMode === 'programmed' && ioRunning ? (
                    <span className="text-rose-400 font-bold">100% BUSY-WAITING</span>
                  ) : ioMode === 'interrupt' && ioRunning ? (
                    <span className="text-amber-400 font-bold">SERVICING ISR</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">CPU IDLE / 2%</span>
                  )}
                </div>
              </div>

              {/* SYSTEM BUS */}
              <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#061022] text-center">
                <div className="text-[10px] font-mono text-gray-400">HARDWARE UNIT 02</div>
                <div className="text-sm font-bold font-['Orbitron'] text-white mt-1">SYSTEM BUS</div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  Address, Data & Control Lines
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800 text-xs font-mono text-[#38bdf8]">
                  {ioRunning ? `TRANSMITTING BYTE [${ioPacketPos}]` : 'BUS STANDBY'}
                </div>
              </div>

              {/* MAIN MEMORY */}
              <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#061022] text-center">
                <div className="text-[10px] font-mono text-gray-400">HARDWARE UNIT 03</div>
                <div className="text-sm font-bold font-['Orbitron'] text-white mt-1">MAIN RAM</div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  DDR System Memory Blocks
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800 text-xs font-mono text-[#a855f7]">
                  Target Buffer: 0x7FFF00
                </div>
              </div>

              {/* I/O DEVICE */}
              <div className="p-4 rounded-lg border border-[#38bdf830] bg-[#061022] text-center">
                <div className="text-[10px] font-mono text-gray-400">HARDWARE UNIT 04</div>
                <div className="text-sm font-bold font-['Orbitron'] text-white mt-1">I/O DEVICE</div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  Disk / High-Speed Sensor
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800 text-xs font-mono text-cyan-400">
                  Data Buffer: 512KB Ready
                </div>
              </div>
            </div>

            {/* LIVE TRANSFER PROGRESS BAR */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">TRANSFER PROGRESS:</span>
                <span className="text-[#38bdf8] font-bold">{ioProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#030712] border border-[#38bdf830] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#00ffcc] transition-all duration-150"
                  style={{ width: `${ioProgress}%` }}
                />
              </div>
            </div>

            {/* ARCHITECTURAL ANALYSIS */}
            <div className="p-4 mt-6 rounded-lg bg-[#061022] border border-[#38bdf825] text-xs font-mono leading-relaxed text-gray-300">
              <div className="text-[#38bdf8] font-bold mb-1">
                SYSTEM EVALUATION FOR {currentIoModeData?.name}:
              </div>
              <p>{currentIoModeData?.desc}</p>
              <div className="mt-2 text-gray-400">
                <span className="text-white font-semibold">Data Pathway: </span>
                {currentIoModeData?.path}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
