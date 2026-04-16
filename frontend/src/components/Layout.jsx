import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data/mock';
import { Menu, X, ArrowUp, Mail, ExternalLink } from 'lucide-react';

const LOGO_ABBR = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/yneocmmp_Logo_HIK_Abreviado.png';
const LOGO_FULL = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/x9dz6lo3_Logo_HIK.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#2D2D2D] shadow-lg'
        : 'bg-[#2D2D2D]/95'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={LOGO_ABBR} alt="HIK" className="h-11" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {siteData.nav.links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="mailto:contact@humaniskind.com"
            className="px-5 py-2.5 bg-[#E8761D] text-white text-sm font-semibold rounded-lg hover:bg-[#D06A18] transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#2D2D2D] border-t border-white/10 absolute w-full">
          <div className="px-6 py-6 flex flex-col gap-4">
            {siteData.nav.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium py-2 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#E8761D]'
                    : 'text-white/70 hover:text-[#E8761D]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="mailto:contact@humaniskind.com" className="mt-2 px-5 py-3 bg-[#E8761D] text-white text-sm font-semibold rounded-lg text-center">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#2D2D2D]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={LOGO_FULL} alt="Human Is Kind" className="h-12 mb-5" />
          <p className="text-white/50 text-sm leading-relaxed max-w-md">
            {siteData.footer.tagline}
          </p>
          <p className="text-white/30 text-xs mt-3">Est. 2026 · Montevideo — Buenos Aires</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-[0.15em]">Navigation</h4>
          <div className="flex flex-col gap-2.5">
            {siteData.nav.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-white/50 hover:text-[#E8761D] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-[0.15em]">Contact</h4>
          <a
            href="mailto:contact@humaniskind.com"
            className="flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] transition-colors duration-200"
          >
            <Mail size={14} />
            {siteData.footer.contact}
          </a>
          <a
            href="https://humaniskind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-[#E8761D] transition-colors duration-200 mt-3"
          >
            <ExternalLink size={14} />
            humaniskind.com
          </a>
        </div>
      </div>

      <div className="h-px bg-white/10 mt-10 mb-6" />
      <p className="text-xs text-white/30 text-center">
        {siteData.footer.copyright} | {siteData.footer.trademark}
      </p>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
      className="fixed bottom-6 left-6 z-40 w-10 h-10 bg-[#E8761D] rounded-lg flex items-center justify-center text-white hover:bg-[#D06A18] transition-colors duration-200 shadow-lg"
    >
      <ArrowUp size={16} />
    </button>
  );
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
