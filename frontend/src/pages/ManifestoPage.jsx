import React, { useEffect } from 'react';
import { siteData } from '../data/mock';
import { Quote, User, MapPin } from 'lucide-react';

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

const ManifestoPage = () => {
  useScrollReveal();
  const { manifesto, team } = siteData;

  return (
    <div>
      {/* ===== HERO (Dark) ===== */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="bg-[#2D2D2D] pt-16 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-5 font-semibold">
              Human Is Kind™ — Est. 2026
            </p>
            <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
              The Founders' Manifesto
            </h1>
            <p className="hero-desc text-lg text-white/50 leading-relaxed">
              On why deterministic governance is not a feature — it is the foundation.
            </p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== MANIFESTO SECTIONS (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {manifesto.sections.map((section, i) => (
              <div key={i} className="reveal">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-light text-[#E8761D]/30 font-serif">{section.number}.</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-lg text-[#6B6B6B] leading-relaxed">{para}</p>
                  ))}
                </div>
                {section.quote && (
                  <div className="mt-6 quote-line">
                    <div className="flex items-start gap-3">
                      <Quote size={18} className="text-[#E8761D] flex-shrink-0 mt-1" />
                      <p className="text-lg text-[#E8761D] font-medium italic">{section.quote}</p>
                    </div>
                  </div>
                )}
                {i < manifesto.sections.length - 1 && <div className="subtle-line mt-14" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Signed By</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-8`}>
                <div className="w-14 h-14 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#E8761D]" />
                </div>
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-2">{member.role}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={12} className="text-[#9B9B9B]" />
                  <p className="text-xs text-[#9B9B9B]">{member.location}</p>
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="reveal text-center mt-12">
            <p className="text-sm text-[#6B6B6B]">Human Is Kind™ | Est. 2026 | Montevideo — Buenos Aires</p>
            <p className="text-xs text-[#9B9B9B] mt-2">
              HIK™ and Sacred Trace™ are trademarks in registration. Licensed under FCL-1.0-Apache-2.0.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoPage;
