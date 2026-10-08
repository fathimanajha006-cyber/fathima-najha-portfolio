import React from 'react';
import { GraduationCap, Award, BookOpen, School, CheckCircle2, Calendar } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function DistrictEducation() {
  const { education } = portfolioData;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-white font-sans animate-fadeIn">
      {/* District Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#10b98125]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>DISTRICT_06 // ACADEMIC REGISTERS & ARCHIVE</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide font-['Orbitron'] text-white mt-1">
            EDUCATION ARCHIVE
          </h2>
        </div>

        <div className="px-3 py-1 rounded bg-[#10b98115] border border-[#10b98130] text-[#10b981] text-xs font-mono">
          ACADEMIC CREDENTIALS // FORMAL TRAINING
        </div>
      </div>

      {/* Academic Cards Grid */}
      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="p-6 md:p-7 rounded-xl bg-[#041018]/90 border border-[#10b98130] hover:border-[#10b981] backdrop-blur-md transition-all shadow-[0_0_25px_rgba(16,185,129,0.08)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider bg-[#10b98115] text-[#10b981] border border-[#10b98130]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{edu.status}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-['Orbitron'] text-white">
                  {edu.degree}
                </h3>
                <div className="text-sm font-['Rajdhani'] font-semibold text-[#38bdf8]">
                  {edu.institution}
                </div>
                {edu.university && (
                  <div className="text-xs font-mono text-gray-400">
                    Affiliation: {edu.university}
                  </div>
                )}
              </div>

              {/* Score / Grade Highlight */}
              <div className="p-3.5 rounded-xl bg-[#02090e] border border-[#10b98140] text-right min-w-[140px]">
                <div className="text-[10px] font-mono text-gray-400">EVALUATION METRIC</div>
                <div className="text-xl md:text-2xl font-bold font-['Orbitron'] text-[#10b981] mt-0.5">
                  {edu.score}
                </div>
                <div className="text-xs font-mono text-gray-400 mt-1 flex items-center justify-end gap-1">
                  <Calendar className="w-3 h-3 text-[#10b981]" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-4 pt-4 border-t border-[#10b98120] space-y-1.5">
              {edu.highlights.map((item, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-center gap-2 text-xs md:text-sm text-gray-300 font-sans"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
