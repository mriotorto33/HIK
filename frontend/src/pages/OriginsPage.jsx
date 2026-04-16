import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import { ArrowRight, BookOpen, Quote, ExternalLink } from 'lucide-react';

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

const OriginsPage = () => {
  useScrollReveal();
  const { origins } = siteData;

  return (
    <div>
      {/* ===== HERO (Dark) ===== */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="bg-[#2D2D2D] pt-16 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-5 font-semibold">Origins</p>
            <p className="hero-subtitle text-2xl md:text-3xl text-white/50 italic mb-6 leading-relaxed">{origins.intro}</p>
            <h1 className="hero-desc text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">{origins.title}</h1>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== STORY (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-5">
            {origins.paragraphs.map((p, i) => (
              <p key={i} className="reveal text-lg text-[#6B6B6B] leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="reveal my-14 py-8 px-8 rounded-xl bg-[#F8F8F8] border border-[#E5E5E5]">
            <p className="text-xl md:text-2xl text-[#2D2D2D] font-semibold leading-relaxed text-center italic">{origins.keyQuestion}</p>
          </div>

          <div className="reveal quote-line my-10">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-[#E8761D] flex-shrink-0 mt-1" />
              <p className="text-lg text-[#E8761D] font-medium italic">{origins.quote}</p>
            </div>
          </div>

          <p className="reveal text-lg text-[#6B6B6B] leading-relaxed mb-8">{origins.personalNote}</p>
          <p className="reveal text-lg text-[#2D2D2D] leading-relaxed font-medium mb-8">{origins.mission}</p>

          <div className="reveal my-10 py-6 px-8 rounded-xl bg-orange-50 border border-[#E8761D]/20">
            <p className="text-xl text-[#E8761D] font-semibold text-center">{origins.sacredTraceNote}</p>
          </div>
        </div>
      </section>

      {/* ===== INTELLECTUAL BEDROCK (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen size={20} className="text-[#E8761D]" />
              <h2 className="text-2xl font-bold text-[#2D2D2D]">{origins.intellectualBedrock.title}</h2>
            </div>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-6">{origins.intellectualBedrock.text}</p>
            <a href={origins.intellectualBedrock.archiveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#E8761D] hover:text-[#D06A18] font-medium transition-colors">
              Explore the Personal Archive <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== CLOSING VISION (Dark) ===== */}
      <section className="section-spacing bg-[#2D2D2D]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          {origins.closingVision.map((line, i) => (
            <p key={i} className={`reveal reveal-delay-${i+1} text-xl md:text-2xl ${i === 0 ? 'text-[#E8761D] font-bold mb-6' : 'text-white font-semibold mb-4'} leading-relaxed`}>
              {line}
            </p>
          ))}
          <div className="reveal mt-10 flex justify-center">
            <Link to="/manifesto" className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
              Read the Founders' Manifesto <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OriginsPage;
