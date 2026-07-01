export default function robots() {
  return {
    rules: [
      // Standard + AI crawlers — all allowed on public pages
      { userAgent: '*',                allow: '/', disallow: ['/dashboard', '/dashboard/', '/api/'] },
      { userAgent: 'GPTBot',           allow: '/' },
      { userAgent: 'ChatGPT-User',     allow: '/' },
      { userAgent: 'ClaudeBot',        allow: '/' },
      { userAgent: 'anthropic-ai',     allow: '/' },
      { userAgent: 'Claude-Web',       allow: '/' },
      { userAgent: 'Google-Extended',  allow: '/' },
      { userAgent: 'PerplexityBot',    allow: '/' },
      { userAgent: 'Applebot',         allow: '/' },
      { userAgent: 'Applebot-Extended',allow: '/' },
      { userAgent: 'CCBot',            allow: '/' },
      { userAgent: 'cohere-ai',        allow: '/' },
      { userAgent: 'Bytespider',       allow: '/' },
      { userAgent: 'Diffbot',          allow: '/' },
      { userAgent: 'YouBot',           allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
    ],
    sitemap: 'https://humaniskind.com/sitemap.xml',
  };
}
