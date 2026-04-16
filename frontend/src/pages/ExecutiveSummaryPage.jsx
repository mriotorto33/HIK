import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  AlertTriangle, Shield, Scale, ArrowRight, Cpu,
  User, FileText, Hash, Layers, Globe, Lock
} from 'lucide-react';

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

const ExecutiveSummaryPage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO (Dark) ===== */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="bg-[#2D2D2D] pt-16 pb-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-5 font-semibold">Executive Summary</p>
            <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">HumanisKind (HIK)</h1>
            <p className="hero-desc text-xl text-[#E8761D] font-medium">Deterministic AI Governance Infrastructure</p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== PROBLEM & SOLUTION (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
          <div className="reveal pro-card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D2D2D]">The Problem</h2>
            </div>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-5">{siteData.problem.description}</p>
            <p className="text-[#E8761D] font-medium quote-line">{siteData.problem.highlight}</p>
          </div>

          <div className="reveal pro-card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Shield size={18} className="text-[#E8761D]" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D2D2D]">The Solution</h2>
            </div>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-5">
              HIK is a model-agnostic middleware layer that intercepts every AI interaction at the output
              boundary — before it reaches any workflow. At the moment of enforcement, it generates a
              <span className="text-[#E8761D] font-medium"> Sacred Trace™</span>: an immutable cryptographic
              receipt.
            </p>
            <p className="text-[#16A34A] font-medium quote-line" style={{borderColor:'#16A34A'}}>{siteData.solution.highlight}</p>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal flex items-center gap-3 mb-10">
            <Scale size={20} className="text-[#E8761D]" />
            <h2 className="text-2xl font-bold text-[#2D2D2D]">Why Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siteData.whyNow.map((item, i) => {
              const icons = [FileText, Scale, Lock];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 border-l-[3px] border-l-[#E8761D]`}>
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#E8761D]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#2D2D2D] mb-2">{item.regulation}</h4>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT HIK PRODUCES (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-10"><h2 className="text-2xl font-bold text-[#2D2D2D]">What HIK Produces</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {siteData.whatHikProduces.map((item, i) => {
              const icons = [Hash, Layers, Globe, Cpu];
              const Icon = icons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 flex items-start gap-4`}>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#E8761D]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2D2D2D] mb-1">{item.title}</h4>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATUS (Graphite) ===== */}
      <section className="py-12 bg-[#3D3D3D]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal flex items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#16A34A] animate-pulse" />
              <h3 className="text-lg font-bold text-white">Current Status</h3>
            </div>
          </div>
          <p className="reveal text-white/60 leading-relaxed mt-4">
            SDK v1.0 live. GATE 1 / GATE 2 enforcement live. Running on Gemini 2.5 Flash.
            IPFS pinning and private EVM node on GCP active. Go core binary in active development.
          </p>
        </div>
      </section>

      {/* ===== TEAM (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-10"><h2 className="text-2xl font-bold text-[#2D2D2D]">Team</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siteData.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6`}>
                <div className="w-12 h-12 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-4">
                  <User size={20} className="text-[#E8761D]" />
                </div>
                <h4 className="text-base font-bold text-[#2D2D2D] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-8">Interested in learning more?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:contact@humaniskind.com" className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
                Request Pitch Deck <ArrowRight size={16} />
              </a>
              <Link to="/technology" className="px-8 py-3.5 border border-[#E5E5E5] text-[#2D2D2D] font-semibold rounded-lg hover:border-[#E8761D] hover:text-[#E8761D] transition-all duration-200">
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
