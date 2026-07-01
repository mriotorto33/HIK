import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowRight, BookOpen, Quote, ExternalLink } from 'lucide-react';

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

const OriginsPage = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
  const origins = t.origins;
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
    <div data-testid="origins-page">
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-15" style={{backgroundImage:`url(${HERO_BG})`,backgroundSize:'cover',backgroundPosition:'center',transform:`translateY(${scrollY*0.1}px)`}} />
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">{t.ui.originsLabel}</p>
            <p className="hero-desc text-xl sm:text-2xl md:text-3xl text-white/45 italic mb-4 sm:mb-6 leading-relaxed">{origins.intro}</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">{origins.title}</h1>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {origins.paragraphs.map((p, i) => <p key={i} className="reveal text-base sm:text-lg text-[#555555] leading-relaxed">{p}</p>)}
          </div>
          <div className="reveal-scale my-12 sm:my-14 py-8 px-6 sm:px-8 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5]">
            <p className="text-lg sm:text-xl md:text-2xl text-[#111111] font-semibold leading-relaxed text-center italic">{origins.keyQuestion}</p>
          </div>
          <div className="reveal quote-line my-8 sm:my-10">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-[#E8761D] flex-shrink-0 mt-1" />
              <p className="text-base sm:text-lg text-[#E8761D] font-medium italic">{origins.quote}</p>
            </div>
          </div>
          <p className="reveal text-base sm:text-lg text-[#555555] leading-relaxed mb-6 sm:mb-8">{origins.personalNote}</p>
          <p className="reveal text-base sm:text-lg text-[#111111] leading-relaxed font-medium mb-6 sm:mb-8">{origins.mission}</p>
          <div className="reveal-scale my-8 sm:my-10 py-5 sm:py-6 px-6 sm:px-8 rounded-xl bg-orange-50 border border-[#E8761D]/20">
            <p className="text-lg sm:text-xl text-[#E8761D] font-semibold text-center">{origins.sacredTraceNote}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen size={20} className="text-[#E8761D]" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">{origins.intellectualBedrock.title}</h2>
            </div>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-6">{origins.intellectualBedrock.text}</p>
            <a href={origins.intellectualBedrock.archiveLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E8761D] hover:text-[#D06A18] font-medium transition-colors">
              {t.ui.exploreArchive} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C1C1C]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          {origins.closingVision.map((line, i) => (
            <p key={i} className={`reveal reveal-delay-${i+1} text-lg sm:text-xl md:text-2xl ${i===0?'text-[#E8761D] font-bold mb-5 sm:mb-6':'text-white font-semibold mb-3 sm:mb-4'} leading-relaxed`}>{line}</p>
          ))}
          <div className="reveal mt-8 sm:mt-10 flex justify-center">
            <Link to="/manifesto" className="btn-primary">
              {t.ui.readManifesto} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OriginsPage;
