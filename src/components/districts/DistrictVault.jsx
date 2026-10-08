import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  ExternalLink,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

export default function DistrictVault() {
  const [selectedBadge, setSelectedBadge] = useState(portfolioData.achievements[0]);
  const [selectedCert, setSelectedCert] = useState(null);
  const { achievements, certifications } = portfolioData;

  const handleBadgeClick = (badge) => {
    soundManager.playSuccess();
    setSelectedBadge(badge);

    // Subtle sci-fi cyber confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#00ffcc', '#38bdf8']
    });
  };

  const handleCertClick = (cert) => {
    soundManager.playClick();
    setSelectedCert(cert);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f59e0b25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f59e0b]">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <span>DISTRICT_05 // HOLOGRAPHIC TROPHY VAULT & REPOSITORY</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            ACHIEVEMENT VAULT
          </h2>
        </div>

        <div className="px-3 py-1 rounded bg-[#f59e0b15] border border-[#f59e0b30] text-[#f59e0b] text-xs font-mono">
          COLLECTIBLE HONORS & CERTIFICATIONS
        </div>
      </div>

      {/* SECTION 1: HOLOGRAPHIC TROPHY BADGES (PRIMARY AWARDS) */}
      <div className="space-y-4">
        <div className="text-xs font-mono tracking-widest text-gray-400">
          PREMIER HACKATHON RECOGNITIONS // SELECT TO INSPECT
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const isSelected = selectedBadge.id === ach.id;
            return (
              <div
                key={ach.id}
                onClick={() => handleBadgeClick(ach)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#181206]/95 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.3)] scale-[1.01]'
                    : 'bg-[#060c18]/90 border-[#f59e0b25] hover:border-[#f59e0b60]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3.5 rounded-xl border shrink-0 transition-transform group-hover:rotate-6 ${
                      ach.id === 'sih-2026'
                        ? 'bg-[#f59e0b20] border-[#f59e0b] text-[#f59e0b]'
                        : 'bg-[#ec489920] border-[#ec4899] text-[#ec4899]'
                    }`}
                  >
                    <Trophy className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                        {ach.year}
                      </span>
                      <span className="text-[10px] font-mono text-[#00ffcc]">
                        {ach.badgeType}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold font-['Orbitron'] text-white">
                      {ach.title}
                    </h3>
                    <div className="text-sm font-['Rajdhani'] font-bold text-[#f59e0b]">
                      AWARD: {ach.award}
                    </div>
                    <div className="text-xs font-mono text-gray-400">
                      {ach.institution}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed font-sans">
                  {ach.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: COLLECTIBLE CERTIFICATIONS & WORKSHOPS */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono tracking-widest text-gray-400">
            WORKSHOPS & CREDENTIAL ARCHIVE // 9 VERIFIED RECORDS
          </div>
          <span className="text-[11px] font-mono text-[#00ffcc]">
            ALL CREDENTIALS VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleCertClick(cert)}
              className="p-4 rounded-xl bg-[#040a18]/85 border border-[#00ffcc20] hover:border-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-gray-400">{cert.year}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc25]">
                    {cert.type}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-['Orbitron'] text-white group-hover:text-[#00ffcc] transition-colors leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="truncate max-w-[200px]">{cert.issuer}</span>
                <ShieldCheck className="w-4 h-4 text-[#00ffcc] shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Inspection Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 rounded-xl bg-[#061022] border border-[#00ffcc50] shadow-[0_0_40px_rgba(0,255,204,0.25)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#00ffcc25]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#00ffcc]" />
                <span className="text-xs font-mono tracking-wider text-[#00ffcc]">
                  CREDENTIAL DOSSIER // VERIFIED
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white text-xs font-mono px-2 py-1 border border-gray-700 rounded hover:border-gray-500 cursor-pointer"
              >
                [ CLOSE ]
              </button>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#38bdf8]">
                {selectedCert.type} • {selectedCert.year}
              </div>
              <h3 className="text-xl font-bold font-['Orbitron'] text-white mt-1">
                {selectedCert.title}
              </h3>
              <p className="text-sm text-gray-300 mt-2 font-mono">
                ISSUED BY: {selectedCert.issuer}
              </p>
            </div>

            <div className="p-3 rounded bg-[#02050e] border border-[#00ffcc20] text-xs text-gray-300 font-sans">
              Completed with practical training, hands-on module evaluations, and technical participation under institutional mentorship.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded bg-[#00ffcc] text-[#02040a] font-['Orbitron'] text-xs font-bold hover:shadow-[0_0_15px_rgba(0,255,204,0.5)] transition-all cursor-pointer"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
