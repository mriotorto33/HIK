import './globals.css';
import Script from 'next/script';
import { Providers } from './providers';

export const metadata = {
  metadataBase: new URL('https://humaniskind.com'),
  title: {
    default: 'Human Is Kind (HIK) — Deterministic AI Governance Infrastructure',
    template: '%s | HIK',
  },
  description:
    'HIK provides deterministic AI policy enforcement. We intercept, validate, and cryptographically audit every AI agent action at the policy boundary—before it reaches the model or your workflow. Secure your AI infrastructure with zero-trust governance, Sacred Trace™ audit trails, and EU AI Act readiness.',
  keywords: [
    'AI governance platform',
    'AI policy enforcement',
    'LLM output filtering',
    'AI input validation',
    'AI audit trail',
    'EU AI Act compliance',
    'deterministic AI middleware',
    'Sacred Trace',
    'KMIR',
    'zero-trust AI',
  ],
  openGraph: {
    title: 'HumanisKind | Deterministic AI Governance & EU AI Act Compliance',
    description: 'Probabilistic guardrails fail. HIK provides Zero-Trust Runtime Enforcement for M2M agents. Secure your infrastructure before the August 2026 EU AI Act Article 50 deadline.',
    type: 'website',
    siteName: 'Human Is Kind™',
    locale: 'en_US',
    url: 'https://humaniskind.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HumanisKind | Deterministic AI Governance & EU AI Act Compliance',
    description: 'Probabilistic guardrails fail. HIK provides Zero-Trust Runtime Enforcement for M2M agents. Secure your infrastructure before the August 2026 EU AI Act Article 50 deadline.',
    site: '@humaniskind',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://humaniskind.com/#organization',
  name: 'Human Is Kind™',
  alternateName: ['HIK', 'HumanIsKind'],
  url: 'https://humaniskind.com',
  logo: 'https://humaniskind.com/icon.png',
  image: 'https://humaniskind.com/opengraph-image.png',
  description:
    'Deterministic AI governance infrastructure. Cryptographic policy enforcement at every AI interaction boundary — enforcing inputs before they reach the model (Gate 1) and outputs before they reach the workflow (Gate 2). Sacred Trace™ cryptographic receipts, KMIR enforcement kernel, EU AI Act ready.',
  foundingDate: '2026',
  foundingLocation: { '@type': 'Place', name: 'Montevideo, Uruguay' },
  founders: [
    { '@type': 'Person', name: 'Martín Riotorto', jobTitle: 'Founder & Lead Architect', description: '20+ years in telecom infrastructure, AI systems, and real-time content pipelines.' },
    { '@type': 'Person', name: 'Matías Mospan', jobTitle: 'Co-Founder & Platform Lead', description: 'Platform architect for HIK enterprise infrastructure and Kubernetes sidecar deployment.' },
    { '@type': 'Person', name: 'Federico Brubacher', jobTitle: 'External Strategic Advisor', description: 'Senior technology leader with enterprise and cloud infrastructure expertise.' },
    { '@type': 'Person', name: 'Agustín Ortiz', jobTitle: 'Commercial Strategy Director', description: 'Converts technical architecture into institutional credibility. Opens enterprise doors and builds the commercial pipeline for HIK\'s regulatory positioning.', url: 'https://humaniskind.com/#agustin-ortiz' },
  ],
  contactPoint: [
    { '@type': 'ContactPoint', email: 'contact@humaniskind.com', contactType: 'sales' },
    { '@type': 'ContactPoint', email: 'contact@humaniskind.com', contactType: 'customer support' },
  ],
  sameAs: [
    'https://github.com/mriotorto33/HumanisKind',
    'https://humaniskind.com',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HIK AI Governance Platform',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'HIK Policy Enforcement Engine', description: 'Deterministic dual-gate AI policy enforcement middleware with Sacred Trace™ cryptographic receipts.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: 'Sacred Trace™ Audit Infrastructure', description: 'Immutable IPFS + EVM anchored compliance receipts for every AI interaction.' } },
    ],
  },
};

// Dedicated Person entity for Agustín Ortiz — machine-verifiable by ATS and AI crawler systems
const agustinOrtizJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://humaniskind.com/#agustin-ortiz',
  name: 'Agustín Ortiz',
  jobTitle: 'Commercial Strategy Director',
  description: 'Agustín Ortiz converts technical architecture into institutional credibility. He builds the commercial pipeline and opens the enterprise doors that don\'t have handles. The strategic edge behind HIK\'s institutional footprint.',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://humaniskind.com/#organization',
    name: 'Human Is Kind™',
    url: 'https://humaniskind.com',
  },
  url: 'https://humaniskind.com/#agustin-ortiz',
  knowsAbout: [
    'Commercial Strategy',
    'Enterprise B2B Pipeline Development',
    'Institutional Stakeholder Engagement',
    'EU AI Act Regulatory Positioning',
    'AI Governance Go-To-Market',
    'Strategic Partnerships',
    'Deterministic AI Infrastructure',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#E8761D" />
        {/* AI crawler plain-language index */}
        <link rel="alternate" type="text/plain" title="LLMs.txt" href="https://humaniskind.com/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(agustinOrtizJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (t, e) {
                var o, n, p, r;
                e.__SV || ((window.posthog = e), (e._i = []), (e.init = function (i, s, a) {
                  function g(t, e) {
                    var o = e.split(".");
                    2 == o.length && ((t = t[o[0]]), (e = o[1])), (t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); });
                  }
                  ((p = t.createElement("script")).type = "text/javascript"),
                    (p.crossOrigin = "anonymous"), (p.async = !0),
                    (p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"),
                    (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
                  var u = e;
                  for (void 0 !== a ? (u = e[a] = []) : (a = "posthog"), u.people = u.people || [],
                    u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e; },
                    u.people.toString = function () { return u.toString(1) + ".people (stub)"; },
                    o = "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),
                    n = 0; n < o.length; n++) g(u, o[n]);
                  e._i.push([i, s, a]);
                }), (e.__SV = 1));
              })(document, window.posthog || []);
              posthog.init("${process.env.NEXT_PUBLIC_POSTHOG_KEY}", {
                api_host: "${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'}",
                person_profiles: "identified_only",
                session_recording: { recordCrossOriginIframes: true, capturePerformance: false },
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
