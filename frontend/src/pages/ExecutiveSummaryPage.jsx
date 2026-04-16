import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  AlertTriangle, Shield, Scale, ArrowRight, Cpu,
  User, FileText, Hash, Layers, Globe, Timer, Lock
} from 'lucide-react';

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

const ExecutiveSummaryPage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[400px] h-[400px] top-20 right-10" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-6 font-medium">
            Executive Summary
          </p>
          <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-[#F0F0F2] tracking-tight leading-[1.1] mb-4">
            HumanisKind (HIK)
          </h1>
          <p className="hero-desc text-xl text-[#C9A84C] font-medium">
            Deterministic AI Governance Infrastructure
          </p>
        </div>
      </section>

      <div className="gold-line max-w-7xl mx-auto" />

      {/* ===== PROBLEM ===== */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#F0F0F2]">The Problem</h2>
            </div>
            <p className="text-lg text-[#8A8A9B] leading-relaxed mb-6">
              {siteData.problem.description}
            </p>
            <p className="text-[#C9A84C] font-medium quote-line">
              {siteData.problem.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                <Shield size={18} className="text-[#C9A84C]" />
              </div>
              <h2 className="text-2xl font-bold text-[#F0F0F2]">The Solution</h2>
            </div>
            <p className="text-lg text-[#8A8A9B] leading-relaxed mb-6">
              HIK is a model-agnostic middleware layer that intercepts every AI interaction at the output
              boundary — before it reaches any workflow. At the moment of enforcement, it generates a
              <span className="text-[#C9A84C] font-medium"> Sacred Trace™</span>: an immutable cryptographic
              receipt anchoring the query, the policy manifest, the source corpus, and the AI output into
              a single verifiable chain.
            </p>
            <p className="text-[#34D399] font-medium quote-line" style={{ borderColor: '#34D399' }}>
              {siteData.solution.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Scale size={20} className="text-[#C9A84C]" />
              <h2 className="text-2xl font-bold text-[#F0F0F2]">Why Now</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.whyNow.map((item, i) => {
              const icons = [FileText, Scale, Lock];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6`}>
                  <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-[#C9A84C]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#C9A84C] mb-3">{item.regulation}</h4>
                  <p className="text-sm text-[#8A8A9B] leading-relaxed">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT HIK PRODUCES ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <h2 className="text-2xl font-bold text-[#F0F0F2]">What HIK Produces</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {siteData.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Cpu];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6 flex items-start gap-4`}>
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F0F0F2] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#8A8A9B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATUS ===== */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
              <h3 className="text-lg font-bold text-[#F0F0F2]">Current Status</h3>
            </div>
            <p className="text-[#8A8A9B] leading-relaxed">
              SDK v1.0 live. GATE 1 / GATE 2 enforcement live. Running on Gemini 2.5 Flash.
              IPFS pinning and private EVM node on GCP active. Go core binary (Phase 3, sub-millisecond)
              in active development.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <h2 className="text-2xl font-bold text-[#F0F0F2]">Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteData.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} glass-card rounded-xl p-6`}>
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                  <User size={20} className="text-[#C9A84C]" />
                </div>
                <h4 className="text-base font-bold text-[#F0F0F2] mb-1">{member.name}</h4>
                <p className="text-sm text-[#C9A84C] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[#8A8A9B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing relative overflow-hidden">
        <div className="glow-gold w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-[#F0F0F2] mb-10">
              Interested in learning more?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contact@humaniskind.com"
                className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
              >
                Request Pitch Deck
                <ArrowRight size={16} />
              </a>
              <Link
                to="/technology"
                className="px-8 py-3.5 border border-[#1E1E2A] text-[#F0F0F2] font-semibold rounded-lg hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200"
              >
                Explore Technology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveSummaryPage;
