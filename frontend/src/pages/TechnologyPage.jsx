import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  Shield, Lock, Radio, ArrowRight,
  Terminal, Database, Activity, FileCheck, Cpu
} from 'lucide-react';

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

const TechnologyPage = () => {
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
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-20"
            style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">Technology — Human Is Kind™</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-5 sm:mb-6 tracking-tight leading-[1.1]">Deterministic AI<br />Governance Infrastructure</h1>
            <p className="hero-desc text-base sm:text-lg text-white/45 max-w-3xl leading-relaxed mb-6 sm:mb-8">We provide the protocol layer that transforms probabilistic AI systems into verifiable, auditable, and human-constrained infrastructure.</p>
            <div className="hero-badges flex flex-wrap gap-2">
              {siteData.hero.badges.map((b, i) => <span key={i} className="tech-badge">{b}</span>)}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== TRINITY PROTOCOL ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Core Architecture</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">The Trinity Protocol</h2>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 lg:p-10 group`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="flex items-center gap-4">
                      <div className="icon-box w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#E8761D]" />
                      </div>
                      <div className="sm:hidden">
                        <span className="text-[10px] font-mono text-[#E8761D]/50">LAYER {layer.id}</span>
                        <h3 className="text-base font-bold text-[#111111]">{layer.name}</h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="hidden sm:block">
                        <span className="text-[10px] font-mono text-[#E8761D]/50">LAYER {layer.id}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#111111] mt-1 mb-3">{layer.name}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-4">{layer.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.tags.map((tag) => <span key={tag} className="px-3 py-1 rounded text-xs font-mono border border-[#E5E5E5] text-[#E8761D]/60 transition-colors duration-200 hover:border-[#E8761D]/40">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE FLOW ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Architecture Flow</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">From Query to Trace</h2>
          </div>
          <div className="reveal flex flex-col items-center gap-2.5 sm:gap-3">
            {siteData.architectureFlow.map((node, i) => {
              const nodeIcons = [Terminal, FileCheck, Database, Cpu, Activity, Shield];
              const NodeIcon = nodeIcons[i];
              return (
                <React.Fragment key={i}>
                  <div className="flow-node w-full max-w-md flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <NodeIcon size={16} className="text-[#E8761D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111111]">{node.label}</p>
                      <p className="text-[11px] sm:text-xs text-[#6B6B6B] font-mono">{node.sublabel}</p>
                    </div>
                  </div>
                  {i < siteData.architectureFlow.length - 1 && <div className="text-[#E8761D] text-lg">↓</div>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE ===== */}
      <section className="section-spacing bg-[#111111]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Cryptographic Core</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sacred Trace™ & Ethical Pulse</h2>
          </div>
          <div className="reveal-scale code-block p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 pulse-glow">
            <p className="text-[#E8761D] font-mono text-xs sm:text-sm md:text-base text-center break-all sm:break-normal">{siteData.sacredTrace.formula}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
            <div className="reveal pro-card-dark p-5 sm:p-6">
              <h4 className="text-sm font-bold text-white mb-4">CMCD v2 Ethical Keys</h4>
              {siteData.sacredTrace.ethicalKeys.map((ek, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <span className="text-xs font-mono text-[#E8761D] bg-[#E8761D]/10 px-2 py-0.5 rounded">{ek.key}</span>
                  {ek.values ? <div className="mt-2 space-y-1">{ek.values.map((v, j) => <p key={j} className="text-xs text-white/45 font-mono pl-3">{v}</p>)}</div>
                  : <p className="text-xs text-white/45 mt-2 pl-3">{ek.description}</p>}
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-2 pro-card-dark p-5 sm:p-6">
              <h4 className="text-sm font-bold text-white mb-4">SDK Core API</h4>
              {siteData.sacredTrace.sdkApi.map((api, i) => (
                <div key={i} className="mb-4 last:mb-0 flex gap-3">
                  <span className="text-xs font-mono text-[#E8761D] whitespace-nowrap">{api.method}</span>
                  <p className="text-xs text-white/45">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SDK CODE ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal mb-6 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Quick Integration</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">SDK v1.0 — TypeScript</h2>
          </div>
          <div className="reveal-scale code-block p-5 sm:p-6">
            <pre className="whitespace-pre-wrap text-[#CCCCCC] text-xs sm:text-sm">{siteData.sdkCode}</pre>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-5">Ready to make AI observable at runtime?</h2>
            <p className="text-[#555555] mb-8 sm:mb-10 text-sm sm:text-base">SDK v1.0 is live. Static asset integrity available today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="mailto:contact@humaniskind.com" className="btn-primary w-full sm:w-auto justify-center">Request Access <ArrowRight size={16} /></a>
              <Link to="/executive-summary" className="btn-secondary w-full sm:w-auto justify-center">Executive Summary</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
