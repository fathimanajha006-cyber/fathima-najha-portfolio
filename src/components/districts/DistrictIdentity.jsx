import React, { useState } from 'react';
import {
  User,
  Shield,
  Languages,
  Zap,
  Sparkles,
  Award,
  Terminal,
  MapPin,
  CheckCircle,
  FileText,
  Compass,
  Cpu
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

export default function DistrictIdentity() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { profile } = portfolioData;

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#00ffcc25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span>DISTRICT_01 // BIOMETRIC & PERSONA DOSSIER</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            DIGITAL IDENTITY
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-[#061022]/80 p-1.5 rounded-lg border border-[#00ffcc30]">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('overview');
            }}
            className={`px-3 py-1.5 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#00ffcc] text-[#02040a] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            CORE DOSSIER
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('strengths');
            }}
            className={`px-3 py-1.5 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'strengths'
                ? 'bg-[#00ffcc] text-[#02040a] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            STRENGTH METRICS
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('languages');
            }}
            className={`px-3 py-1.5 rounded text-xs md:text-sm font-['Rajdhani'] font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'languages'
                ? 'bg-[#00ffcc] text-[#02040a] shadow-[0_0_12px_rgba(0,255,204,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            LINGUISTICS
          </button>
        </div>
      </div>

      {/* Main Holographic Profile Card */}
      <div className="p-6 md:p-8 rounded-xl bg-[#061022]/90 border border-[#00ffcc35] backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ffcc06] rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00ffcc15] border border-[#00ffcc30] text-[#00ffcc] text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]" />
              <span>IDENTITY RECORD // KTU B.TECH CSE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wider">
              {profile.name}
            </h1>
            <p className="text-base md:text-lg font-['Rajdhani'] font-semibold text-[#38bdf8] tracking-wide">
              Computer Science Engineering Student & Aspiring Software / Web Developer
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00ffcc]" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
                {profile.institution}
              </span>
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#091b38] border border-[#00ffcc40] hover:border-[#00ffcc] text-xs font-mono text-[#00ffcc] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL ADDRESS'}</span>
            </button>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#091b38] border border-[#38bdf840] hover:border-[#38bdf8] text-xs font-mono text-[#38bdf8] transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>GITHUB PROFILE</span>
            </a>
          </div>
        </div>

        {/* Bio summary */}
        <p className="mt-6 pt-5 border-t border-[#00ffcc20] text-sm md:text-base text-gray-300 leading-relaxed font-sans max-w-4xl">
          {profile.summary} Focused on creating reliable software architectures, responsive web experiences, and exploring cutting-edge technology one system at a time.
        </p>
      </div>

      {/* THREE SPECIALIZED DATA SECTIONS */}
      {/* 1. CORE INTERESTS (OVERVIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-gray-400">
            SYSTEM DOMAIN SPECIALIZATIONS // PASSIONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.interests.map((interest) => (
              <div
                key={interest.name}
                className="p-5 rounded-xl bg-[#040a18]/90 border border-[#00ffcc25] hover:border-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.15)] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30]">
                    {interest.tag}
                  </span>
                  <Sparkles className="w-4 h-4 text-gray-500 group-hover:text-[#00ffcc] transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                  {interest.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-gray-400 leading-relaxed">
                  {interest.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CORE STRENGTHS METRIC CARDS */}
      {activeTab === 'strengths' && (
        <div className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-gray-400">
            ENGINEERING CAPABILITIES // BEHAVIORAL ATTRIBUTES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.strengths.map((str) => (
              <div
                key={str.name}
                className="p-5 rounded-xl bg-[#040a18]/90 border border-[#38bdf825] hover:border-[#38bdf8] transition-all relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold font-['Orbitron'] text-white">
                    {str.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#38bdf815] text-[#38bdf8] border border-[#38bdf830]">
                    {str.metric}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
                  {str.detail}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center gap-1.5 text-[11px] font-mono text-[#00ffcc]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>VERIFIED ATTRIBUTE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. LINGUISTIC CAPABILITIES */}
      {activeTab === 'languages' && (
        <div className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-gray-400">
            LINGUISTIC COMMS PROTOCOLS // MULTILINGUAL CAPABILITIES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {profile.languages.map((lang) => (
              <div
                key={lang.name}
                className="p-5 rounded-xl bg-[#040a18]/90 border border-[#c084fc25] hover:border-[#c084fc] transition-all text-center group"
              >
                <div className="inline-block p-2 rounded-full bg-[#c084fc15] text-[#c084fc] mb-3">
                  <Languages className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold font-['Orbitron'] text-white">
                  {lang.name}
                </div>
                <div className="text-xs font-mono text-[#c084fc] mt-1">
                  [{lang.code}]
                </div>
                <div className="text-xs text-gray-400 mt-2 font-medium">
                  {lang.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
