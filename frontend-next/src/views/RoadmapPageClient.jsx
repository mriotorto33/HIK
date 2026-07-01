'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../i18n/LanguageContext';
import ContactCTA from '../components/hik/ContactCTA';
import { CheckCircle2, Loader, Clock, ArrowRight } from 'lucide-react';

const HERO_BG = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/e3jgxsd0_Srt_tL1J5nBSk76xz46Rb.png';

const useScrollReveal = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 150);
    return () => clearTimeout(timer);
  }, []);
};

const statusIcons = { green: CheckCircle2, amber: Loader, orange: Loader, gray: Clock };
const statusClasses = { green: 'status-live', amber: 'status-active', orange: 'status-active', gray: 'status-roadmap' };

const RoadmapPageClient = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
  const { roadmap } = t;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => el.classList.add('revealed'));
    }, 50);
    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <div data-testid="roadmap-page">
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-15" style={{backgroundImage:`url(${HERO_BG})`,backgroundSize:'cover',backgroundPosition:'center',transform:`translateY(${scrollY*0.1}px)`}} />
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">{t.ui.developmentRoadmap}</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-5">{t.ui.roadmapTitle}</h1>
            <p className="hero-desc text-base sm:text-lg text-white/45 leading-relaxed">{t.ui.roadmapDesc}</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-[22px] sm:left-6 top-0 bottom-0 w-px bg-[#E5E5E5] hidden md:block" />
            <div className="space-y-6 sm:space-y-8">
              {roadmap.phases.map((phase, i) => {
                const StatusIcon = statusIcons[phase.statusColor];
                return (
                  <div key={i} className={`reveal reveal-delay-${Math.min(i+1,4)} relative`}>
                    <div className="absolute left-[14px] sm:left-4 top-7 sm:top-8 w-[18px] h-[18px] sm:w-5 sm:h-5 rounded-full border-2 border-[#E5E5E5] bg-white hidden md:flex items-center justify-center z-10">
                      <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${
                        phase.statusColor==='green'?'bg-[#16A34A]':phase.statusColor==='amber'?'bg-[#E8761D]':'bg-[#CDCDCD]'
                      }`} />
                    </div>
                    <div className="md:ml-16 pro-card p-5 sm:p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-[11px] sm:text-xs font-mono text-[#9B9B9B]">{phase.phase}</span>
                        <span className="text-[11px] sm:text-xs font-mono text-[#E8761D]">{phase.version}</span>
                        <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border ${statusClasses[phase.statusColor]}`}>
                          <StatusIcon size={10} />{phase.status}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-3 sm:mb-4">{phase.title}</h3>
                      <ul className="space-y-2 sm:space-y-2.5">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 sm:gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E8761D]/40 mt-2 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">{item}</p>
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

      <section className="section-spacing bg-[#1C1C1C]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">{t.ui.buildingInfra}</h2>
            <p className="text-white/40 mb-8 sm:mb-10 text-sm sm:text-base">{t.ui.buildingDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <ContactCTA
                label={t.ui.requestDemo}
                className="btn-primary w-full sm:w-auto justify-center"
              />
              <Link href="/technology" className="btn-secondary-dark w-full sm:w-auto justify-center">{t.ui.readManifesto}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPageClient;
