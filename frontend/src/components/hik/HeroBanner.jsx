import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

const SHIELD_URL =
  "https://customer-assets.emergentagent.com/job_hik-zero-trust/artifacts/b0pfqdbo_ChatGPT%20Image%2029%20abr%202026%2C%2003_33_42%20p.m..png";

// Rotating value-prop messages. Each has 3 parts:
// the prefix (white) · the highlight (orange) · the suffix (white).
// Designed to contrast HIK against observability / logging / LLM-guardrail tools.
const MESSAGES = [
  {
    parts: [
      { text: "Logs tell you what happened." },
      { break: true },
      { text: "HIK proves", highlight: true },
      { text: " what was authorized." },
    ],
  },
  {
    parts: [
      { text: "Policy enforcement" },
      { break: true },
      { text: "at the gate.", highlight: true },
      { text: " Not after the fact." },
    ],
  },
  {
    parts: [
      { text: "Every AI decision." },
      { break: true },
      { text: "Court-admissible", highlight: true },
      { text: " compliance receipt." },
    ],
  },
  {
    parts: [
      { text: "Live stream kill-switch. " },
      { text: "Demonstrated.", highlight: true },
      { text: " OBS → YouTube → terminated." },
    ],
  },
];

const ROTATION_MS = 6200;

export const HeroBanner = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % MESSAGES.length),
      ROTATION_MS
    );
    return () => clearInterval(t);
  }, []);

  const msg = MESSAGES[idx];

  return (
    <section
      data-testid="hero-banner"
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 mb-8 fade-up"
      style={{
        background:
          "linear-gradient(135deg, rgba(24,24,27,0.85) 0%, rgba(9,9,11,0.9) 50%, rgba(24,24,27,0.85) 100%)",
      }}
    >
      {/* Background decorative layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 50%, rgba(255,122,0,0.22) 0%, transparent 50%), radial-gradient(circle at 10% 120%, rgba(255,122,0,0.10) 0%, transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* Gold shield on the right */}
      <div
        aria-hidden="true"
        className="absolute right-[-60px] sm:right-[-40px] top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] lg:w-[520px] h-[340px] sm:h-[420px] lg:h-[520px] pointer-events-none hidden sm:block"
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,122,0,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${SHIELD_URL})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 38%, transparent 62%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 38%, transparent 62%)",
            filter: "drop-shadow(0 0 40px rgba(255,122,0,0.15))",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Content */}
      <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 max-w-2xl">
        <div className="flex items-center gap-2 mb-5">
          <span className="h-[1px] w-8 bg-orange-400" />
          <span className="text-[10px] uppercase tracking-[0.32em] text-orange-400 font-medium">
            Deterministic Policy Enforcement · Enterprise AI
          </span>
        </div>

        <h1
          key={idx}
          data-testid="hero-headline"
          className="font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-[-0.025em] text-zinc-50 leading-[1.04] min-h-[180px] sm:min-h-[220px] lg:min-h-[260px] fade-up"
        >
          {msg.parts.map((p, i) => {
            if (p.break) return <br key={i} />;
            return p.highlight ? (
              <span key={i} className="hik-orange">
                {p.text}
              </span>
            ) : (
              <span key={i}>{p.text}</span>
            );
          })}
        </h1>

        {/* Rotation indicator */}
        <div
          data-testid="hero-rotation-indicator"
          className="mt-5 flex items-center gap-2"
        >
          {MESSAGES.map((_, i) => (
            <button
              key={i}
              data-testid={`hero-dot-${i}`}
              onClick={() => setIdx(i)}
              aria-label={`Show message ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === idx
                  ? "w-8 bg-orange-400"
                  : "w-4 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <p className="text-sm sm:text-base text-zinc-400 mt-6 max-w-xl leading-relaxed">
          Every AI action is intercepted at the policy boundary — Gate 1 before
          the model, Gate 2 before the user. If a rule fires, the gate closes
          and a Sacred Trace™ receipt is anchored to IPFS + Besu.{" "}
          <span className="text-zinc-100 font-medium">
            Fail-close. Cryptographically proven.
          </span>
        </p>

        <div className="mt-7 flex items-center gap-4 flex-wrap">
          <div
            data-testid="sacred-trace-pill"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60 pulse-dot" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-mono">
              Sacred Trace™ · Streaming
            </span>
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500 text-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            KMIR v1.1
            <span className="w-1 h-1 rounded-full bg-zinc-700 mx-1" />
            C2PA 2.3
            <span className="w-1 h-1 rounded-full bg-zinc-700 mx-1" />
            Besu
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5 px-6 sm:px-10 lg:px-14 py-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-500 text-mono">
        <span>Human Is Kind™</span>
        <span className="flex items-center gap-2">
          <ArrowRight className="w-3 h-3 text-zinc-600" />
          Operational situation · last 24 hours
        </span>
      </div>
    </section>
  );
};

export default HeroBanner;
