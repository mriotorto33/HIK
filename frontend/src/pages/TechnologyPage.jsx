import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../data/mock';
import {
  Shield, Lock, Radio, ArrowRight, ChevronRight,
  Terminal, Database, Activity, FileCheck, Cpu
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

const layerIcons = [Shield, Lock, Radio];

const TechnologyPage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="glow-gold w-[500px] h-[500px] top-20 right-0" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-6 font-medium">
            Technology — Human Is Kind™
          </p>
          <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-[#F0F0F2] mb-6 tracking-tight leading-[1.1]">
            Deterministic AI<br />Governance Infrastructure
          </h1>
          <p className="hero-desc text-lg text-[#8A8A9B] max-w-3xl leading-relaxed mb-10">
            We provide the protocol layer that transforms probabilistic AI systems into verifiable,
            auditable, and human-constrained infrastructure. Ethics is not a feature — it is the design constraint.
          </p>
          <div className="hero-badges flex flex-wrap gap-2.5">
            {siteData.hero.badges.map((badge, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#1E1E2A] text-[#8A8A9B] bg-[#111116]/80">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line max-w-7xl mx-auto" />

      {/* ===== TRINITY PROTOCOL ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Core Architecture</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F2]">The Trinity Protocol</h2>
          </div>

          <div className="space-y-6">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-8 lg:p-10`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#C9A84C]" />
                      </div>
                      <div className="lg:hidden">
                        <span className="text-xs font-mono text-[#C9A84C]/60">LAYER {layer.id}</span>
                        <h3 className="text-lg font-bold text-[#F0F0F2]">{layer.name}</h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="hidden lg:block">
                        <span className="text-xs font-mono text-[#C9A84C]/60">LAYER {layer.id}</span>
                        <h3 className="text-xl font-bold text-[#F0F0F2] mt-1 mb-3">{layer.name}</h3>
                      </div>
                      <p className="text-[#8A8A9B] leading-relaxed mb-5">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded text-xs font-mono border border-[#1E1E2A] text-[#C9A84C]/70">
                            {tag}
                          </span>
                        ))}
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
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Architecture Flow</p>
            <h2 className="text-3xl font-bold text-[#F0F0F2]">From Query to Trace</h2>
          </div>

          <div className="reveal flex flex-col items-center gap-3">
            {siteData.architectureFlow.map((node, i) => {
              const nodeIcons = [Terminal, FileCheck, Database, Cpu, Activity, Shield];
              const NodeIcon = nodeIcons[i];
              return (
                <React.Fragment key={i}>
                  <div className="flow-node w-full max-w-md flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                      <NodeIcon size={16} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#F0F0F2]">{node.label}</p>
                      <p className="text-xs text-[#8A8A9B] font-mono">{node.sublabel}</p>
                    </div>
                  </div>
                  {i < siteData.architectureFlow.length - 1 && (
                    <div className="flow-arrow">↓</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE & ETHICAL PULSE ===== */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Cryptographic Core</p>
            <h2 className="text-3xl font-bold text-[#F0F0F2]">Sacred Trace™ & Ethical Pulse</h2>
          </div>

          <div className="reveal code-block p-6 md:p-8 mb-10">
            <p className="text-[#C9A84C] font-mono text-sm md:text-base text-center">
              {siteData.sacredTrace.formula}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="reveal glass-card rounded-xl p-6">
              <h4 className="text-sm font-bold text-[#F0F0F2] mb-4">CMCD v2 Ethical Keys</h4>
              {siteData.sacredTrace.ethicalKeys.map((ek, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <span className="text-xs font-mono text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded">{ek.key}</span>
                  {ek.values ? (
                    <div className="mt-2 space-y-1">
                      {ek.values.map((v, j) => (
                        <p key={j} className="text-xs text-[#8A8A9B] font-mono pl-3">{v}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8A8A9B] mt-2 pl-3">{ek.description}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-2 glass-card rounded-xl p-6">
              <h4 className="text-sm font-bold text-[#F0F0F2] mb-4">SDK Core API</h4>
              {siteData.sacredTrace.sdkApi.map((api, i) => (
                <div key={i} className="mb-4 last:mb-0 flex gap-3">
                  <span className="text-xs font-mono text-[#C9A84C] whitespace-nowrap">{api.method}</span>
                  <p className="text-xs text-[#8A8A9B]">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SDK CODE ===== */}
      <section className="section-spacing bg-[#08080C]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C9A84C] mb-4 font-medium">Quick Integration</p>
            <h2 className="text-3xl font-bold text-[#F0F0F2]">SDK v1.0 — TypeScript</h2>
          </div>

          <div className="reveal code-block p-6">
            <pre className="whitespace-pre-wrap text-[#A0A0B0]">{siteData.sdkCode}</pre>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing relative overflow-hidden">
        <div className="glow-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-[#F0F0F2] mb-6">
              Ready to make AI observable at runtime?
            </h2>
            <p className="text-[#8A8A9B] mb-10">
              SDK v1.0 is live. Static asset integrity available today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contact@humaniskind.com"
                className="px-8 py-3.5 bg-[#C9A84C] text-[#0B0B0F] font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200 flex items-center gap-2"
              >
                Request Access
                <ArrowRight size={16} />
              </a>
              <Link
                to="/executive-summary"
                className="px-8 py-3.5 border border-[#1E1E2A] text-[#F0F0F2] font-semibold rounded-lg hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200"
              >
                Executive Summary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
