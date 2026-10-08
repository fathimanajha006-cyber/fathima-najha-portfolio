import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  Compass,
  User,
  GraduationCap,
  Code2,
  Cpu,
  Briefcase,
  Trophy,
  FileCheck,
  Radio,
  ShieldCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import DistrictIdentity from './districts/DistrictIdentity';
import DistrictEducation from './districts/DistrictEducation';
import DistrictProjects from './districts/DistrictProjects';
import DistrictTechLab from './districts/DistrictTechLab';
import DistrictExperience from './districts/DistrictExperience';
import DistrictVault from './districts/DistrictVault';
import DistrictTerminal from './districts/DistrictTerminal';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/soundManager';

const DISTRICT_TITLES = {
  identity: { title: 'IDENTITY DISTRICT', sub: 'BIOMETRIC & PERSONA DOSSIER', icon: User, color: '#00e5ff' },
  education: { title: 'EDUCATION DISTRICT', sub: 'UNIVERSITY SPIRE & ACADEMIC ATRIUM', icon: GraduationCap, color: '#38bdf8' },
  projects: { title: 'PROJECT DISTRICT', sub: 'ADVANCED RESEARCH FACILITY & SYSTEMS LAB', icon: Code2, color: '#00ffcc' },
  lab: { title: 'TECH LAB DISTRICT', sub: 'EXPERIMENTAL COMPUTATIONAL MATRIX & RUNTIMES', icon: Cpu, color: '#a855f7' },
  experience: { title: 'EXPERIENCE DISTRICT', sub: 'CORPORATE SECTOR & PROFESSIONAL APPRENTICESHIP', icon: Briefcase, color: '#38bdf8' },
  vault: { title: 'ACHIEVEMENT DISTRICT', sub: 'HONORS VAULT & PODIUM TROPHIES', icon: Trophy, color: '#f59e0b' },
  certifications: { title: 'ARCHIVE DISTRICT', sub: 'VERIFIED CREDENTIALS & WORKSHOP ARTIFACTS', icon: FileCheck, color: '#10b981' },
  contact: { title: 'COMMUNICATION DISTRICT', sub: 'HIGH-ALTITUDE TRANSMISSION MAST & DISPATCH', icon: Radio, color: '#f43f5e' }
};

export default function DistrictModal({ activeDistrict, onReturnToCity }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const districtInfo = DISTRICT_TITLES[activeDistrict] || DISTRICT_TITLES.projects;
  const Icon = districtInfo.icon;

  const handleReturn = () => {
    soundManager.playWarp();
    soundManager.playClick();
    onReturnToCity();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#02050e]/95 backdrop-blur-2xl animate-fadeIn text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: districtInfo.color }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">
        {/* ========================================================
            TOP PERSISTENT ACTION BAR (RETURN TO CITY & TELEMETRY)
        ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#040e20]/90 border border-[#00ffcc30] shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* PRIMARY RETURN TO CITY BUTTON */}
          <button
            onClick={handleReturn}
            onMouseEnter={() => soundManager.playHover()}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-['Orbitron'] font-bold text-xs sm:text-sm tracking-wider text-[#02050f] bg-gradient-to-r from-[#00ffcc] to-[#38bdf8] hover:shadow-[0_0_25px_rgba(0,255,204,0.6)] transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#02050f] group-hover:-translate-x-1 transition-transform" />
            <span>← RETURN TO CITY</span>
          </button>

          {/* District Status Badge */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: districtInfo.color }}
            />
            <div className="text-right sm:text-left">
              <div className="font-['Orbitron'] font-black text-white text-xs sm:text-sm tracking-wider flex items-center gap-1.5">
                <Icon className="w-4 h-4" style={{ color: districtInfo.color }} />
                <span>{districtInfo.title}</span>
              </div>
              <div className="text-[10px] text-gray-400">
                {districtInfo.sub} • [ ESC to exit ]
              </div>
            </div>
          </div>

          {/* Close X button */}
          <button
            onClick={handleReturn}
            title="Return to City Streets"
            className="p-2 rounded-lg bg-[#07172e] border border-white/10 hover:border-[#00ffcc] text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            DISTRICT INTERIOR CONTENT
        ======================================================== */}
        <div className="pb-12">
          {activeDistrict === 'identity' && <DistrictIdentity />}
          {activeDistrict === 'education' && <DistrictEducation />}
          {activeDistrict === 'projects' && <DistrictProjects />}
          {activeDistrict === 'lab' && <DistrictTechLab />}
          {activeDistrict === 'experience' && <DistrictExperience />}
          {activeDistrict === 'vault' && <DistrictVault />}
          {activeDistrict === 'contact' && <DistrictTerminal />}

          {/* DEDICATED ARCHIVE / CERTIFICATION DISTRICT VIEW */}
          {activeDistrict === 'certifications' && (
            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-[#031317]/90 border border-[#00ffcc40] backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
                  <FileCheck className="w-4 h-4" />
                  <span>DISTRICT_07 // HOLOGRAPHIC CREDENTIAL ARCHIVE</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black font-['Orbitron'] text-white mt-2">
                  CERTIFICATION ARCHIVE
                </h2>
                <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-2xl">
                  9 verified credentials, technical workshops, hackathon honors, and industry immersion courses completed with distinction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioData.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCert(cert);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-5 rounded-xl bg-[#040c18]/90 border border-[#00ffcc25] hover:border-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.2)] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-2">
                        <span className="text-[#38bdf8]">{cert.year}</span>
                        <span className="px-2 py-0.5 rounded bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30]">
                          {cert.type}
                        </span>
                      </div>
                      <h4 className="text-sm md:text-base font-bold font-['Orbitron'] text-white group-hover:text-[#00ffcc] transition-colors">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
                      <span className="truncate max-w-[200px]">{cert.issuer}</span>
                      <ShieldCheck className="w-4 h-4 text-[#00ffcc] shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificate Detail Inspection Modal */}
              {selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                  <div className="p-6 md:p-8 rounded-2xl bg-[#04121d] border border-[#00ffcc50] max-w-md w-full space-y-4 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#00ffcc25]">
                      <span className="text-xs font-mono text-[#00ffcc]">{selectedCert.type}</span>
                      <span className="text-xs font-mono text-gray-400">{selectedCert.year}</span>
                    </div>

                    <h3 className="text-xl font-bold font-['Orbitron'] text-white">
                      {selectedCert.title}
                    </h3>

                    <div className="p-3 rounded-lg bg-[#020812] border border-[#00ffcc20] text-xs font-mono space-y-1">
                      <div className="text-gray-400">ISSUING ENTITY:</div>
                      <div className="text-[#38bdf8] font-bold">{selectedCert.issuer}</div>
                      <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>AUTHENTICATED RECORD</span>
                      </div>
                    </div>

                    <div className="pt-2 text-right">
                      <button
                        onClick={() => setSelectedCert(null)}
                        className="px-5 py-2 rounded-lg bg-[#00ffcc] text-[#02050f] font-['Orbitron'] text-xs font-bold cursor-pointer"
                      >
                        CLOSE INSPECTOR
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================
            BOTTOM RETURN TO CITY BUTTON
        ======================================================== */}
        <div className="pt-6 pb-4 border-t border-[#00ffcc20] text-center">
          <button
            onClick={handleReturn}
            onMouseEnter={() => soundManager.playHover()}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-['Orbitron'] font-bold text-xs sm:text-sm tracking-wider text-[#00ffcc] border border-[#00ffcc50] hover:bg-[#00ffcc20] hover:shadow-[0_0_25px_rgba(0,255,204,0.4)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← RETURN TO CITY STREETS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
