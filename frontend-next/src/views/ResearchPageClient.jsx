'use client';

import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, BookOpen, Shield, TrendingUp, Lock, Book } from 'lucide-react';

const HERO_BG = '/hero-bg.png';

const useScrollReveal = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 150);
    return () => clearTimeout(timer);
  }, []);
};

const papers = [
  {
    number: '01',
    icon: Shield,
    badge: 'Architecture · Model',
    doi: '10.5281/zenodo.21710655',
    doiUrl: 'https://doi.org/10.5281/zenodo.21710655',
    zenodoUrl: 'https://zenodo.org/records/21710655',
    title: 'HIK Architecture — Deterministic AI Governance Infrastructure',
    date: 'July 30, 2026',
    abstract:
      'Documents the foundational architecture of the HIK SDK: a Zero Trust, Fail-Close cryptographic middleware protocol for deterministic AI governance. The system intercepts every AI interaction at dual policy enforcement gates — before the request reaches the model (Gate 1) and before the response reaches the workflow (Gate 2) — issuing an immutable Sacred Trace™ cryptographic compliance receipt anchored on IPFS and an EVM-compatible blockchain.',
    highlights: [
      'Dual-Gate Fail-Close enforcement architecture',
      'C2PA 2.3 cryptographic content provenance',
      'Blockchain-anchored Merkle root receipts (Polygon / Ethereum)',
      'Sub-millisecond policy evaluation latency in production',
      'Kubernetes Sidecar · Cloud Run · Chrome Extension deployments',
    ],
    color: '#E8761D',
  },
  {
    number: '02',
    icon: BookOpen,
    badge: 'Project Milestone',
    doi: '10.5281/zenodo.21710775',
    doiUrl: 'https://doi.org/10.5281/zenodo.21710775',
    zenodoUrl: 'https://zenodo.org/records/21710775',
    title: 'A Deterministic Infrastructure Approach to AI Governance and Regulatory Compliance',
    date: 'July 31, 2026',
    abstract:
      'Presents a formal specification of the HIK deterministic governance middleware, demonstrating how a dual-gate proxy architecture satisfies the transparency obligations of the EU AI Act (Articles 5 and 50), NYC Local Law 144, and GDPR Article 22. Unlike probabilistic content filters, the system provides court-admissible cryptographic compliance receipts at every enforcement event — with sub-50ms gate overhead at the 95th percentile.',
    highlights: [
      'EU AI Act Art. 5 & 50 — hard enforcement + cryptographic disclosure',
      'NYC Local Law 144 — deterministic PII gate for hiring AI',
      'GDPR Art. 22 — verifiable explainability trail for automated decisions',
      'GDPR Art. 5(1)(e) — hash-only storage, raw content never persisted',
      'Live Stream Kill-Switch demonstrated in real production environments',
    ],
    color: '#E8761D',
  },
  {
    number: '03',
    icon: TrendingUp,
    badge: 'Project Milestone',
    doi: '10.5281/zenodo.21710856',
    doiUrl: 'https://doi.org/10.5281/zenodo.21710856',
    zenodoUrl: 'https://zenodo.org/records/21710856',
    title: 'Runtime Enforcement as a Precondition for SEC Approval of a Tokenized ETF',
    date: 'July 31, 2026',
    abstract:
      'Argues that the SEC\'s approval of a tokenized exchange-traded fund — where the fund share itself is a programmable on-chain token — is functionally contingent on the existence of deterministic, verifiable runtime enforcement infrastructure at the fund and custody layer. Analyzes global macroeconomic implications including effects on dollar hegemony, emerging market capital flows, DTCC disintermediation, and sovereign wealth portfolio construction.',
    highlights: [
      'Transfer Gate — atomic AML/KYC enforcement on every token transfer',
      'Position Gate — real-time CFTC position limit enforcement on-chain',
      'NAV Gate — cryptographically signed NAV attestation at each calculation',
      'OFAC screening as a structural precondition for global USD-token access',
      'Multi-regulator receipt tagging: SEC · CFTC · FinCEN simultaneously',
    ],
    color: '#E8761D',
  },
];

const ResearchPageClient = () => {
  useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div data-testid="research-page">
      {/* ── Hero ── */}
      <section className="relative pt-16 sm:pt-[72px] overflow-hidden">
        <div className="relative bg-[#1C1C1C] pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div
            className="absolute inset-0 will-change-transform opacity-15"
            style={{
              backgroundImage: `url(${HERO_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="hero-subtitle text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-4 sm:mb-5 font-semibold">
              Research & Publications
            </p>
            <h1 className="hero-desc text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-5">
              Peer-Reviewed Research
            </h1>
            <p className="hero-desc text-base sm:text-lg text-white/45 leading-relaxed max-w-2xl">
              Three papers documenting the theoretical foundations, regulatory mappings, and global economic
              implications of the HIK deterministic AI governance infrastructure. Published on Zenodo under CC BY 4.0.
            </p>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#E8761D] to-transparent" />
      </section>

      {/* ── Featured Kindle Book ── */}
      <section className="bg-[#FAF9F6] border-b border-[#EAEAEA] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 reveal">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8761D]/15 text-[#E8761D] text-xs font-bold uppercase tracking-wider">
              <Book size={13} />
              Featured Kindle Edition
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3">
            New Publication on Amazon Kindle
          </h2>
          <p className="text-base sm:text-lg text-[#555555] mb-6 leading-relaxed">
            Explore the latest book publication by Martín Riotorto. Preview the text live below or read directly on Amazon Kindle.
          </p>

          <div className="w-full rounded-2xl overflow-hidden border border-[#E0E0E0] shadow-md bg-white mb-6">
            <iframe
              type="text/html"
              width="100%"
              height="550"
              src="https://read.amazon.com/kp/card?preview=inline&linkCode=kpt&ref_=cm_sw_r_kb_dp_&asin=B0HCLW5FR3"
              frameBorder="0"
              className="w-full min-h-[480px] sm:min-h-[550px]"
              title="Amazon Kindle Preview - B0HCLW5FR3"
              allowFullScreen
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.amazon.com/dp/B0HCLW5FR3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E8761D] text-white text-sm font-semibold hover:bg-[#cf6518] transition-colors shadow-sm"
            >
              <ExternalLink size={15} />
              View & Buy on Amazon Kindle
            </a>
            <span className="text-xs text-[#888888]">ASIN: B0HCLW5FR3 · Kindle Edition</span>
          </div>
        </div>
      </section>

      {/* ── Papers ── */}
      <section className="section-spacing bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {papers.map((paper, i) => {
              const Icon = paper.icon;
              return (
                <article key={i} className="reveal">
                  {/* Header row */}
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <span className="text-5xl sm:text-6xl font-light text-[#E8761D]/20 font-serif leading-none select-none">
                      {paper.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8761D]/10 text-[#E8761D] text-xs font-semibold uppercase tracking-wide">
                          <Icon size={11} />
                          {paper.badge}
                        </span>
                        <span className="text-xs text-[#9B9B9B]">{paper.date}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] leading-snug">
                        {paper.title}
                      </h2>
                    </div>
                  </div>

                  {/* DOI badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <FileText size={13} className="text-[#9B9B9B] flex-shrink-0" />
                    <a
                      href={paper.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#555555] hover:text-[#E8761D] transition-colors font-mono"
                    >
                      DOI: {paper.doi}
                    </a>
                  </div>

                  {/* Abstract */}
                  <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-6">
                    {paper.abstract}
                  </p>

                  {/* Key highlights */}
                  <div className="bg-[#F7F7F7] rounded-xl p-5 sm:p-6 mb-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#E8761D] font-semibold mb-4">
                      Key Contributions
                    </p>
                    <ul className="space-y-2.5">
                      {paper.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#E8761D] flex-shrink-0" />
                          <span className="text-sm sm:text-base text-[#444444] leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Access notice */}
                  <div className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-lg bg-[#FFF8F3] border border-[#E8761D]/20">
                    <Lock size={13} className="text-[#E8761D] flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-[#7A5C3A] leading-snug">
                      <span className="font-semibold text-[#E8761D]">Restricted on Zenodo</span>
                      {' '}— metadata is public and indexed. Full paper access is available to{' '}
                      <span className="font-semibold">HIK subscribers</span>.
                      Contact{' '}
                      <a href="mailto:contact@humaniskind.com" className="underline hover:text-[#E8761D] transition-colors">
                        contact@humaniskind.com
                      </a>
                      {' '}to request access.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={paper.zenodoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E8761D] text-white text-sm font-semibold hover:bg-[#cf6518] transition-colors"
                    >
                      <ExternalLink size={14} />
                      View on Zenodo
                    </a>
                    <a
                      href={paper.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E0E0E0] text-[#444444] text-sm font-semibold hover:border-[#E8761D] hover:text-[#E8761D] transition-colors"
                    >
                      Cite via DOI
                    </a>
                  </div>

                  {i < papers.length - 1 && <div className="subtle-line mt-14 sm:mt-16" />}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <section className="section-spacing bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E8761D] mb-3 font-semibold">Access Policy</p>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto">
            Paper metadata is publicly indexed on{' '}
            <a
              href="https://zenodo.org/search?q=parent.access.owned_by.user:1791153"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8761D] hover:underline"
            >
              Zenodo
            </a>
            . Full-text access to the PDFs is restricted to{' '}
            <span className="font-semibold text-[#333]">HIK subscribers</span>.
            Papers are licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8761D] hover:underline"
            >
              CC BY 4.0
            </a>
            {' '}— free to cite and share with attribution.
          </p>
          <p className="text-sm text-[#9B9B9B] mt-4">
            Author: Martín Riotorto · Human Is Kind™ © 2026 · Montevideo, Uruguay
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResearchPageClient;
