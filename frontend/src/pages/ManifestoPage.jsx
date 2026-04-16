import React, { useEffect } from 'react';
import { siteData } from '../data/mock';
import { Quote, User, MapPin } from 'lucide-react';

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

const ManifestoPage = () => {
  useScrollReveal();
  const { manifesto, team } = siteData;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[400px] h-[400px] top-20 right-20" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-6 font-medium">
            Human Is Kind™ — Est. 2026
          </p>
          <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-[#F0F0F2] tracking-tight leading-[1.1] mb-6">
            The Founders' Manifesto
          </h1>
          <p className="hero-desc text-lg text-[#8A8A9B] leading-relaxed">
            On why deterministic governance is not a feature — it is the foundation.
          </p>
        </div>
      </section>

      <div className="gold-line max-w-7xl mx-auto" />

      {/* ===== MANIFESTO SECTIONS ===== */}
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            {manifesto.sections.map((section, i) => (
              <div key={i} className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-light text-[#C9A84C]/40 font-serif">
                    {section.number}.
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#F0F0F2]">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-5">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-lg text-[#8A8A9B] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {section.quote && (
                  <div className="mt-8 quote-line">
                    <div className="flex items-start gap-3">
                      <Quote size={18} className="text-[#C9A84C] flex-shrink-0 mt-1" />
                      <p className="text-lg text-[#C9A84C] font-medium italic">
                        {section.quote}
                      </p>
                    </div>
                  </div>
                )}

                {i < manifesto.sections.length - 1 && (
                  <div className="gold-line mt-16" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Signed By</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8`}>
                <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#C9A84C]" />
                </div>
                <h4 className="text-lg font-bold text-[#F0F0F2] mb-1">{member.name}</h4>
                <p className="text-sm text-[#C9A84C] font-medium mb-2">{member.role}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <MapPin size={12} className="text-[#8A8A9B]" />
                  <p className="text-xs text-[#8A8A9B]">{member.location}</p>
                </div>
                <p className="text-sm text-[#8A8A9B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-16">
            <p className="text-sm text-[#8A8A9B]">
              Human Is Kind™ | Est. 2026 | Montevideo — Buenos Aires
            </p>
            <p className="text-xs text-[#555566] mt-2">
              HIK™ and Sacred Trace™ are trademarks in registration. Licensed under FCL-1.0-Apache-2.0.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoPage;
