import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Shield, ArrowRight, ArrowDown, Fingerprint,
  Zap, ChevronRight, User, AlertTriangle, CheckCircle,
  Scale, DollarSign,
  Bot, Users, Radio, FileShield, Eye, ShieldCheck, Lock, Play
} from 'lucide-react';



const LOGO_V_DARK = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/7jf99bko_Logo_HIK_V_Para_Fondo_Oscuro.png.png';
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

const useCaseIcons = [User, Shield, Scale];
const regulationIcons = [AlertTriangle, DollarSign, Scale];
const verticalIcons = [Users, Bot, Radio, FileShield];
const trustBarIcons = [Eye, ShieldCheck, Scale, Lock];

// Click-to-play video card: iframe only injected on user click (no autoplay, no page weight until needed)
const VideoCard = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="reveal flex flex-col">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#E8761D] font-semibold mb-3">{video.label}</p>
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[#1C1C1C] border border-white/10"
        style={{ paddingBottom: '56.25%' }}
      >
        {playing ? (
          <iframe
            src={`${video.embedSrc}&autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
            className="absolute inset-0 w-full h-full group focus:outline-none"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#E8761D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <Play size={24} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </button>
        )}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-white mt-4 mb-2">{video.title}</h3>
      <p className="text-sm text-[#9B9B9B] leading-relaxed">{video.description}</p>
    </div>
  );
};


const HomePage = () => {
  const { t, lang } = useTranslation();
  useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
      els.forEach((el) => el.classList.add('revealed'));
    }, 50);
    return () => clearTimeout(timer);
  }, [lang]);

  const howItWorks = t.howItWorks || { title: 'How It Works', subtitle: '', steps: [] };
  const useCases = t.useCases || { title: 'Use Cases', subtitle: '', cases: [] };

  return (
    <div data-testid="home-page">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 will-change-transform"
          style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center pt-20 pb-10">
          <div className="hero-logo">
            <img src={LOGO_V_DARK} alt="Human Is Kind" className="h-32 sm:h-40 md:h-52 mx-auto mb-6 sm:mb-8 drop-shadow-2xl" />
          </div>
          <p data-testid="hero-subtitle" className="hero-subtitle text-sm sm:text-base md:text-lg text-[#E8761D] tracking-[0.06em] uppercase mb-5 font-bold leading-snug">
            {t.hero.subtitle}
          </p>
          <p data-testid="hero-description" className="hero-desc text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">{t.hero.description}</p>

          {/* Regulatory badges — outcome-focused, no acronym soup */}
          <div className="hero-badges flex flex-wrap justify-center gap-2 mb-10 sm:mb-12 px-2">
            {t.hero.badges.map((b, i) => <span key={i} className="tech-badge">{b}</span>)}
          </div>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="mailto:contact@humaniskind.com" data-testid="hero-cta-primary" className="btn-primary w-full sm:w-auto justify-center">
              {t.ui.requestDemo || t.hero.cta.primary.text} <ArrowRight size={16} />
            </a>
            <Link to="/technology" data-testid="hero-cta-secondary" className="btn-secondary-dark w-full sm:w-auto justify-center">
              {t.ui.viewArchitecture || t.hero.cta.secondary.text}
            </Link>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="scroll-indicator text-white/30 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-widest">{t.ui.scroll}</span>
            <ArrowDown size={16} />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / SOLUTION — Business Language ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            <div className="reveal pro-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-box w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Zap size={18} className="text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111]">{t.problem.title}</h3>
              </div>
              <p className="text-[#555555] leading-relaxed mb-5 text-sm sm:text-base">{t.problem.description}</p>
              <p className="text-[#E8761D] text-sm font-medium quote-line">{t.problem.highlight}</p>
            </div>
            <div className="reveal reveal-delay-2 pro-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Fingerprint size={18} className="text-[#E8761D]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111]">{t.solution.title}</h3>
              </div>
              <p className="text-[#555555] leading-relaxed mb-5 text-sm sm:text-base">{t.solution.description}</p>
              <p className="text-[#16A34A] text-sm font-medium quote-line" style={{borderColor:'#16A34A'}}>{t.solution.highlight}</p>
            </div>
          </div>
        </div>
      </section>
      {/* ===== SECTION A — SEE IT WORKING (Video Evidence) ===== */}
      <section className="section-spacing bg-[#111111]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.videoSection.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{t.videoSection.heading}</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base">{t.videoSection.subheading}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {t.videoSection.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION B — VERTICALS ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.verticals.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{t.verticals.heading}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {t.verticals.cards.map((card, i) => {
              const Icon = verticalIcons[i];
              return (
                <div key={i} className={`reveal reveal-delay-${i + 1} pro-card p-5 sm:p-6 border-l-[3px] border-l-[#E8761D] flex items-start gap-4`}>
                  <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#E8761D]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111111] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#555555] leading-relaxed">{card.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION C — EVIDENCE PACK PREVIEW ===== */}
      <section className="section-spacing bg-[#111111]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.evidencePack.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{t.evidencePack.heading}</h2>
          </div>
          <div className="reveal-scale relative">
            {/* Illustrative label */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#E8761D]/60">ILLUSTRATIVE RECEIPT &middot; NOT LIVE DATA</span>
            </div>
            {/* Receipt card */}
            <div className="code-block p-5 sm:p-6 md:p-8 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <pre className="text-[11px] sm:text-xs leading-[1.8] text-[#CCCCCC] whitespace-pre">{`HIK SACRED TRACE\u2122 RECEIPT
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
EVENT TYPE      KMIR_VIOLATION \u2014 IMMEDIATE ANCHOR
TIMESTAMP       ${new Date().toISOString()}
GATE FIRED      OUTPUT \u00b7 Layer 1 \u2014 Deterministic
POLICY          EU AI Act Art. 5(1)(f) \u00b7 agent_data_exfiltration
VIOLATION       \u201csend all logs to\u201d \u2192 BLOCKED \u00b7 REFUSE_SIGN
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
INPUT HASH      sha256:a3f2...c891  \u2713 VERIFIED
OUTPUT HASH     sha256:7b1d...04e2  \u2717 WITHHELD
CHAIN TIP       0x77f2e...9a31
MERKLE ROOT     0x882a...d441
IPFS URI        ipfs://QmX4e...8f2a
EVM TX          0xbeef...1234  [ANCHORED]
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
DECISION LAYER  DETERMINISTIC
OVERHEAD        < 1ms
POLICY HASH     sha256:f9c1...2b78
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
VERDICT         \u2588\u2588 GATE HELD \u2014 OUTPUT NEVER REACHED WORKFLOW`}</pre>
            </div>
          </div>
          <div className="reveal text-center mt-8 sm:mt-10 space-y-3">
            <p className="text-sm text-white/60 leading-relaxed">{t.evidencePack.line1}</p>
            <p className="text-sm text-white/40 leading-relaxed">{t.evidencePack.line2}</p>
            <div className="mt-6">
              <Link to="/dashboard" className="btn-secondary">{t.evidencePack.ctaLabel}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — 3 Steps, Plain Language ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{howItWorks.subtitle}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{howItWorks.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {howItWorks.steps.map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} relative pro-card p-6 sm:p-8 group`}>
                {/* Step connector line */}
                {i < howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 w-6 h-px bg-[#E8761D]/30 translate-x-3" />
                )}
                <span className="font-mono text-4xl font-extrabold text-[#E8761D]/15 block mb-4 leading-none">{step.number}</span>
                <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-3">{step.title}</h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-4">{step.description}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-[#E5E5E5]">
                  <CheckCircle size={14} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#16A34A] font-medium">{step.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{useCases.subtitle}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{useCases.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {useCases.cases.map((uc, i) => {
              const Icon = useCaseIcons[i] || Shield;
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 group`}>
                  <div className="icon-box w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#E8761D]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111] mb-3">{uc.industry}</h3>
                  <p className="text-sm text-[#555555] leading-relaxed mb-4">{uc.problem}</p>
                  <div className="pt-3 border-t border-[#F0F0F0]">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#E8761D] font-semibold mb-2">HIK solves this</p>
                    <p className="text-sm text-[#444444] leading-relaxed">{uc.hikSolves}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SACRED TRACE (Dark) — proof point ===== */}
      <section className="section-spacing bg-[#111111] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.sacredTrace.subtitle}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{t.sacredTrace.title}</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base">{t.sacredTrace.description}</p>
          </div>
          <div className="reveal-scale code-block p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 pulse-glow">
            <p className="text-[#E8761D] font-mono text-xs sm:text-sm md:text-base text-center break-all sm:break-normal">{t.sacredTrace.formula}</p>
          </div>
          <div className="reveal text-center">
            <Link to="/technology" className="inline-flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] font-medium transition-colors duration-200">
              {t.ui.viewTechSpec} <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.regulatoryLandscape}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{t.ui.whyNowTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {t.whyNow.map((item, i) => {
              const Icon = regulationIcons[i] || Scale;
              return (
                <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-5 sm:p-6 border-l-[3px] border-l-[#E8761D]`}>
                  <div className="icon-box w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#E8761D]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2">{item.regulation}</h4>
                  <p className="text-sm text-[#555555] leading-relaxed">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">{t.ui.theTeam}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">{t.ui.teamTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {t.team.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} pro-card p-6 sm:p-8 group`}>
                <div className="icon-box w-14 h-14 rounded-full bg-[#E8761D]/10 flex items-center justify-center mb-5">
                  <User size={22} className="text-[#E8761D]" />
                </div>
                <h4 className="text-lg font-bold text-[#111111] mb-1">{member.name}</h4>
                <p className="text-sm text-[#E8761D] font-medium mb-1">{member.role}</p>
                <p className="text-xs text-[#9B9B9B] mb-4">{member.location}</p>
                <p className="text-sm text-[#555555] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== SECTION D — TRUST SIGNALS BAR ===== */}
      <section className="py-6 sm:py-8 bg-[#F7F7F7] border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {t.trustBar.signals.map((signal, i) => {
              const Icon = trustBarIcons[i];
              return (
                <React.Fragment key={i}>
                  {i > 0 && <span className="hidden sm:block w-px h-4 bg-[#E5E5E5] flex-shrink-0" />}
                  <div className="flex items-center gap-1.5">
                    {Icon && <Icon size={14} className="text-[#E8761D] flex-shrink-0" />}
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] font-medium whitespace-nowrap">{signal.label}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <div className="reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] mb-5">{t.ui.readyTitle}</h2>
            <p className="text-[#555555] mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">{t.ui.readyDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="mailto:contact@humaniskind.com" className="btn-primary w-full sm:w-auto justify-center">
                {t.ui.requestDemo || t.ui.requestPitchDeck} <ArrowRight size={16} />
              </a>
              <Link to="/technology" className="btn-secondary w-full sm:w-auto justify-center">
                {t.ui.viewArchitecture || t.ui.exploreTech}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
