import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data/mock';
import { Menu, X, ArrowUp, Mail, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0F]/90 backdrop-blur-xl border-b border-[#1E1E2A]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-bold text-[#F0F0F2] tracking-tight group-hover:text-white transition-colors duration-200">
            HIK
          </span>
          <span className="text-lg font-bold text-[#C9A84C] group-hover:text-[#E8D48B] transition-colors duration-200">
            ™
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {siteData.nav.links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-sm font-medium ${
                location.pathname === link.path ? 'text-[#C9A84C]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="mailto:contact@humaniskind.com"
            className="px-5 py-2.5 bg-[#C9A84C] text-[#0B0B0F] text-sm font-semibold rounded-lg hover:bg-[#D4B35A] transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        <button
          className="lg:hidden text-[#F0F0F2] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0B0F]/98 backdrop-blur-xl border-b border-[#1E1E2A] absolute w-full">
          <div className="px-6 py-6 flex flex-col gap-4">
            {siteData.nav.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium py-2 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#C9A84C]'
                    : 'text-[#8A8A9B] hover:text-[#C9A84C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:contact@humaniskind.com"
              className="mt-4 px-5 py-3 bg-[#C9A84C] text-[#0B0B0F] text-sm font-semibold rounded-lg text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#08080C] border-t border-[#1E1E2A]/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-1 mb-4">
            <span className="text-2xl font-bold text-[#F0F0F2]">Human Is Kind</span>
            <span className="text-lg font-bold text-[#C9A84C]">™</span>
          </Link>
          <p className="text-[#8A8A9B] text-sm leading-relaxed max-w-md">
            {siteData.footer.tagline}
          </p>
          <p className="text-[#8A8A9B] text-xs mt-4">Est. 2026 · Montevideo — Buenos Aires</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#F0F0F2] mb-5 uppercase tracking-[0.2em]">
            Navigation
          </h4>
          <div className="flex flex-col gap-3">
            {siteData.nav.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-[#8A8A9B] hover:text-[#C9A84C] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-[#F0F0F2] mb-5 uppercase tracking-[0.2em]">
            Contact
          </h4>
          <a
            href="mailto:contact@humaniskind.com"
            className="flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E8D48B] transition-colors duration-200"
          >
            <Mail size={14} />
            {siteData.footer.contact}
          </a>
          <a
            href="https://humaniskind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#8A8A9B] hover:text-[#C9A84C] transition-colors duration-200 mt-3"
          >
            <ExternalLink size={14} />
            humaniskind.com
          </a>
        </div>
      </div>

      <div className="gold-line mt-12 mb-8" />

      <p className="text-xs text-[#555566] text-center">
        {siteData.footer.copyright} | {siteData.footer.trademark}
      </p>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-40 w-10 h-10 bg-[#1E1E2A] border border-[#2A2A3A] rounded-lg flex items-center justify-center text-[#C9A84C] hover:bg-[#2A2A3A] transition-colors duration-200"
    >
      <ArrowUp size={16} />
    </button>
  );
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#0B0B0F]">
    <ScrollToTop />
    <Navbar />
    <main className="page-enter">{children}</main>
    <Footer />
    <BackToTop />
  </div>
);

export default Layout;
