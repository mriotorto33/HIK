import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import { CheckCircle2, Loader, Clock, ArrowRight } from 'lucide-react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const statusIcons = {
  green: CheckCircle2,
  amber: Loader,
  gray: Clock
};

const statusClasses = {
  green: 'status-live',
  amber: 'status-active',
  gray: 'status-roadmap'
};

const RoadmapPage = () => {
  useScrollReveal();
  const { roadmap } = siteData;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[400px] h-[400px] top-20 left-20" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-6 font-medium">
            Development Roadmap
          </p>
          <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-[#F0F0F2] tracking-tight leading-[1.1] mb-6">
            HIK Architectural Roadmap
          </h1>
          <p className="hero-desc text-lg text-[#8A8A9B] leading-relaxed">
            From Manifesto to Infrastructure — Live Status
          </p>
        </div>
      </section>

      <div className="gold-line max-w-7xl mx-auto" />

      {/* ===== TIMELINE ===== */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1E1E2A] hidden md:block" />

            <div className="space-y-12">
              {roadmap.phases.map((phase, i) => {
                const StatusIcon = statusIcons[phase.statusColor];
                return (
                  <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-8 w-5 h-5 rounded-full border-2 border-[#1E1E2A] bg-[#0B0B0F] hidden md:flex items-center justify-center z-10">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        phase.statusColor === 'green' ? 'bg-[#34D399]' :
                        phase.statusColor === 'amber' ? 'bg-[#FBBF24]' : 'bg-[#555566]'
                      }`} />
                    </div>

                    <div className="md:ml-16 glass-card rounded-2xl p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-[#8A8A9B]">{phase.phase}</span>
                        <span className="text-xs font-mono text-[#C9A84C]">{phase.version}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${statusClasses[phase.statusColor]}`}>
                          <StatusIcon size={10} />
                          {phase.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#F0F0F2] mb-4">{phase.title}</h3>

                      <ul className="space-y-2.5">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50 mt-2 flex-shrink-0" />
                            <p className="text-sm text-[#8A8A9B] leading-relaxed">{item}</p>
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

      {/* ===== CTA ===== */}
      <section className="section-spacing bg-[#08080C] relative overflow-hidden">
        <div className="glow-gold w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-[#F0F0F2] mb-6">
              Building the infrastructure for accountable intelligence
            </h2>
            <p className="text-[#8A8A9B] mb-10">
              SDK v1.0 is live. Join us in building the governance layer the world needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/technology"
                className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
              >
                Explore Technology
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/manifesto"
                className="px-8 py-3.5 border border-[#1E1E2A] text-[#F0F0F2] font-semibold rounded-lg hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200"
              >
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
