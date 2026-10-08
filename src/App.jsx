import React, { useState, useEffect } from 'react';
import City3D, { DISTRICT_NODES } from './components/City3D';
import OpeningExperience from './components/OpeningExperience';
import HUD from './components/HUD';
import CityMap from './components/CityMap';
import CentralTerminal from './components/CentralTerminal';
import ArrivalOverlay from './components/ArrivalOverlay';
import DistrictModal from './components/DistrictModal';
import { portfolioData } from './data/portfolioData';
import { soundManager } from './utils/soundManager';

export default function App() {
  // Opening cinematic state
  const [isOpeningCinematic, setIsOpeningCinematic] = useState(true);

  // Metropolis district navigation states
  const [currentDistrictId, setCurrentDistrictId] = useState('core');
  const [targetDistrictId, setTargetDistrictId] = useState('core');
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0);

  // Interior presentation states
  const [isInsideDistrict, setIsInsideDistrict] = useState(false);
  const [showCityMap, setShowCityMap] = useState(false);

  // Preferences
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Audio mute toggle
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

  // Enter city from opening screen
  const handleEnterCity = () => {
    setIsOpeningCinematic(false);
    soundManager.playWarp();
    soundManager.playSuccess();
  };

  // Travel ticker system
  useEffect(() => {
    if (!isTraveling) return;

    const duration = reducedMotion ? 700 : 3600;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setTravelProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setIsTraveling(false);
        setCurrentDistrictId(targetDistrictId);
        soundManager.playSuccess();
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isTraveling, targetDistrictId, reducedMotion]);

  // Destination selection
  const handleSelectDestination = (destId) => {
    if (isTraveling) return;

    setShowCityMap(false);

    // If already at that district and not central, open its interior
    if (destId === currentDistrictId && destId !== 'core') {
      soundManager.playClick();
      setIsInsideDistrict(true);
      return;
    }

    if (destId === currentDistrictId && destId === 'core') {
      return;
    }

    // Close any open interior modal and initiate travel
    setIsInsideDistrict(false);
    setTargetDistrictId(destId);
    setIsTraveling(true);
    setTravelProgress(0);
    soundManager.playWarp();
  };

  // Skip travel for recruiters in a hurry
  const handleSkipTravel = () => {
    soundManager.playClick();
    setTravelProgress(100);
    setIsTraveling(false);
    setCurrentDistrictId(targetDistrictId);
    soundManager.playSuccess();
  };

  // Return to city streets / central plaza from interior
  const handleReturnToCity = () => {
    setIsInsideDistrict(false);
    if (currentDistrictId !== 'core') {
      handleSelectDestination('core');
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key;
      const keyMap = {
        '0': 'core',
        '1': 'identity',
        '2': 'education',
        '3': 'projects',
        '4': 'lab',
        '5': 'experience',
        '6': 'vault',
        '7': 'certifications',
        '8': 'contact'
      };

      if (keyMap[key]) {
        handleSelectDestination(keyMap[key]);
      } else if (key === 'Escape') {
        if (showCityMap) {
          setShowCityMap(false);
        } else if (isInsideDistrict) {
          handleReturnToCity();
        } else if (currentDistrictId !== 'core') {
          handleSelectDestination('core');
        }
      } else if (key === 'm' || key === 'M') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCityMap, isInsideDistrict, currentDistrictId, isTraveling]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#02050f] text-white select-none font-['Rajdhani']">
      {/* Scanline overlay for subtle cyberpunk CRT texture */}
      <div className="absolute inset-0 scanlines-overlay pointer-events-none z-20 opacity-40" />

      {/* 1. Cinematic Opening Experience (Dark Screen -> Initializing -> City Reveal) */}
      {isOpeningCinematic && <OpeningExperience onEnterCity={handleEnterCity} />}

      {/* 2. 3D Metropolis Canvas (Dark Futuristic 3D City) */}
      <City3D
        targetDistrictId={targetDistrictId}
        isTraveling={isTraveling}
        travelProgress={travelProgress}
        onTravelComplete={() => {}}
        onSelectDistrict={handleSelectDestination}
        reducedMotion={reducedMotion}
        isOpeningCinematic={isOpeningCinematic}
      />

      {/* 3. Minimal Futuristic HUD (Visible once inside the city) */}
      {!isOpeningCinematic && (
        <HUD
          currentDistrictId={currentDistrictId}
          isTraveling={isTraveling}
          travelProgress={travelProgress}
          targetDistrictId={targetDistrictId}
          onSelectDestination={handleSelectDestination}
          onSkipTravel={handleSkipTravel}
          onOpenMap={() => setShowCityMap(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={handleToggleReducedMotion}
        />
      )}

      {/* 4. Central Destination Terminal (Active at NAJHA CENTRAL plaza) */}
      {!isOpeningCinematic &&
        currentDistrictId === 'core' &&
        !isTraveling &&
        !isInsideDistrict && (
          <CentralTerminal onSelectDestination={handleSelectDestination} />
        )}

      {/* 5. Arrival Overlay (Active upon reaching any district landmark) */}
      {!isOpeningCinematic &&
        currentDistrictId !== 'core' &&
        !isTraveling &&
        !isInsideDistrict && (
          <ArrivalOverlay
            currentDistrictId={currentDistrictId}
            onEnterDistrict={() => setIsInsideDistrict(true)}
            onReturnToCentral={() => handleSelectDestination('core')}
          />
        )}

      {/* 6. Holographic City Map Modal */}
      {showCityMap && (
        <CityMap
          currentDistrictId={currentDistrictId}
          onSelectDestination={handleSelectDestination}
          onClose={() => setShowCityMap(false)}
        />
      )}

      {/* 7. Comprehensive District Interior Experience */}
      {isInsideDistrict && (
        <DistrictModal
          activeDistrict={currentDistrictId}
          onReturnToCity={handleReturnToCity}
        />
      )}
    </div>
  );
}
