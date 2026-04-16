import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteData } from '../data/mock';
import { Menu, X, ArrowUp, Mail, ExternalLink } from 'lucide-react';

const LOGO_NAV_DARK = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/4yaw500s_Logo_HIK_Abreviado_Para_Fondo_Oscuro.png.png';
const LOGO_FOOTER_DARK = 'https://customer-assets.emergentagent.com/job_new-site-demo/artifacts/g6utoxhc_Logo_HIK_Para_Fondo_Oscuro.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#1C1C1C] shadow-xl shadow-black/10' : 'bg-[#1C1C1C]/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-105">
          <img src={LOGO_NAV_DARK} alt="HIK" className="h-9 sm:h-11" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {siteData.nav.links.map((link) => (
            <Link key={link.path} to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="mailto:contact@humaniskind.com"
            className="btn-primary text-sm !py-2.5 !px-5">
            Contact Us
          </a>
        </div>

        <button className="lg:hidden text-white p-2 -mr-2 transition-transform duration-200 active:scale-90"
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mobile-menu-enter bg-[#1C1C1C] border-t border-white/5 absolute w-full h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-6 py-8 flex flex-col gap-2">
            {siteData.nav.links.map((link) => (
              <Link key={link.path} to={link.path}
                className={`text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#E8761D] bg-[#E8761D]/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}
            <a href="mailto:contact@humaniskind.com"
              className="mt-6 btn-primary text-center justify-center">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#1C1C1C]">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <Link to="/" className="inline-block mb-5 transition-transform duration-200 hover:scale-105">
            <img src={LOGO_FOOTER_DARK} alt="Human Is Kind" className="h-10 sm:h-12" />
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-md">{siteData.footer.tagline}</p>
          <p className="text-white/25 text-xs mt-3">Est. 2026 · Montevideo — Buenos Aires</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white/80 mb-4 uppercase tracking-[0.15em]">Navigation</h4>
          <div className="flex flex-col gap-2.5">
            {siteData.nav.links.map((link) => (
              <Link key={link.path} to={link.path}
                className="text-sm text-white/40 hover:text-[#E8761D] transition-colors duration-200">{link.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white/80 mb-4 uppercase tracking-[0.15em]">Contact</h4>
          <a href="mailto:contact@humaniskind.com"
            className="flex items-center gap-2 text-sm text-[#E8761D] hover:text-[#F5993D] transition-colors duration-200">
            <Mail size={14} /> {siteData.footer.contact}
          </a>
          <a href="https://humaniskind.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-[#E8761D] transition-colors duration-200 mt-3">
            <ExternalLink size={14} /> humaniskind.com
          </a>
        </div>
      </div>
      <div className="h-px bg-white/8 mt-10 mb-6" />
      <p className="text-[11px] text-white/25 text-center">{siteData.footer.copyright} | {siteData.footer.trademark}</p>
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
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 left-5 z-40 w-10 h-10 bg-[#E8761D] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/40">
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
