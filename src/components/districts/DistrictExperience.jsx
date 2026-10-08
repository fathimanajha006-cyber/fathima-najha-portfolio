import React from 'react';
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function DistrictExperience() {
  const { experience } = portfolioData;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#00ffcc25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00ffcc]">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span>DISTRICT_04 // SPATIAL CAREER TIMELINE & TOWER</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            EXPERIENCE TOWER
          </h2>
        </div>

        <div className="px-3 py-1 rounded bg-[#00ffcc15] border border-[#00ffcc30] text-[#00ffcc] text-xs font-mono">
          SECTOR: PROFESSIONAL INTERNSHIPS
        </div>
      </div>

      {/* Spatial Vertical Timeline Container */}
      <div className="relative pl-6 md:pl-10 space-y-8 before:absolute before:left-3 md:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#00ffcc] before:via-[#38bdf8] before:to-[#a855f7]">
        {experience.map((exp, idx) => (
          <div key={exp.company} className="relative group">
            {/* Timeline Node Marker */}
            <div className="absolute -left-6 md:-left-10 top-1.5 w-6 h-6 rounded-full bg-[#030712] border-2 border-[#00ffcc] flex items-center justify-center shadow-[0_0_12px_rgba(0,255,204,0.6)] group-hover:scale-110 transition-transform">
              <span className="w-2 h-2 rounded-full bg-[#00ffcc]" />
            </div>

            {/* Experience Card */}
            <div className="p-6 md:p-7 rounded-xl bg-[#061022]/90 border border-[#00ffcc30] group-hover:border-[#00ffcc] backdrop-blur-md transition-all shadow-[0_0_25px_rgba(0,255,204,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#00ffcc15] text-[#00ffcc] border border-[#00ffcc30] mb-2">
                    <Building2 className="w-3 h-3" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-['Orbitron'] text-white">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#091b38] border border-[#38bdf830] text-xs font-mono text-[#38bdf8]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans mt-3">
                {exp.desc}
              </p>

              {/* Highlights */}
              <div className="mt-4 pt-4 border-t border-[#00ffcc20] space-y-2">
                <div className="text-xs font-mono text-gray-400">
                  CORE RESPONSIBILITIES & INDUSTRY EXPOSURE:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {exp.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 p-2.5 rounded bg-[#030814] border border-[#00ffcc15] text-xs text-gray-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffcc] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
