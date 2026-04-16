import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import { ArrowRight, BookOpen, Quote, ExternalLink } from 'lucide-react';

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

const OriginsPage = () => {
  useScrollReveal();
  const { origins } = siteData;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[500px] h-[500px] top-10 left-0" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-6 font-medium">
            Origins
          </p>
          <p className="hero-subtitle text-2xl md:text-3xl text-[#8A8A9B] italic mb-8 leading-relaxed">
            {origins.intro}
          </p>
          <h1 className="hero-desc text-4xl md:text-5xl font-extrabold text-[#F0F0F2] tracking-tight leading-[1.1]">
            {origins.title}
          </h1>
        </div>
      </section>

      <div className="gold-line max-w-7xl mx-auto" />

      {/* ===== STORY ===== */}
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {origins.paragraphs.map((p, i) => (
              <p key={i} className="reveal text-lg text-[#8A8A9B] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="reveal my-16 py-10 px-8 rounded-2xl bg-[#08080C] border border-[#1E1E2A]">
            <p className="text-xl md:text-2xl text-[#F0F0F2] font-semibold leading-relaxed text-center italic">
              {origins.keyQuestion}
            </p>
          </div>

          <div className="reveal quote-line my-12">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-[#C9A84C] flex-shrink-0 mt-1" />
              <p className="text-lg text-[#C9A84C] font-medium italic">
                {origins.quote}
              </p>
            </div>
          </div>

          <p className="reveal text-lg text-[#8A8A9B] leading-relaxed mb-8">
            {origins.personalNote}
          </p>

          <p className="reveal text-lg text-[#F0F0F2] leading-relaxed font-medium mb-8">
            {origins.mission}
          </p>

          <div className="reveal my-12 py-8 px-8 rounded-2xl bg-[#111116] border border-[#C9A84C]/20">
            <p className="text-xl text-[#C9A84C] font-semibold text-center">
              {origins.sacredTraceNote}
            </p>
          </div>
        </div>
      </section>

      {/* ===== INTELLECTUAL BEDROCK ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={20} className="text-[#C9A84C]" />
              <h2 className="text-2xl font-bold text-[#F0F0F2]">
                {origins.intellectualBedrock.title}
              </h2>
            </div>
            <p className="text-lg text-[#8A8A9B] leading-relaxed mb-8">
              {origins.intellectualBedrock.text}
            </p>
            <a
              href={origins.intellectualBedrock.archiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E8D48B] font-medium transition-colors duration-200"
            >
              Explore the Personal Archive
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== CLOSING VISION ===== */}
      <section className="section-spacing relative overflow-hidden">
        <div className="glow-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          {origins.closingVision.map((line, i) => (
            <p
              key={i}
              className={`reveal reveal-delay-${i + 1} text-xl md:text-2xl ${
                i === 0 ? 'text-[#C9A84C] font-bold mb-8' : 'text-[#F0F0F2] font-semibold mb-4'
              } leading-relaxed`}
            >
              {line}
            </p>
          ))}

          <div className="reveal mt-12 flex justify-center">
            <Link
              to="/manifesto"
              className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
            >
              Read the Founders' Manifesto
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OriginsPage;
