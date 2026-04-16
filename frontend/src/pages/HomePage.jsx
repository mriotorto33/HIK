import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  Shield, Lock, Radio, ArrowRight, Fingerprint, ArrowDown,
  Layers, Zap, Globe, ChevronRight, Hash, User
} from 'lucide-react';

const LOGO_V_DARK = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/7jf99bko_Logo_HIK_V_Para_Fondo_Oscuro.png.png';
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

const layerIcons = [Shield, Lock, Radio];

const HomePage = () => {
  useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <div className="absolute inset-0 will-change-transform"
          style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center pt-20 pb-10">
          <div className="hero-logo">
            <img src={LOGO_V_DARK} alt="Human Is Kind" className="h-32 sm:h-40 md:h-52 mx-auto mb-6 sm:mb-8 drop-shadow-2xl" />
          </div>
          <p className="hero-subtitle text-sm sm:text-lg md:text-xl text-[#E8761D] tracking-[0.08em] uppercase mb-5 font-bold leading-snug">
            DETERMINISTIC AI<br />GOVERNANCE INFRASTRUCTURE
          </p>
          <p className="hero-desc text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">{siteData.hero.description}</p>
          <div className="hero-badges flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 px-2">
            {siteData.hero.badges.map((b, i) => <span key={i} className="tech-badge">{b}</span>)}
          </div>
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to={siteData.hero.cta.primary.link} className="btn-primary w-full sm:w-auto justify-center">
              {siteData.hero.cta.primary.text} <ArrowRight size={16} />
            </Link>
            <Link to={siteData.hero.cta.secondary.link} className="btn-secondary-dark w-full sm:w-auto justify-center">
              {siteData.hero.cta.secondary.text}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="scroll-indicator text-white/30 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / SOLUTION ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            <div className="reveal pro-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-box w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Zap size={18} className="text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111]">{siteData.problem.title}</h3>
              </div>
              <p className="text-[#555555] leading-relaxed mb-5 text-sm sm:text-base">{siteData.problem.description}</p>
              <p className="text-[#E8761D] text-sm font-medium quote-line">{siteData.problem.highlight}</p>
            </div>
            <div className="reveal reveal-delay-2 pro-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Fingerprint size={18} className="text-[#E8761D]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111]">{siteData.solution.title}</h3>
              </div>
              <p className="text-[#555555] leading-relaxed mb-5 text-sm sm:text-base">{siteData.solution.description}</p>
              <p className="text-[#16A34A] text-sm font-medium quote-line" style={{borderColor:'#16A34A'}}>{siteData.solution.highlight}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT HIK PRODUCES ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">What HIK Produces</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Verifiable AI at Runtime</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {siteData.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Zap]; const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 group`}>
                  <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#E8761D]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{item.title}</h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRINITY PROTOCOL ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{siteData.trinityProtocol.subtitle}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{siteData.trinityProtocol.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 group`}>
                  <span className="text-[10px] font-mono text-[#E8761D]/50 block mb-1">LAYER {layer.id}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                      <Icon size={18} className="text-[#E8761D]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#111111]">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed mb-5">{layer.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded text-[10px] font-mono border border-[#E5E5E5] text-[#6B6B6B] transition-colors duration-200 hover:border-[#E8761D]/40 hover:text-[#E8761D]">{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE (Dark) ===== */}
      <section className="section-spacing bg-[#111111] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{siteData.sacredTrace.subtitle}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{siteData.sacredTrace.title}</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base">{siteData.sacredTrace.description}</p>
          </div>
          <div className="reveal-scale code-block p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 pulse-glow">
            <p className="text-[#E8761D] font-mono text-xs sm:text-sm md:text-base text-center break-all sm:break-normal">{siteData.sacredTrace.formula}</p>
          </div>
          <div className="reveal text-center">
            <Link to="/technology" className="inline-flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] font-medium transition-colors duration-200">
              View full technical specification <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Regulatory Landscape</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Why Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {siteData.whyNow.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 border-l-[3px] border-l-[#E8761D]`}>
                <h4 className="text-sm font-bold text-[#111111] mb-2">{item.regulation}</h4>
                <p className="text-sm text-[#555555] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">The Team</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Three People. Three Continents.<br className="hidden sm:block" /> One Protocol.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {siteData.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 group`}>
                <div className="icon-box w-14 h-14 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#E8761D]" />
                </div>
                <h4 className="text-lg font-bold text-[#111111] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-1">{member.role}</p>
                <p className="text-xs text-[#9B9B9B] mb-4">{member.location}</p>
                <p className="text-sm text-[#555555] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] mb-5">Ready to make AI observable at runtime?</h2>
            <p className="text-[#555555] mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">SDK v1.0 is live. Static asset integrity available today. Live stream enforcement in v2.0.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/technology" className="btn-primary w-full sm:w-auto justify-center">
                Explore SDK v1.0 <ArrowRight size={16} />
              </Link>
              <a href="mailto:contact@humaniskind.com" className="btn-secondary w-full sm:w-auto justify-center">
                Request Pitch Deck
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
