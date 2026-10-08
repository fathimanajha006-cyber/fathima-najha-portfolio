import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Compass,
  Radio,
  Sliders,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import City3D from './components/City3D';
import BootSequence from './components/BootSequence';
import HUD from './components/HUD';
import CyberCursor from './components/CyberCursor';
import DistrictIdentity from './components/districts/DistrictIdentity';
import DistrictProjects from './components/districts/DistrictProjects';
import DistrictTechLab from './components/districts/DistrictTechLab';
import DistrictExperience from './components/districts/DistrictExperience';
import DistrictVault from './components/districts/DistrictVault';
import DistrictEducation from './components/districts/DistrictEducation';
import DistrictTerminal from './components/districts/DistrictTerminal';
import { portfolioData } from './data/portfolioData';
import { soundManager } from './utils/soundManager';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState('explore');
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showScanlines, setShowScanlines] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const { districts } = portfolioData;

  // Audio Toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playSuccess();
    }
  };

  const handleToggleReducedMotion = () => {
    soundManager.playClick();
    setReducedMotion(!reducedMotion);
  };

  const handleSelectDistrict = (districtId) => {
    if (activeDistrict !== districtId) {
      soundManager.playClick();
      setActiveDistrict(districtId);
    }
  };

  // Keyboard Shortcuts (1-8, Esc, M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key;
      const num = parseInt(key, 10);
      if (num >= 1 && num <= districts.length) {
        const target = districts[num - 1];
        if (target) {
          soundManager.playClick();
          setActiveDistrict(target.id);
        }
      } else if (key === 'Escape') {
        soundManager.playClick();
        setActiveDistrict('explore');
        setShowHelpModal(false);
      } else if (key === 'm' || key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [districts, isMuted]);

  // Navigate Previous / Next District
  const currentIdx = districts.findIndex((d) => d.id === activeDistrict);
  const handlePrevDistrict = () => {
    soundManager.playClick();
    const prevIdx = (currentIdx - 1 + districts.length) % districts.length;
    setActiveDistrict(districts[prevIdx].id);
  };
  const handleNextDistrict = () => {
    soundManager.playClick();
    const nextIdx = (currentIdx + 1) % districts.length;
    setActiveDistrict(districts[nextIdx].id);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#02040a] text-slate-100 select-none">
      {/* 1. Custom Cyber Cursor */}
      <CyberCursor />

      {/* 2. Boot Cinematic Sequence */}
      {!bootCompleted && (
        <BootSequence
          onComplete={() => {
            setBootCompleted(true);
          }}
        />
      )}

      {/* 3. 3D WebGL Cyberpunk Metropolis */}
      <City3D
        activeDistrict={activeDistrict}
        onSelectDistrict={handleSelectDistrict}
        reducedMotion={reducedMotion}
      />

      {/* 4. Atmospheric Scanlines & Vignette */}
      {showScanlines && (
        <>
          <div className="scanlines-overlay fixed inset-0 z-30 pointer-events-none opacity-40" />
          <div className="crt-vignette fixed inset-0 z-30 pointer-events-none opacity-60" />
        </>
      )}

      {/* 5. Heads-Up Display (HUD) */}
      <HUD
        activeDistrict={activeDistrict}
        onSelectDistrict={handleSelectDistrict}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* 6. Free Orbit City Helper (Shown only when in explore mode) */}
      {activeDistrict === 'explore' && bootCompleted && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-35 pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#040a18]/85 border border-[#00ffcc35] backdrop-blur-md shadow-[0_0_20px_rgba(0,255,204,0.15)] text-xs font-mono text-[#00ffcc]">
            <Compass className="w-4 h-4 animate-spin text-[#00ffcc]" style={{ animationDuration: '8s' }} />
            <span>DRAG TO ORBIT 3D CITY // CLICK ANY LANDMARK OR NAV DECK BELOW</span>
          </div>
        </div>
      )}

      {/* 7. Holographic District Inspection Modal Overlay */}
      {activeDistrict !== 'explore' && (
        <div className="fixed inset-0 z-35 flex items-center justify-center p-3 md:p-6 lg:p-10 pointer-events-none pt-16 pb-20">
          <div className="relative w-full max-w-6xl h-full max-h-[88vh] bg-[#030816]/92 border border-[#00ffcc40] rounded-2xl shadow-[0_0_60px_rgba(0,255,204,0.15)] backdrop-blur-xl flex flex-col pointer-events-auto overflow-hidden animate-fadeIn">
            {/* Modal Cyber Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#00ffcc25] bg-[#050e22]/90 shrink-0">
              {/* Prev / Next Jumpers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevDistrict}
                  title="Previous District"
                  className="p-1.5 rounded bg-[#091b38] border border-[#00ffcc30] hover:border-[#00ffcc] text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-mono"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">PREV</span>
                </button>
                <button
                  onClick={handleNextDistrict}
                  title="Next District"
                  className="p-1.5 rounded bg-[#091b38] border border-[#00ffcc30] hover:border-[#00ffcc] text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-mono"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Status Header */}
              <div className="text-center font-mono text-xs text-[#00ffcc] tracking-wider hidden sm:block">
                <span>[ DISTRICT TELEMETRY // ESC TO CLOSE ]</span>
              </div>

              {/* Close Button / Return to City */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveDistrict('explore');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ff005515] border border-[#ff005550] hover:bg-[#ff005530] text-[#ff0055] hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer"
              >
                <span>RETURN TO CITY</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable District Canvas) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 overscroll-contain">
              {activeDistrict === 'identity' && <DistrictIdentity />}
              {activeDistrict === 'projects' && <DistrictProjects />}
              {activeDistrict === 'lab' && <DistrictTechLab />}
              {activeDistrict === 'experience' && <DistrictExperience />}
              {activeDistrict === 'vault' && <DistrictVault />}
              {activeDistrict === 'archive' && <DistrictEducation />}
              {activeDistrict === 'terminal' && <DistrictTerminal />}
            </div>
          </div>
        </div>
      )}

      {/* 8. Quick Help / Telemetry Floating Trigger in Bottom Left */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          onClick={() => {
            soundManager.playClick();
            setShowHelpModal(!showHelpModal);
          }}
          className="p-2 rounded-lg bg-[#040916]/80 border border-[#00ffcc25] hover:border-[#00ffcc] text-gray-400 hover:text-[#00ffcc] backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-[11px]">SYS KEYS</span>
        </button>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl bg-[#061022] border border-[#00ffcc40] shadow-[0_0_30px_rgba(0,255,204,0.2)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#00ffcc20]">
              <span className="text-sm font-bold font-['Orbitron'] text-[#00ffcc]">
                FATHIMA.OS CONTROLS
              </span>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-[#00ffcc]">Keys 1 — 8</span>
                <span>Direct District Warp</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-[#00ffcc]">Esc Key</span>
                <span>Close District / City View</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-[#00ffcc]">M Key</span>
                <span>Toggle Futuristic Audio</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-[#00ffcc]">Click & Drag</span>
                <span>Orbit 3D City View</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#00ffcc]">Click Landmarks</span>
                <span>Enter District Directly</span>
              </div>
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 rounded bg-[#00ffcc] text-[#02040a] font-mono text-xs font-bold cursor-pointer"
              >
                ACKNOWLEDGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
