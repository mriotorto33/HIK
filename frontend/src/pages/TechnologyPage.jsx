import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Shield, Lock, Radio, ArrowRight,
  Terminal, Database, Activity, FileCheck, Cpu, VideoIcon,
  LayoutGrid, Hash, Code, Scale
} from 'lucide-react';

const HERO_BG = '/hero-bg.png';

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

const layerIcons = [Shield, Lock, Radio, VideoIcon];



const TechnologyPage = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('architecture');

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => el.classList.add('revealed'));
    }, 50);
    return () => clearTimeout(timer);
  }, [lang, activeTab]);

  return (
    <div data-testid="technology-page">
      {/* Hero */}
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 will-change-transform opacity-20"
            style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">{t.ui.techHero}</p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-5 sm:mb-6 tracking-tight leading-[1.1] whitespace-pre-line">{t.ui.techTitle}</h1>
            <p className="hero-desc text-base sm:text-lg text-white/45 max-w-3xl leading-relaxed mb-6 sm:mb-8">{t.ui.techDesc}</p>
            {/* Technical badges here — this is the practitioner page */}
            <div className="hero-badges flex flex-wrap gap-2">
              {t.techBadges.map((b, i) => (
                <span key={i} className="tech-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-[#E5E5E5] sticky top-[64px] sm:top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {[
              { id: 'architecture', labelKey: t.techTabs.architecture, icon: LayoutGrid },
              { id: 'cryptographic', labelKey: t.techTabs.cryptographic, icon: Hash },
              { id: 'sdk', labelKey: t.techTabs.sdk, icon: Code },
              { id: 'compliance', labelKey: t.techTabs.compliance, icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  data-testid={`tech-tab-${tab.id}`}
                  onClick={() => { setActiveTab(tab.id); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#E8761D] text-[#E8761D]'
                      : 'border-transparent text-[#6B6B6B] hover:text-[#111111] hover:border-[#E5E5E5]'
                  }`}
                >
                  <Icon size={14} />
                  {tab.labelKey}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TAB: ARCHITECTURE ===== */}
      {activeTab === 'architecture' && (
        <>
          <section className="section-spacing bg-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="reveal mb-10 sm:mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.coreArchitecture}</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{t.trinityProtocol.title}</h2>
              </div>
              <div className="space-y-4 sm:space-y-5">
                {t.trinityProtocol.layers.map((layer, i) => {
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

          {/* Enforcement Flow */}
          <section className="section-spacing bg-[#F7F7F7]">
            <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="reveal mb-8 sm:mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.architectureFlowLabel}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">{t.ui.architectureFlowTitle}</h2>
              </div>
              <div className="reveal flex flex-col items-center gap-2.5 sm:gap-3">
                {t.architectureFlow.map((node, i) => {
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
                      {i < t.architectureFlow.length - 1 && <div className="text-[#E8761D] text-lg">↓</div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== TAB: CRYPTOGRAPHIC CORE ===== */}
      {activeTab === 'cryptographic' && (
        <section className="section-spacing bg-[#111111]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="reveal mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.cryptographicCore}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.ui.sacredTraceEthical}</h2>
            </div>
            <div className="reveal-scale code-block p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 pulse-glow">
              <p className="text-[#E8761D] font-mono text-xs sm:text-sm md:text-base text-center break-all sm:break-normal">{t.sacredTrace.formula}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="reveal pro-card-dark p-5 sm:p-6">
                <h4 className="text-sm font-bold text-white mb-4">{t.techUi.integritySchema}</h4>
                {t.sacredTrace.ethicalKeys.map((ek, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <span className="text-xs font-mono text-[#E8761D] bg-[#E8761D]/10 px-2 py-0.5 rounded">{ek.key}</span>
                    {ek.values ? <div className="mt-2 space-y-1">{ek.values.map((v, j) => <p key={j} className="text-xs text-white/45 font-mono pl-3">{v}</p>)}</div>
                    : <p className="text-xs text-white/45 mt-2 pl-3">{ek.description}</p>}
                  </div>
                ))}
              </div>
              <div className="reveal reveal-delay-2 pro-card-dark p-5 sm:p-6">
                <h4 className="text-sm font-bold text-white mb-4">{t.techUi.apiEndpoints}</h4>
                {t.sacredTrace.sdkApi.map((api, i) => (
                  <div key={i} className="mb-4 last:mb-0 flex gap-3">
                    <span className="text-xs font-mono text-[#E8761D] whitespace-nowrap">{api.method}</span>
                    <p className="text-xs text-white/45">{api.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic design note */}
            <div className="reveal pro-card-dark p-5 sm:p-6">
              <h4 className="text-sm font-bold text-white mb-4">{t.cryptographicDesign.title}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{t.cryptographicDesign.desc}</p>
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB: SDK / INTEGRATION ===== */}
      {activeTab === 'sdk' && (
        <>
          <section className="section-spacing bg-white">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="reveal mb-6 sm:mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.quickIntegration}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">{t.integrationTab.title}</h2>
                <p className="text-[#555555] mt-3 text-sm sm:text-base leading-relaxed">{t.integrationTab.desc}</p>
              </div>
              <div className="reveal-scale code-block p-5 sm:p-6">
                <pre className="whitespace-pre-wrap text-[#CCCCCC] text-xs sm:text-sm">{t.sdkCode}</pre>
              </div>
            </div>
          </section>

          <section className="section-spacing bg-[#F7F7F7]">
            <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="reveal mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">{t.integrationTab.deploymentTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.integrationTab.options.map((opt, i) => (
                  <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6`}>
                    <h3 className="text-sm font-bold text-[#111111] mb-2">{opt.title}</h3>
                    <p className="text-xs text-[#555555] leading-relaxed mb-3">{opt.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {opt.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono border border-[#E5E5E5] text-[#6B6B6B]">{tag}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===== TAB: COMPLIANCE MAPPING ===== */}
      {activeTab === 'compliance' && (
        <section className="section-spacing bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="reveal mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.techUi.regulatoryCoverage}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">{t.techUi.mappingTitle}</h2>
              <p className="text-[#555555] mt-3 text-sm leading-relaxed max-w-2xl">{t.techUi.mappingDesc}</p>
            </div>
            <div className="reveal space-y-4">
              {t.complianceRows.map((row, i) => (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-shrink-0 sm:w-48">
                      <span className="inline-block px-2 py-1 rounded text-[10px] font-mono font-bold border border-[#E8761D]/30 text-[#E8761D] bg-orange-50">{row.regulation}</span>
                      <p className="text-xs text-[#6B6B6B] mt-1.5">{row.scope}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#333333] leading-relaxed">{row.hikEnforcement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-5">{t.ui.readyTitle}</h2>
            <p className="text-[#555555] mb-8 sm:mb-10 text-sm sm:text-base">{t.ui.readyDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="mailto:contact@humaniskind.com" className="btn-primary w-full sm:w-auto justify-center">{t.ui.requestAccess} <ArrowRight size={16} /></a>
              <Link to="/executive-summary" className="btn-secondary w-full sm:w-auto justify-center">{t.ui.executiveSummary}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
