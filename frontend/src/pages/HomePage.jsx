import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  Shield, Lock, Radio, ArrowRight, Fingerprint,
  Layers, Zap, Globe, ChevronRight, Hash, User
} from 'lucide-react';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const layerIcons = [Shield, Lock, Radio];

const HomePage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="hero-title inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-sm text-[#C9A84C] font-medium">SDK v1.0 Live</span>
          </div>

          <h1 className="hero-subtitle text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#F0F0F2] mb-6 tracking-tight leading-[1.05]">
            Human Is Kind<span className="text-[#C9A84C]">™</span>
          </h1>

          <p className="hero-desc text-base sm:text-lg text-[#C9A84C] tracking-[0.25em] uppercase mb-8 font-medium">
            {siteData.hero.subtitle}
          </p>

          <p className="hero-desc text-base sm:text-lg text-[#8A8A9B] max-w-3xl mx-auto mb-12 leading-relaxed">
            {siteData.hero.description}
          </p>

          <div className="hero-badges flex flex-wrap justify-center gap-2.5 mb-14">
            {siteData.hero.badges.map((badge, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-[#1E1E2A] text-[#8A8A9B] bg-[#111116]/80 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={siteData.hero.cta.primary.link}
              className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
            >
              {siteData.hero.cta.primary.text}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={siteData.hero.cta.secondary.link}
              className="px-8 py-3.5 border border-[#1E1E2A] text-[#F0F0F2] font-semibold rounded-lg hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200"
            >
              {siteData.hero.cta.secondary.text}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / SOLUTION ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="reveal glass-card rounded-2xl p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Zap size={18} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-[#F0F0F2]">{siteData.problem.title}</h3>
              </div>
              <p className="text-[#8A8A9B] leading-relaxed mb-6">
                {siteData.problem.description}
              </p>
              <p className="text-[#C9A84C] text-sm font-medium quote-line">
                {siteData.problem.highlight}
              </p>
            </div>

            <div className="reveal reveal-delay-2 glass-card rounded-2xl p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                  <Fingerprint size={18} className="text-[#C9A84C]" />
                </div>
                <h3 className="text-xl font-bold text-[#F0F0F2]">{siteData.solution.title}</h3>
              </div>
              <p className="text-[#8A8A9B] leading-relaxed mb-6">
                {siteData.solution.description}
              </p>
              <p className="text-[#34D399] text-sm font-medium quote-line" style={{ borderColor: '#34D399' }}>
                {siteData.solution.highlight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT HIK PRODUCES ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">What HIK Produces</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2]">Verifiable AI at Runtime</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Zap];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6`}>
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#C9A84C]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#F0F0F2] mb-2">{item.title}</h4>
                  <p className="text-xs text-[#8A8A9B] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRINITY PROTOCOL ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">
              {siteData.trinityProtocol.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2]">
              {siteData.trinityProtocol.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8 group`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[#C9A84C]/60">LAYER {layer.id}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20 transition-colors duration-300">
                      <Icon size={18} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F0F0F2]">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-[#8A8A9B] leading-relaxed mb-6">
                    {layer.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {layer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-[10px] font-mono border border-[#1E1E2A] text-[#8A8A9B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE ===== */}
      <section className="section-spacing bg-[#08080C] relative overflow-hidden">
        <div className="glow-gold w-[600px] h-[600px] -top-40 -right-40" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">
              {siteData.sacredTrace.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2] mb-4">
              {siteData.sacredTrace.title}
            </h2>
            <p className="text-[#8A8A9B] max-w-2xl mx-auto">
              {siteData.sacredTrace.description}
            </p>
          </div>

          <div className="reveal code-block p-6 md:p-8 mb-8">
            <p className="text-[#C9A84C] font-mono text-sm md:text-base text-center">
              {siteData.sacredTrace.formula}
            </p>
          </div>

          <div className="reveal text-center">
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E8D48B] font-medium transition-colors duration-200"
            >
              View full technical specification
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Regulatory Landscape</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2]">Why Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.whyNow.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6`}>
                <h4 className="text-sm font-bold text-[#C9A84C] mb-3">{item.regulation}</h4>
                <p className="text-sm text-[#8A8A9B] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">The Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2]">Three People. Three Continents. One Protocol.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8`}>
                <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#C9A84C]" />
                </div>
                <h4 className="text-lg font-bold text-[#F0F0F2] mb-1">{member.name}</h4>
                <p className="text-sm text-[#C9A84C] font-medium mb-1">{member.role}</p>
                <p className="text-xs text-[#8A8A9B] mb-4">{member.location}</p>
                <p className="text-sm text-[#8A8A9B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-spacing relative overflow-hidden">
        <div className="glow-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2] mb-6">
              Ready to make AI observable at runtime?
            </h2>
            <p className="text-[#8A8A9B] mb-10 leading-relaxed">
              SDK v1.0 is live. Static asset integrity available today. Live stream enforcement in v2.0.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/technology"
                className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
              >
                Explore SDK v1.0
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:contact@humaniskind.com"
                className="px-8 py-3.5 border border-[#1E1E2A] text-[#F0F0F2] font-semibold rounded-lg hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200"
              >
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
