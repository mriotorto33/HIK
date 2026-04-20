import React, { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { Quote, User, MapPin } from 'lucide-react';

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

const ManifestoPage = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
  const { manifesto, team } = t;
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
    <div data-testid="manifesto-page">
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-15" style={{backgroundImage:`url(${HERO_BG})`,backgroundSize:'cover',backgroundPosition:'center',transform:`translateY(${scrollY*0.1}px)`}} />
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">{t.ui.manifestoLabel}</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-5">{t.ui.manifestoTitle}</h1>
            <p className="hero-desc text-base sm:text-lg text-white/45 leading-relaxed">{t.ui.manifestoDesc}</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="space-y-14 sm:space-y-16">
            {manifesto.sections.map((section, i) => (
              <div key={i} className="reveal">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-[#E8761D]/30 font-serif">{section.number}.</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111]">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((para, j) => <p key={j} className="text-base sm:text-lg text-[#555555] leading-relaxed">{para}</p>)}
                </div>
                {section.quote && (
                  <div className="mt-6 quote-line">
                    <div className="flex items-start gap-3">
                      <Quote size={18} className="text-[#E8761D] flex-shrink-0 mt-1" />
                      <p className="text-base sm:text-lg text-[#E8761D] font-medium italic">{section.quote}</p>
                    </div>
                  </div>
                )}
                {i < manifesto.sections.length - 1 && <div className="subtle-line mt-12 sm:mt-14" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.signedBy}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 group`}>
                <div className="icon-box w-14 h-14 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#E8761D]" />
                </div>
                <h4 className="text-lg font-bold text-[#111111] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-2">{member.role}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={12} className="text-[#9B9B9B]" />
                  <p className="text-xs text-[#9B9B9B]">{member.location}</p>
                </div>
                <p className="text-sm text-[#555555] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="reveal text-center mt-10 sm:mt-12">
            <p className="text-sm text-[#6B6B6B]">Human Is Kind™ | Est. 2026 | Montevideo — Buenos Aires</p>
            <p className="text-xs text-[#9B9B9B] mt-2">{t.footer.trademark}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoPage;
