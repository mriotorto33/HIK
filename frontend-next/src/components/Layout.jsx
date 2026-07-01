'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../i18n/LanguageContext';
import { Flag } from '../i18n/flags';
import ContactCTA from './hik/ContactCTA';
import { Menu, X, ArrowUp, Mail, ExternalLink, Globe, Check } from 'lucide-react';

const LOGO_NAV_DARK = '/logo-nav-dark.png';
const LOGO_FOOTER_DARK = '/logo-footer-dark.png';

const LanguageSwitcher = ({ variant = 'desktop' }) => {
  const { lang, changeLang, languages } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className="mt-4 px-4" data-testid="language-switcher-mobile">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-2">
          <Globe size={12} /> Language
        </p>
        <div className="flex gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLang(l.code)}
              data-testid={`lang-btn-mobile-${l.code}`}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                lang === l.code
                  ? 'bg-[#E8761D]/15 border-[#E8761D]/40 text-[#E8761D]'
                  : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <Flag code={l.code} />
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref} data-testid="language-switcher">
      <button
        onClick={() => setOpen(!open)}
        data-testid="language-switcher-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200"
      >
        <Flag code={current.code} />
        <span className="font-mono tracking-wider">{current.label}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-44 rounded-lg bg-[#1C1C1C] border border-white/10 shadow-xl shadow-black/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200"
          data-testid="language-switcher-menu"
        >
          {languages.map((l) => {
            const active = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => { changeLang(l.code); setOpen(false); }}
                data-testid={`lang-btn-${l.code}`}
                role="option"
                aria-selected={active}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors duration-150 ${
                  active ? 'bg-[#E8761D]/10 text-[#E8761D]' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Flag code={l.code} className="w-5 h-[14px] rounded-sm shadow-sm overflow-hidden inline-block flex-shrink-0" />
                <span className="font-mono text-xs tracking-wider w-6">{l.label}</span>
                <span className="flex-1 text-xs text-white/40">{l.name}</span>
                {active && <Check size={14} className="text-[#E8761D]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#1C1C1C] shadow-xl shadow-black/10' : 'bg-[#1C1C1C]/80 backdrop-blur-md'
    }`} data-testid="main-navbar">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-105" data-testid="nav-home-link">
          <img src={LOGO_NAV_DARK} alt="HIK — Human Is Kind™ AI Governance Platform" className="h-9 sm:h-11" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {t.nav.links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
              className={`nav-link ${pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ContactCTA
            label={t.ui.contactUs}
            showArrow={false}
            className="btn-primary text-sm !py-2.5 !px-5"
            testId="nav-contact-button"
          />
        </div>

        <button
          className="lg:hidden text-white p-2 -mr-2 transition-transform duration-200 active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mobile-menu-enter bg-[#1C1C1C] border-t border-white/5 absolute w-full h-[calc(100vh-64px)] overflow-y-auto" data-testid="mobile-menu">
          <div className="px-6 py-8 flex flex-col gap-2">
            {t.nav.links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`mobile-nav-link-${link.path.replace('/', '') || 'home'}`}
                className={`text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                  pathname === link.path
                    ? 'text-[#E8761D] bg-[#E8761D]/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}

            <LanguageSwitcher variant="mobile" />

            <ContactCTA
              label={t.ui.contactUs}
              showArrow={false}
              className="mt-6 btn-primary text-center justify-center"
              testId="mobile-nav-contact-button"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#1C1C1C]" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-5 transition-transform duration-200 hover:scale-105">
              <img src={LOGO_FOOTER_DARK} alt="Human Is Kind" className="h-10 sm:h-12" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">{t.footer.tagline}</p>
            <p className="text-white/25 text-xs mt-3">Est. 2026 · Montevideo — Buenos Aires</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-4 uppercase tracking-[0.15em]">{t.ui.navigation}</h4>
            <div className="flex flex-col gap-2.5">
              {t.nav.links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  data-testid={`footer-link-${link.path.replace('/', '') || 'home'}`}
                  className="text-sm text-white/40 hover:text-[#E8761D] transition-colors duration-200">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-4 uppercase tracking-[0.15em]">{t.ui.contact}</h4>
            <ContactCTA
              label={t.footer.contact}
              showArrow={false}
              className="flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] transition-colors duration-200 bg-transparent border-none p-0 cursor-pointer font-normal"
              testId="footer-email"
            />
            <a href="https://humaniskind.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-[#E8761D] transition-colors duration-200 mt-3">
              <ExternalLink size={14} /> humaniskind.com
            </a>
          </div>
        </div>
        <div className="h-px bg-white/8 mt-10 mb-6" />
        <p className="text-[11px] text-white/25 text-center">{t.footer.copyright} | {t.footer.trademark}</p>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      data-testid="back-to-top-button"
      aria-label="Back to top"
      className="fixed bottom-5 left-5 z-40 w-10 h-10 bg-[#E8761D] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/40">
      <ArrowUp size={16} />
    </button>
  );
};

const ScrollToTop = () => {
  const pathname = usePathname();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <ScrollToTop />
    <Navbar />
    <main className="page-enter">{children}</main>
    <Footer />
    <BackToTop />
  </div>
);

export default Layout;
