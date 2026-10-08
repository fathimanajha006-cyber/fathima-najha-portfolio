import React, { useState, useEffect } from 'react';
import City3D from './components/City3D';
import BootSequence from './components/BootSequence';
import HUD from './components/HUD';
import CyberCursor from './components/CyberCursor';
import InteriorExperience from './components/InteriorExperience';
import { portfolioData } from './data/portfolioData';
import { soundManager } from './utils/soundManager';

export default function App() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState('city'); // 'city' | 'education' | 'projects' | 'lab' | 'experience' | 'vault' | 'certifications' | 'contact'
  const [nearbyBuilding, setNearbyBuilding] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { districts } = portfolioData;

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

  const handleReturnToCity = () => {
    soundManager.playClick();
    soundManager.playWarp();
    setActiveDistrict('city');
  };

  // Keyboard navigation shortcuts (1-8, Esc, M)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= districts.length) {
        const target = districts[num - 1];
        if (target) {
          soundManager.playClick();
          setActiveDistrict(target.id);
        }
      } else if (e.key === 'Escape') {
        soundManager.playClick();
        setActiveDistrict('city');
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [districts, isMuted]);

  // Simulate mobile move trigger
  const handleSimulateMove = (key, isDown) => {
    const event = new KeyboardEvent(isDown ? 'keydown' : 'keyup', { key });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020409] text-slate-100 select-none">
      {/* 1. Custom Cyber Cursor (Desktop) */}
      <CyberCursor />

      {/* 2. Opening Cinematic Boot Sequence (0 - 30s) */}
      {isIntroPlaying && (
        <BootSequence
          onComplete={() => {
            setIsIntroPlaying(false);
          }}
        />
      )}

      {/* 3. The 3D Open Digital City (Three.js Open World) */}
      <City3D
        activeDistrict={activeDistrict}
        onSelectDistrict={handleSelectDistrict}
        onNearbyBuilding={setNearbyBuilding}
        reducedMotion={reducedMotion}
        isIntroPlaying={isIntroPlaying}
      />

      {/* 4. CRT Vignette & Cyber Atmosphere */}
      <div className="scanlines-overlay fixed inset-0 z-30 pointer-events-none opacity-30" />
      <div className="crt-vignette fixed inset-0 z-30 pointer-events-none opacity-50" />

      {/* 5. Minimal Game-like HUD */}
      {!isIntroPlaying && (
        <HUD
          activeDistrict={activeDistrict}
          onSelectDistrict={handleSelectDistrict}
          nearbyBuilding={nearbyBuilding}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={handleToggleReducedMotion}
          onSimulateMove={handleSimulateMove}
        />
      )}

      {/* 6. Cinematic Building Interior Experience (Inside the World) */}
      {activeDistrict !== 'city' && !isIntroPlaying && (
        <div className="fixed inset-0 z-35 flex items-center justify-center p-3 md:p-6 lg:p-8 pointer-events-none pt-16 pb-16">
          <div className="relative w-full max-w-5xl h-full max-h-[86vh] bg-[#020612]/92 border border-[#00ffcc40] rounded-2xl shadow-[0_0_60px_rgba(0,255,204,0.18)] backdrop-blur-2xl flex flex-col pointer-events-auto overflow-hidden animate-fadeIn p-4 md:p-6 overflow-y-auto">
            <InteriorExperience
              activeDistrict={activeDistrict}
              onReturnToCity={handleReturnToCity}
            />
          </div>
        </div>
      )}
    </div>
  );
}
