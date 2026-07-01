'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../i18n/LanguageContext';
import ContactCTA from '../components/hik/ContactCTA';
import { AlertTriangle, Shield, Scale, ArrowRight, Cpu, User, FileText, Hash, Layers, Globe, Lock } from 'lucide-react';

const HERO_BG = '/hero-bg.png';

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

const ExecutiveSummaryPageClient = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
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
    <div data-testid="executive-summary-page">
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-15" style={{backgroundImage:`url(${HERO_BG})`,backgroundSize:'cover',backgroundPosition:'center',transform:`translateY(${scrollY*0.1}px)`}} />
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">{t.ui.executiveSummary}</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-3 sm:mb-4">HumanisKind (HIK)</h1>
            <p className="hero-desc text-lg sm:text-xl text-[#E8761D] font-medium">{t.hero.subtitle}</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
          <div className="reveal pro-card p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="icon-box w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><AlertTriangle size={18} className="text-red-500" /></div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{t.problem.title}</h2>
            </div>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-5">{t.problem.description}</p>
            <p className="text-[#E8761D] font-medium quote-line text-sm sm:text-base">{t.problem.highlight}</p>
          </div>
          <div className="reveal pro-card p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><Shield size={18} className="text-[#E8761D]" /></div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{t.solution.title}</h2>
            </div>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-5">{t.solution.description}</p>
            <p className="text-[#16A34A] font-medium quote-line text-sm sm:text-base" style={{borderColor:'#16A34A'}}>{t.solution.highlight}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal flex items-center gap-3 mb-8 sm:mb-10">
            <Scale size={20} className="text-[#E8761D]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{t.ui.whyNowTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {t.whyNow.map((item, i) => {
              const icons = [FileText, Scale, Lock]; const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 border-l-[3px] border-l-[#E8761D] group`}>
                  <div className="icon-box w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center mb-3"><Icon size={16} className="text-[#E8761D]" /></div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{item.regulation}</h4>
                  <p className="text-sm text-[#555555] leading-relaxed">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-8 sm:mb-10"><h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{t.ui.whatProduces}</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {t.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Cpu]; const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 flex items-start gap-3 sm:gap-4 group`}>
                  <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-[#E8761D]" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#555555] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#2D2D2D]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#16A34A] animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-white">{t.ui.currentStatus}</h3>
          </div>
          <p className="reveal text-white/50 leading-relaxed text-sm sm:text-base">{t.ui.currentStatusDesc}</p>
        </div>
      </section>

      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-8 sm:mb-10"><h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{t.ui.theTeam}</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {t.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 group`}>
                <div className="icon-box w-12 h-12 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-4"><User size={20} className="text-[#E8761D]" /></div>
                <h4 className="text-base font-bold text-[#111111] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[#555555] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-6 sm:mb-8">{t.ui.interestedMore}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <ContactCTA
                label={t.ui.requestPitchDeck}
                className="btn-primary w-full sm:w-auto justify-center"
              />
              <Link href="/technology" className="btn-secondary w-full sm:w-auto justify-center">{t.ui.exploreTech}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveSummaryPageClient;
