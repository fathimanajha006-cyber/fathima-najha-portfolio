import React, { useState } from 'react';
import {
  Radio,
  Mail,
  Send,
  Copy,
  Check,
  Terminal,
  Sparkles,
  ExternalLink,
  MessageSquareCode
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

// Crisp Brand SVG Icons
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function DistrictTerminal() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [transmitStatus, setTransmitStatus] = useState('idle'); // 'idle' | 'transmitting' | 'sent'
  const { profile } = portfolioData;

  const handleCopy = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    soundManager.playClick();
    setTransmitStatus('transmitting');

    setTimeout(() => {
      soundManager.playSuccess();
      setTransmitStatus('sent');

      // Also compose mailto link for direct delivery
      const subject = encodeURIComponent(`Inquiry from ${formState.name || 'Collaborator'} via FATHIMA NAJHA.OS`);
      const body = encodeURIComponent(formState.message);
      window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f43f5e25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#f43f5e]">
            <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-pulse" />
            <span>DISTRICT_07 // ENCRYPTED COMMS & DISPATCH</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            COMMUNICATION TERMINAL
          </h2>
        </div>

        <div className="px-3 py-1 rounded bg-[#f43f5e15] border border-[#f43f5e30] text-[#f43f5e] text-xs font-mono">
          STATUS: UPLINK READY // ACTIVE DISPATCH
        </div>
      </div>

      {/* Hero Headline Box */}
      <div className="p-6 md:p-8 rounded-xl bg-[#14060c]/90 border border-[#f43f5e35] backdrop-blur-md relative overflow-hidden text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#f43f5e]">
              TRANSMISSION INVITATION
            </span>
            <h3 className="text-3xl md:text-5xl font-black font-['Orbitron'] text-white tracking-wider mt-1">
              LET'S BUILD SOMETHING.
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-300 max-w-xl font-sans">
              Have a project, hackathon collaboration, internship opportunity, or technical discussion in mind? Send an encrypted dispatch or reach out via direct channels.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#f43f5e] text-white font-['Orbitron'] font-bold text-xs tracking-wider hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transition-all cursor-pointer shrink-0"
          >
            {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'EMAIL COPIED!' : 'COPY EMAIL ADDRESS'}</span>
          </button>
        </div>
      </div>

      {/* DIRECT CHANNELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email Channel */}
        <a
          href={`mailto:${profile.email}`}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-xl bg-[#060c1a]/85 border border-[#00ffcc25] hover:border-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.2)] transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-[#00ffcc15] text-[#00ffcc]">
              <Mail className="w-5 h-5" />
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00ffcc]" />
          </div>
          <div className="text-xs font-mono text-gray-400">ELECTRONIC MAIL</div>
          <div className="text-base font-bold font-['Orbitron'] text-white mt-1 break-all">
            {profile.email}
          </div>
          <div className="text-[11px] font-mono text-[#00ffcc] mt-2">
            Click to compose directly →
          </div>
        </a>

        {/* GitHub Channel */}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-xl bg-[#060c1a]/85 border border-[#38bdf825] hover:border-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-[#38bdf815] text-[#38bdf8]">
              <GithubIcon className="w-5 h-5" />
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#38bdf8]" />
          </div>
          <div className="text-xs font-mono text-gray-400">SOURCE CODE ARCHIVE</div>
          <div className="text-base font-bold font-['Orbitron'] text-white mt-1">
            {profile.githubHandle}
          </div>
          <div className="text-[11px] font-mono text-[#38bdf8] mt-2">
            View repositories & commits →
          </div>
        </a>

        {/* LinkedIn Channel */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-xl bg-[#060c1a]/85 border border-[#a855f725] hover:border-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-[#a855f715] text-[#a855f7]">
              <LinkedinIcon className="w-5 h-5" />
            </div>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#a855f7]" />
          </div>
          <div className="text-xs font-mono text-gray-400">PROFESSIONAL NETWORK</div>
          <div className="text-base font-bold font-['Orbitron'] text-white mt-1">
            {profile.linkedinHandle}
          </div>
          <div className="text-[11px] font-mono text-[#a855f7] mt-2">
            Connect on LinkedIn →
          </div>
        </a>
      </div>

      {/* INTERACTIVE ENCRYPTED DISPATCH CONSOLE */}
      <div className="p-6 md:p-8 rounded-xl bg-[#050b18]/95 border border-[#f43f5e30] shadow-[0_0_30px_rgba(244,63,94,0.1)]">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#f43f5e20]">
          <MessageSquareCode className="w-5 h-5 text-[#f43f5e]" />
          <h4 className="text-base md:text-lg font-bold font-['Orbitron'] text-white">
            TRANSMIT ENCRYPTED MESSAGE // DISPATCH CONSOLE
          </h4>
        </div>

        <form onSubmit={handleTransmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5">
                SENDER CALLSIGN / YOUR NAME:
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Recruiter / Engineering Lead"
                className="w-full px-4 py-2.5 rounded bg-[#020612] border border-[#f43f5e25] focus:border-[#f43f5e] focus:outline-none text-white text-xs md:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5">
                RETURN FREQUENCY / YOUR EMAIL:
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="e.g. contact@domain.com"
                className="w-full px-4 py-2.5 rounded bg-[#020612] border border-[#f43f5e25] focus:border-[#f43f5e] focus:outline-none text-white text-xs md:text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5">
              MESSAGE PAYLOAD / INQUIRY DETAILS:
            </label>
            <textarea
              rows={4}
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="State your collaboration inquiry, opportunity, or system discussion..."
              className="w-full px-4 py-2.5 rounded bg-[#020612] border border-[#f43f5e25] focus:border-[#f43f5e] focus:outline-none text-white text-xs md:text-sm font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-[11px] font-mono text-gray-400">
              {transmitStatus === 'transmitting' && 'ENCRYPTING PACKET STREAM (AES-256)...'}
              {transmitStatus === 'sent' && 'TRANSMISSION DISPATCHED TO FATHIMA NAJHA K!'}
              {transmitStatus === 'idle' && 'Direct mail forwarding configured.'}
            </div>

            <button
              type="submit"
              disabled={transmitStatus === 'transmitting'}
              className="flex items-center gap-2 px-6 py-3 rounded bg-gradient-to-r from-[#f43f5e] to-[#fb7185] text-white font-['Orbitron'] font-bold text-xs tracking-wider hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{transmitStatus === 'transmitting' ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
