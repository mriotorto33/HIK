import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  Shield, Lock, Radio, ArrowRight, Fingerprint,
  Layers, Zap, Globe, ChevronRight, Hash, User
} from 'lucide-react';

const LOGO_V = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/4vhx0ajk_Logo_HIK_V.png';

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

const layerIcons = [Shield, Lock, Radio];

const HomePage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO (Dark Graphite) ===== */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#2D2D2D] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize:'32px 32px'}} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="hero-title">
            <img src={LOGO_V} alt="Human Is Kind" className="h-36 md:h-48 mx-auto mb-8" />
          </div>

          <p className="hero-subtitle text-sm sm:text-base text-[#E8761D] tracking-[0.3em] uppercase mb-6 font-semibold">
            {siteData.hero.subtitle}
          </p>

          <p className="hero-desc text-base sm:text-lg text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            {siteData.hero.description}
          </p>

          <div className="hero-badges flex flex-wrap justify-center gap-2.5 mb-12">
            {siteData.hero.badges.map((badge, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50 bg-white/5 hover:border-[#E8761D]/40 hover:text-[#E8761D] transition-all duration-300">
                {badge}
              </span>
            ))}
          </div>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={siteData.hero.cta.primary.link} className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
              {siteData.hero.cta.primary.text}
              <ArrowRight size={16} />
            </Link>
            <Link to={siteData.hero.cta.secondary.link} className="px-8 py-3.5 border border-white/20 text-white font-semibold rounded-lg hover:border-[#E8761D]/50 hover:text-[#E8761D] transition-all duration-200">
              {siteData.hero.cta.secondary.text}
            </Link>
          </div>
        </div>
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== PROBLEM / SOLUTION (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="reveal pro-card p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Zap size={18} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D]">{siteData.problem.title}</h3>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">{siteData.problem.description}</p>
              <p className="text-[#E8761D] text-sm font-medium quote-line">{siteData.problem.highlight}</p>
            </div>

            <div className="reveal reveal-delay-2 pro-card p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Fingerprint size={18} className="text-[#E8761D]" />
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D]">{siteData.solution.title}</h3>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">{siteData.solution.description}</p>
              <p className="text-[#16A34A] text-sm font-medium quote-line" style={{borderColor:'#16A34A'}}>{siteData.solution.highlight}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT HIK PRODUCES (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">What HIK Produces</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">Verifiable AI at Runtime</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {siteData.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Zap];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6`}>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#E8761D]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#2D2D2D] mb-2">{item.title}</h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRINITY PROTOCOL (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{siteData.trinityProtocol.subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">{siteData.trinityProtocol.title}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i+1} pro-card p-8 group`}>
                  <span className="text-xs font-mono text-[#E8761D]/60 block mb-1">LAYER {layer.id}</span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-[#E8761D]/10 transition-colors">
                      <Icon size={18} className="text-[#E8761D]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2D2D2D]">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded text-[10px] font-mono border border-[#E5E5E5] text-[#6B6B6B]">{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE (Dark) ===== */}
      <section className="section-spacing bg-[#1C1C1C] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{siteData.sacredTrace.subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{siteData.sacredTrace.title}</h2>
            <p className="text-white/50 max-w-2xl mx-auto">{siteData.sacredTrace.description}</p>
          </div>
          <div className="reveal code-block p-6 md:p-8 mb-8">
            <p className="text-[#E8761D] font-mono text-sm md:text-base text-center">{siteData.sacredTrace.formula}</p>
          </div>
          <div className="reveal text-center">
            <Link to="/technology" className="inline-flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] font-medium transition-colors duration-200">
              View full technical specification <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Regulatory Landscape</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">Why Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.whyNow.map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 border-l-[3px] border-l-[#E8761D]`}>
                <h4 className="text-sm font-bold text-[#2D2D2D] mb-2">{item.regulation}</h4>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">The Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">Three People. Three Continents. One Protocol.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-8`}>
                <div className="w-14 h-14 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#E8761D]" />
                </div>
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-1">{member.role}</p>
                <p className="text-xs text-[#9B9B9B] mb-4">{member.location}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-5">Ready to make AI observable at runtime?</h2>
            <p className="text-[#6B6B6B] mb-10 leading-relaxed">SDK v1.0 is live. Static asset integrity available today. Live stream enforcement in v2.0.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/technology" className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
                Explore SDK v1.0 <ArrowRight size={16} />
              </Link>
              <a href="mailto:contact@humaniskind.com" className="px-8 py-3.5 border border-[#E5E5E5] text-[#2D2D2D] font-semibold rounded-lg hover:border-[#E8761D] hover:text-[#E8761D] transition-all duration-200">
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
