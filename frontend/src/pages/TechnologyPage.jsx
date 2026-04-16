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

const TechnologyPage = () => {
  useScrollReveal();

  return (
    <div>
      {/* ===== HERO (Dark) ===== */}
      <section className="relative pt-[72px] overflow-hidden">
        <div className="bg-[#2D2D2D] pt-16 pb-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="hero-title text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-5 font-semibold">
              Technology — Human Is Kind™
            </p>
            <h1 className="hero-subtitle text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Deterministic AI<br />Governance Infrastructure
            </h1>
            <p className="hero-desc text-lg text-white/50 max-w-3xl leading-relaxed mb-8">
              We provide the protocol layer that transforms probabilistic AI systems into verifiable,
              auditable, and human-constrained infrastructure.
            </p>
            <div className="hero-badges flex flex-wrap gap-2.5">
              {siteData.hero.badges.map((badge, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ===== TRINITY PROTOCOL (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Core Architecture</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">The Trinity Protocol</h2>
          </div>

          <div className="space-y-5">
            {siteData.trinityProtocol.layers.map((layer, i) => {
              const Icon = layerIcons[i];
              return (
                <div key={layer.id} className={`reveal reveal-delay-${i+1} pro-card p-8 lg:p-10`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#E8761D]" />
                      </div>
                      <div className="lg:hidden">
                        <span className="text-xs font-mono text-[#E8761D]/60">LAYER {layer.id}</span>
                        <h3 className="text-lg font-bold text-[#2D2D2D]">{layer.name}</h3>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="hidden lg:block">
                        <span className="text-xs font-mono text-[#E8761D]/60">LAYER {layer.id}</span>
                        <h3 className="text-xl font-bold text-[#2D2D2D] mt-1 mb-3">{layer.name}</h3>
                      </div>
                      <p className="text-[#6B6B6B] leading-relaxed mb-4">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded text-xs font-mono border border-[#E5E5E5] text-[#E8761D]/70">{tag}</span>
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

      {/* ===== ARCHITECTURE FLOW (Light Gray) ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Architecture Flow</p>
            <h2 className="text-3xl font-bold text-[#2D2D2D]">From Query to Trace</h2>
          </div>
          <div className="reveal flex flex-col items-center gap-3">
            {siteData.architectureFlow.map((node, i) => {
              const nodeIcons = [Terminal, FileCheck, Database, Cpu, Activity, Shield];
              const NodeIcon = nodeIcons[i];
              return (
                <React.Fragment key={i}>
                  <div className="flow-node w-full max-w-md flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <NodeIcon size={16} className="text-[#E8761D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2D2D]">{node.label}</p>
                      <p className="text-xs text-[#6B6B6B] font-mono">{node.sublabel}</p>
                    </div>
                  </div>
                  {i < siteData.architectureFlow.length - 1 && (
                    <div className="text-[#E8761D] text-lg">↓</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE (Dark) ===== */}
      <section className="section-spacing bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Cryptographic Core</p>
            <h2 className="text-3xl font-bold text-white">Sacred Trace™ & Ethical Pulse</h2>
          </div>

          <div className="reveal code-block p-6 md:p-8 mb-8">
            <p className="text-[#E8761D] font-mono text-sm md:text-base text-center">{siteData.sacredTrace.formula}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            <div className="reveal pro-card-dark p-6">
              <h4 className="text-sm font-bold text-white mb-4">CMCD v2 Ethical Keys</h4>
              {siteData.sacredTrace.ethicalKeys.map((ek, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <span className="text-xs font-mono text-[#E8761D] bg-[#E8761D]/10 px-2 py-0.5 rounded">{ek.key}</span>
                  {ek.values ? (
                    <div className="mt-2 space-y-1">
                      {ek.values.map((v, j) => <p key={j} className="text-xs text-white/50 font-mono pl-3">{v}</p>)}
                    </div>
                  ) : (
                    <p className="text-xs text-white/50 mt-2 pl-3">{ek.description}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-2 pro-card-dark p-6">
              <h4 className="text-sm font-bold text-white mb-4">SDK Core API</h4>
              {siteData.sacredTrace.sdkApi.map((api, i) => (
                <div key={i} className="mb-4 last:mb-0 flex gap-3">
                  <span className="text-xs font-mono text-[#E8761D] whitespace-nowrap">{api.method}</span>
                  <p className="text-xs text-white/50">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SDK CODE (White) ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Quick Integration</p>
            <h2 className="text-3xl font-bold text-[#2D2D2D]">SDK v1.0 — TypeScript</h2>
          </div>
          <div className="reveal code-block p-6">
            <pre className="whitespace-pre-wrap text-[#CCCCCC]">{siteData.sdkCode}</pre>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-spacing bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-[#2D2D2D] mb-5">Ready to make AI observable at runtime?</h2>
            <p className="text-[#6B6B6B] mb-10">SDK v1.0 is live. Static asset integrity available today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:contact@humaniskind.com" className="px-8 py-3.5 bg-[#E8761D] text-white font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200 flex items-center gap-2">
                Request Access <ArrowRight size={16} />
              </a>
              <Link to="/executive-summary" className="px-8 py-3.5 border border-[#E5E5E5] text-[#2D2D2D] font-semibold rounded-lg hover:border-[#E8761D] hover:text-[#E8761D] transition-all duration-200">
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
