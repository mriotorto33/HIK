'use client';

import { LanguageProvider } from '@/i18n/LanguageContext';

export function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
