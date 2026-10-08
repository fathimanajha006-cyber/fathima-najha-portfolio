import React, { useState, useEffect } from 'react';
import City3D from './components/City3D';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingModal from './components/OnboardingModal';
import HUD from './components/HUD';
import CityMapModal from './components/CityMapModal';
import BuildingInteriorModal from './components/BuildingInteriorModal';
import { portfolioData } from './data/portfolioData';
import { soundManager } from './utils/soundManager';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCityMap, setShowCityMap] = useState(false);
  const [activeBuilding, setActiveBuilding] = useState('city'); // 'city' | 'education' | 'projects' | 'lab' | 'experience' | 'vault' | 'certifications' | 'contact'
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { districts } = portfolioData;

  const handleEnterCity = () => {
    setHasEntered(true);
    // Show friendly onboarding modal on entrance
    setShowOnboarding(true);
  };

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

  const handleSelectBuilding = (buildingId) => {
    soundManager.playClick();
    setActiveBuilding(buildingId);
    setShowCityMap(false);
  };

  const handleCloseBuilding = () => {
    soundManager.playClick();
    setActiveBuilding('city');
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
          setActiveBuilding(target.id);
        }
      } else if (e.key === 'Escape') {
        soundManager.playClick();
        setActiveBuilding('city');
        setShowCityMap(false);
        setShowOnboarding(false);
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [districts, isMuted]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e0f2fe] text-slate-800 select-none font-['Plus_Jakarta_Sans']">
      {/* 1. Welcome Screen (First Impression) */}
      {!hasEntered && <WelcomeScreen onEnter={handleEnterCity} />}

      {/* 2. Onboarding Modal (Friendly guidance on enter) */}
      {hasEntered && showOnboarding && (
        <OnboardingModal onDismiss={() => setShowOnboarding(false)} />
      )}

      {/* 3. Cute 3D Miniature City Canvas */}
      <City3D
        activeBuilding={activeBuilding}
        onSelectBuilding={handleSelectBuilding}
        onHoverBuilding={setHoveredBuilding}
        reducedMotion={reducedMotion}
      />

      {/* 4. Friendly Minimal HUD (Only visible once inside the city) */}
      {hasEntered && (
        <HUD
          activeBuilding={activeBuilding}
          onSelectLocation={handleSelectBuilding}
          onOpenMap={() => setShowCityMap(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={handleToggleReducedMotion}
        />
      )}

      {/* 5. Expandable City Map Modal */}
      {showCityMap && (
        <CityMapModal
          activeBuilding={activeBuilding}
          onSelectLocation={handleSelectBuilding}
          onClose={() => setShowCityMap(false)}
        />
      )}

      {/* 6. Building Interior Presentation Modal */}
      {hasEntered && activeBuilding !== 'city' && (
        <BuildingInteriorModal
          activeBuilding={activeBuilding}
          onClose={handleCloseBuilding}
        />
      )}
    </div>
  );
}
