'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Check, ArrowRight } from 'lucide-react';

const CONTACT_EMAIL = 'contact@humaniskind.com';

export default function ContactCTA({
  className = 'btn-primary',
  label = 'Contact Us',
  showArrow = true,
  testId,
}) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastLeaving, setToastLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render portal after hydration
  useEffect(() => { setMounted(true); }, []);

  // Auto-dismiss after 4 s
  useEffect(() => {
    if (!toastVisible) return;
    const dismiss = setTimeout(() => {
      setToastLeaving(true);
      const remove = setTimeout(() => {
        setToastVisible(false);
        setToastLeaving(false);
        setCopied(false);
      }, 350);
      return () => clearTimeout(remove);
    }, 4000);
    return () => clearTimeout(dismiss);
  }, [toastVisible]);

  const handleClick = useCallback((e) => {
    e.preventDefault();

    // 1. Try to open mail client
    try { window.open(`mailto:${CONTACT_EMAIL}`, '_self'); } catch (_) {}

    // 2. Copy to clipboard
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {});
    } else {
      const el = document.createElement('textarea');
      el.value = CONTACT_EMAIL;
      el.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    setCopied(true);
    setToastLeaving(false);
    setToastVisible(true);
  }, []);

  const toast = (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 2147483647, // max z-index, escapes all stacking contexts
        pointerEvents: 'auto',
        animation: toastLeaving
          ? 'hikToastOut 0.35s cubic-bezier(0.4,0,1,1) forwards'
          : 'hikToastIn 0.35s cubic-bezier(0,0,0.2,1) forwards',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 18px',
        background: '#1C1C1C',
        border: '1px solid rgba(232,118,29,0.4)',
        borderRadius: '12px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,118,29,0.1)',
        minWidth: '288px',
        maxWidth: '360px',
      }}>
        {/* Icon */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'rgba(232,118,29,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {copied
            ? <Check size={16} style={{ color: '#16A34A' }} />
            : <Copy size={16} style={{ color: '#E8761D' }} />}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4 }}>
            {copied ? 'Email address copied!' : 'Get in touch'}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, wordBreak: 'break-all' }}>
            {CONTACT_EMAIL}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{ display: 'inline-block', marginTop: '6px', fontSize: '11px', color: '#E8761D', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Open email client →
          </a>
        </div>

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '3px 8px', borderRadius: '6px', flexShrink: 0,
          background: copied ? 'rgba(22,163,74,0.15)' : 'rgba(255,255,255,0.05)',
          border: copied ? '1px solid rgba(22,163,74,0.35)' : '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.3s',
        }}>
          <Check size={11} style={{ color: copied ? '#16A34A' : 'rgba(255,255,255,0.3)' }} />
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: copied ? '#16A34A' : 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            {copied ? 'Copied' : 'Copy'}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes hikToastIn {
          from { opacity:0; transform:translateY(10px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
        @keyframes hikToastOut {
          from { opacity:1; transform:translateY(0)    scale(1);    }
          to   { opacity:0; transform:translateY(10px) scale(0.96); }
        }
      `}</style>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        data-testid={testId}
        aria-label={`${label} — ${CONTACT_EMAIL}`}
      >
        {label}
        {showArrow && <ArrowRight size={16} className="ml-1.5 flex-shrink-0" />}
      </button>

      {/* Portal renders the toast directly in document.body —
          escapes any stacking context from fixed navbar or transforms */}
      {mounted && toastVisible && createPortal(toast, document.body)}
    </>
  );
}
