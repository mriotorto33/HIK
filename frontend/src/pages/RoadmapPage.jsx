import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import { CheckCircle2, Loader, Clock, ArrowRight } from 'lucide-react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const statusIcons = { green: CheckCircle2, amber: Loader, gray: Clock };
const statusClasses = { green: 'status-live', amber: 'status-active', gray: 'status-roadmap' };

const RoadmapPage = () => {
  useScrollReveal();
  const { roadmap } = siteData;

  return (
    <div>
      {/* ===== HERO (Dark) ===== */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="bg-[#2D2D2D] pt-16 pb-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-5 font-semibold">Development Roadmap</p>
            <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
              HIK Architectural Roadmap
            </h1>
            <p className="hero-desc text-lg text-white/50 leading-relaxed">From Manifesto to Infrastructure — Live Status</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== TIMELINE (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E5E5E5] hidden md:block" />
            <div className="space-y-8">
              {roadmap.phases.map((phase, i) => {
                const StatusIcon = statusIcons[phase.statusColor];
                return (
                  <div key={i} className={`reveal reveal-delay-${Math.min(i+1, 4)} relative`}>
                    <div className="absolute left-4 top-8 w-5 h-5 rounded-full border-2 border-[#E5E5E5] bg-white hidden md:flex items-center justify-center z-10">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        phase.statusColor === 'green' ? 'bg-[#16A34A]' :
                        phase.statusColor === 'amber' ? 'bg-[#E8761D]' : 'bg-[#CDCDCD]'
                      }`} />
                    </div>
                    <div className="md:ml-16 pro-card p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-[#9B9B9B]">{phase.phase}</span>
                        <span className="text-xs font-mono text-[#E8761D]">{phase.version}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${statusClasses[phase.statusColor]}`}>
                          <StatusIcon size={10} />{phase.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">{phase.title}</h3>
                      <ul className="space-y-2.5">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E8761D]/40 mt-2 flex-shrink-0" />
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA (Dark) ===== */}
      <section className="section-spacing bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-white mb-5">Building the infrastructure for accountable intelligence</h2>
            <p className="text-white/50 mb-10">SDK v1.0 is live. Join us in building the governance layer the world needs.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/technology" className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
                Explore Technology <ArrowRight size={16} />
              </Link>
              <Link to="/manifesto" className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:border-[#E8761D] hover:text-[#E8761D] transition-all duration-200">
                Read Manifesto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;
