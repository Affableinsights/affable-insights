import { useState, useEffect, useRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  teal:        "#0A6B72",
  tealD:       "#074F54",
  tealL:       "#D6F0F2",
  tealM:       "#7EC8CC",
  tealGlow:    "rgba(10,107,114,0.18)",
  amber:       "#D4860A",
  amberL:      "#FFF3D6",
  green:       "#1C7A42",
  greenL:      "#E2F5EB",
  red:         "#B5291B",
  redL:        "#FDECEA",
  purple:      "#5044A0",
  purpleL:     "#EDEAF8",
  blue:        "#1455A8",
  blueL:       "#E3EEF8",
  ink:         "#0A0F1E",
  ink2:        "#2A3245",
  ink3:        "#5A6278",
  smoke:       "#8A90A0",
  mist:        "#C8CEDB",
  fog:         "#EEF0F5",
  snow:        "#F7F8FA",
  white:       "#FFFFFF",
  locked:      "#A02018",
  lockedL:     "#FDECEA",
  gold:        "#B87A00",
  goldL:       "#FFF8E0",
};

const F = {
  display: "'Sora', 'DM Sans', sans-serif",
  body:    "'DM Sans', 'Sora', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

// ─── Global styles injected once ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0A0F1E;
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(10,107,114,0.4); border-radius: 4px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.5; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes lockBounce {
    0%,100% { transform: scale(1); }
    40%     { transform: scale(1.15); }
    60%     { transform: scale(0.95); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes tick {
    0%   { transform: scale(0) rotate(-15deg); }
    60%  { transform: scale(1.2) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heartbeat {
    0%,100% { transform: scale(1); }
    14%     { transform: scale(1.08); }
    28%     { transform: scale(1); }
    42%     { transform: scale(1.05); }
    70%     { transform: scale(1); }
  }
`;

function injectGlobalStyles() {
  if (document.getElementById("ai-global")) return;
  const s = document.createElement("style");
  s.id = "ai-global";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

// ─── Shared primitives ────────────────────────────────────────────────────────
const Phone = ({ children, dark }) => (
  <div style={{
    width: 390, minHeight: 760,
    background: dark ? "#0A0F1E" : C.white,
    borderRadius: 40,
    boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12)",
    overflow: "hidden",
    display: "flex", flexDirection: "column",
    position: "relative",
    border: "8px solid #111827",
  }}>
    {/* Notch */}
    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#111827", borderRadius: "0 0 18px 18px", zIndex: 100 }} />
    {children}
  </div>
);

const StatusBar = ({ light }) => (
  <div style={{ height: 44, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 24px 8px", flexShrink: 0 }}>
    <span style={{ fontSize: 12, fontWeight: 700, color: light ? C.white : C.ink, fontFamily: F.display }}>09:41</span>
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
        <rect x="0" y="6" width="3" height="5" rx="1" fill={light ? "white" : C.ink} opacity="0.4"/>
        <rect x="4.5" y="4" width="3" height="7" rx="1" fill={light ? "white" : C.ink} opacity="0.6"/>
        <rect x="9" y="2" width="3" height="9" rx="1" fill={light ? "white" : C.ink} opacity="0.8"/>
        <rect x="13.5" y="0" width="2.5" height="11" rx="1" fill={light ? "white" : C.ink}/>
      </svg>
      <span style={{ fontSize: 12, fontWeight: 700, color: light ? C.white : C.ink, fontFamily: F.display }}>4G</span>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={light ? "white" : C.ink} strokeOpacity="0.35"/>
        <rect x="2" y="2" width="16" height="8" rx="2" fill={light ? "white" : C.ink}/>
        <path d="M23 4.5V7.5C23.8284 7.22 24.5 6.68 24.5 6C24.5 5.32 23.8284 4.78 23 4.5Z" fill={light ? "white" : C.ink} opacity="0.4"/>
      </svg>
    </div>
  </div>
);

const TopBar = ({ title, onBack, bg, textColor, right, subtitle }) => (
  <div style={{ background: bg || C.teal, padding: "10px 20px 16px", flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: textColor || C.white, width: 32, height: 32, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>←</button>
        )}
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: textColor || C.white, fontFamily: F.display, letterSpacing: -0.4 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: F.body, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      {right}
    </div>
  </div>
);

const Pill = ({ label, color, bg, size }) => (
  <span style={{ background: bg, color, borderRadius: 20, padding: size === "sm" ? "2px 8px" : "4px 10px", fontSize: size === "sm" ? 10 : 12, fontWeight: 700, fontFamily: F.display, letterSpacing: 0.2 }}>{label}</span>
);

const Card = ({ children, style, onClick, accent }) => (
  <div onClick={onClick} style={{
    background: C.white, borderRadius: 18,
    border: `1.5px solid ${accent || C.mist}`,
    padding: "14px 16px", margin: "0 0 10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.15s, box-shadow 0.15s",
    ...style,
  }}>
    {children}
  </div>
);

const Avatar = ({ initials, size = 36, bg, color }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.35, background: bg || C.tealL, color: color || C.tealD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 800, fontFamily: F.display, flexShrink: 0 }}>
    {initials}
  </div>
);

const Divider = () => <div style={{ height: 1, background: C.fog, margin: "4px 0" }} />;

// ─── Screen label ──────────────────────────────────────────────────────────────
const ScreenLabel = ({ n, title, tag }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, marginTop: 28 }}>
    <div style={{ background: C.teal, color: C.white, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 800, fontFamily: F.display }}>{n}</div>
    <span style={{ fontSize: 13, color: "#8090B0", fontFamily: F.body, fontWeight: 500 }}>{title}</span>
    {tag && <span style={{ fontSize: 10, fontWeight: 700, color: tag === "DOM" ? C.blue : tag === "SL" ? C.purple : C.tealD, background: tag === "DOM" ? C.blueL : tag === "SL" ? C.purpleL : C.tealL, borderRadius: 6, padding: "2px 7px", fontFamily: F.display }}>{tag}</span>}
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — SPLASH + LOGIN + MFA
// ════════════════════════════════════════════════════════════════════════════════
function Screen1({ onDone }) {
  const [step, setStep] = useState("splash");
  const [pw, setPw] = useState("");
  const [mfa, setMfa] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  function handleMfa(i, v) {
    if (v.length > 1) return;
    const n = [...mfa]; n[i] = v; setMfa(n);
    if (v && i < 5) document.getElementById(`mfa-${i + 1}`)?.focus();
  }

  function handleVerify() {
    setLoading(true);
    setTimeout(() => { setLoading(false); onDone(); }, 1200);
  }

  if (step === "splash") return (
    <Phone dark>
      <StatusBar light />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px 48px", animation: "fadeIn 0.6s ease" }}>
        {/* Logo mark */}
        <div style={{ width: 96, height: 96, borderRadius: 28, background: "linear-gradient(135deg, #0A6B72, #0D9AA6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 0 60px rgba(10,107,114,0.5)", animation: "heartbeat 3s ease-in-out infinite" }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z" fill="rgba(255,255,255,0.15)"/>
            <path d="M24 14v10l7 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="3" fill="white"/>
            <path d="M15 24h3M30 24h3M24 15v3M24 30v3" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.white, fontFamily: F.display, letterSpacing: -1, lineHeight: 1 }}>Affable</div>
          <div style={{ fontSize: 32, fontWeight: 300, color: C.tealM, fontFamily: F.display, letterSpacing: -1 }}>Insights</div>
          <div style={{ fontSize: 13, color: "#4A5878", marginTop: 10, fontFamily: F.body }}>Health & Social Care Platform</div>
        </div>
        <button onClick={() => setStep("login")} style={{ width: "100%", padding: "16px 0", background: "linear-gradient(135deg, #0A6B72, #0D9AA6)", border: "none", borderRadius: 16, color: C.white, fontSize: 16, fontWeight: 700, fontFamily: F.display, cursor: "pointer", letterSpacing: -0.2, boxShadow: "0 8px 32px rgba(10,107,114,0.5)" }}>
          Sign In
        </button>
        <div style={{ marginTop: 20, fontSize: 12, color: "#3A4460", fontFamily: F.body }}>Secure  •  Rota-Locked  •  GDPR Compliant</div>
      </div>
    </Phone>
  );

  if (step === "login") return (
    <Phone>
      <StatusBar />
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeUp 0.5s ease" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 6px 24px ${C.tealGlow}` }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4C8.48 4 4 8.48 4 14s4.48 10 10 10 10-4.48 10-10S19.52 4 14 4z" fill="rgba(255,255,255,0.2)"/><circle cx="14" cy="14" r="2.5" fill="white"/><path d="M14 8v4M14 18v1.5M8 14H9.5M18.5 14H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/></svg>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.6 }}>Welcome back</div>
          <div style={{ fontSize: 14, color: C.smoke, marginTop: 4, fontFamily: F.body }}>Sign in to your account</div>
        </div>

        <div style={{ marginBottom: 16, animation: "fadeUp 0.5s 0.1s ease both" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, fontFamily: F.display }}>Email</div>
          <input defaultValue="j.sega@affablecare.org.uk" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `2px solid ${C.fog}`, fontSize: 14, fontFamily: F.body, color: C.ink, background: C.snow, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 24, animation: "fadeUp 0.5s 0.15s ease both" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, fontFamily: F.display }}>Password</div>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: `2px solid ${C.teal}`, fontSize: 14, fontFamily: F.body, color: C.ink, background: C.white, outline: "none", boxSizing: "border-box" }} />
        </div>
        <button onClick={() => setStep("mfa")} style={{ width: "100%", padding: "15px 0", background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, border: "none", borderRadius: 14, color: C.white, fontSize: 15, fontWeight: 700, fontFamily: F.display, cursor: "pointer", boxShadow: `0 6px 24px ${C.tealGlow}`, animation: "fadeUp 0.5s 0.2s ease both" }}>
          Continue →
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.teal, fontFamily: F.body, cursor: "pointer" }}>Forgot password?</div>
      </div>
    </Phone>
  );

  return (
    <Phone>
      <StatusBar />
      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeUp 0.5s ease" }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🔐</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.5 }}>Two-step verification</div>
          <div style={{ fontSize: 13, color: C.smoke, marginTop: 6, fontFamily: F.body }}>Enter the 6-digit code sent to<br /><strong style={{ color: C.teal }}>+44 ••••• ••• •••</strong></div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {mfa.map((v, i) => (
            <input key={i} id={`mfa-${i}`} maxLength={1} value={v} onChange={e => handleMfa(i, e.target.value)}
              style={{ width: 46, height: 54, borderRadius: 14, border: `2px solid ${v ? C.teal : C.mist}`, fontSize: 22, fontWeight: 800, textAlign: "center", fontFamily: F.display, color: C.ink, background: v ? C.tealL : C.white, outline: "none", transition: "all 0.2s" }} />
          ))}
        </div>

        <button onClick={handleVerify} disabled={loading} style={{ width: "100%", padding: "15px 0", background: loading ? C.mist : `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, border: "none", borderRadius: 14, color: C.white, fontSize: 15, fontWeight: 700, fontFamily: F.display, cursor: loading ? "default" : "pointer", transition: "all 0.3s", boxShadow: loading ? "none" : `0 6px 24px ${C.tealGlow}` }}>
          {loading ? "Verifying…" : "Verify & Sign In →"}
        </button>
        <div style={{ marginTop: 16, fontSize: 13, color: C.teal, fontFamily: F.body, cursor: "pointer" }}>Resend code</div>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — ROTA LOCK
// ════════════════════════════════════════════════════════════════════════════════
function Screen2({ onNext }) {
  return (
    <Phone>
      <StatusBar />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, #FEF2F2 0%, #FFF8F8 100%)" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px 48px", position: "relative", animation: "fadeIn 0.5s ease" }}>
        {/* Lock animation */}
        <div style={{ width: 110, height: 110, borderRadius: 35, background: C.lockedL, border: `3px solid ${C.locked}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "lockBounce 2.5s ease-in-out infinite", boxShadow: "0 8px 40px rgba(160,32,24,0.15)" }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <rect x="10" y="22" width="32" height="24" rx="6" fill={C.locked} opacity="0.9"/>
            <path d="M17 22V17C17 11.48 21.48 7 27 7s10 4.48 10 10v5" stroke={C.locked} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
            <circle cx="26" cy="34" r="3.5" fill="white"/>
            <rect x="24.5" y="34" width="3" height="5" rx="1.5" fill="white"/>
          </svg>
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.locked, fontFamily: F.display, letterSpacing: -0.6 }}>Access Restricted</div>
          <div style={{ fontSize: 14, color: C.ink2, marginTop: 8, lineHeight: 1.6, fontFamily: F.body }}>You are not currently rostered<br />to work. Your next shift starts at:</div>
        </div>

        {/* Next shift card */}
        <div style={{ width: "100%", background: C.white, borderRadius: 20, padding: "20px 24px", border: `2px solid ${C.locked}25`, marginBottom: 20, boxShadow: "0 4px 20px rgba(160,32,24,0.08)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.locked, textTransform: "uppercase", letterSpacing: 1, fontFamily: F.display, marginBottom: 8 }}>Next Shift</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.8 }}>Tonight — 20:00</div>
          <div style={{ fontSize: 13, color: C.smoke, marginTop: 4, fontFamily: F.body }}>Tue 28 May 2026  ·  20:00 – 08:00</div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Pill label="Night Shift" color={C.tealD} bg={C.tealL} />
            <Pill label="12 hours" color={C.ink3} bg={C.fog} />
          </div>
        </div>

        <div style={{ width: "100%", background: C.fog, borderRadius: 14, padding: "12px 16px", marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: C.smoke, fontFamily: F.body, lineHeight: 1.5, textAlign: "center" }}>
            This protects service user privacy. Contact your manager for emergency access.
          </div>
        </div>

        <button onClick={onNext} style={{ width: "100%", padding: "14px 0", background: C.fog, border: `1.5px solid ${C.mist}`, borderRadius: 14, color: C.ink3, fontSize: 14, fontWeight: 600, fontFamily: F.display, cursor: "pointer" }}>
          View My Schedule →
        </button>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — CALENDAR
// ════════════════════════════════════════════════════════════════════════════════
function Screen3({ onDom, onSL }) {
  const [view, setView] = useState("month");

  const days = ["Mo","Tu","We","Th","Fr","Sa","Su"];
  const weeks = [
    [{d:27,p:1},{d:28,p:1,t:"dom"},{d:29,p:1},{d:30,p:1},{d:1},{d:2},{d:3}],
    [{d:4},{d:5},{d:6},{d:7},{d:8},{d:9,t:"sl"},{d:10,t:"dom"}],
    [{d:11},{d:12},{d:13},{d:14},{d:15},{d:16,t:"dom"},{d:17,t:"sl"}],
    [{d:18,t:"dom"},{d:19},{d:20},{d:21},{d:22},{d:23,hol:1},{d:24}],
    [{d:25,t:"dom"},{d:26,t:"sl"},{d:27},{d:28},{d:29,today:1},{d:30},{d:31,t:"dom"}],
  ];

  return (
    <Phone>
      {/* Teal header */}
      <div style={{ background: `linear-gradient(160deg, ${C.tealD}, ${C.teal})`, paddingBottom: 14 }}>
        <StatusBar light />
        <div style={{ padding: "0 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase", fontFamily: F.display }}>My Schedule</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.white, fontFamily: F.display, letterSpacing: -0.4, marginTop: 2 }}>James Sega</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button style={{ background: "rgba(255,255,255,0.15)", border: "none", color: C.white, padding: "6px 12px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.display }}>Breakdown</button>
              <Avatar initials="OJ" size={34} bg="rgba(255,255,255,0.2)" color={C.white} />
            </div>
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            {[["#BBDEFB","#1455A8","🚗 Dom"],["#D1C4E9","#5044A0","🏠 SL"],["#EDE7F6","#7E57C2","Holiday"]].map(([bg,col,label],i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: bg, border: `1.5px solid ${col}` }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: F.body }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", background: C.white }}>
        {/* Nav row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 8px" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {["‹","›"].map((ch,i) => <button key={i} style={{ width: 30, height: 30, borderRadius: 9, background: C.tealL, border: "none", color: C.teal, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>{ch}</button>)}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.5 }}>May 2026</div>
          <div style={{ display: "flex", background: C.snow, borderRadius: 10, padding: 3, gap: 2 }}>
            {["month","week","list"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ background: view===v ? C.teal : "transparent", color: view===v ? C.white : C.smoke, border: "none", borderRadius: 7, padding: "4px 9px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>{v}</button>
            ))}
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "0 10px" }}>
          {days.map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: C.smoke, padding: "3px 0", fontFamily: F.display }}>{d}</div>)}
        </div>

        {/* Grid */}
        <div style={{ padding: "0 10px" }}>
          {weeks.map((week,wi) => (
            <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderTop: `1px solid ${C.fog}` }}>
              {week.map((cell,di) => (
                <div key={di} onClick={cell.t === "dom" ? onDom : cell.t === "sl" ? onSL : undefined}
                  style={{ minHeight: 58, padding: "4px 3px", background: cell.today ? "#FFFDE7" : C.white, borderLeft: di > 0 ? `1px solid ${C.fog}` : "none", cursor: cell.t ? "pointer" : "default" }}>
                  <div style={{ fontSize: 12, fontWeight: cell.today ? 800 : 400, color: cell.p ? C.mist : C.ink, textAlign: "right", marginBottom: 2, fontFamily: F.display }}>{cell.d}</div>
                  {cell.t === "dom" && <div style={{ background: "#BBDEFB", border: "1px solid #90CAF9", borderRadius: 4, padding: "2px 3px", fontSize: 9, fontWeight: 700, color: "#0D47A1", fontFamily: F.display, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>20:00 🚗</div>}
                  {cell.t === "sl"  && <div style={{ background: "#D1C4E9", border: "1px solid #B39DDB", borderRadius: 4, padding: "2px 3px", fontSize: 9, fontWeight: 700, color: "#311B92", fontFamily: F.display, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>08:00 🏠</div>}
                  {cell.hol && <div style={{ background: "#EDE7F6", border: "1px solid #CE93D8", borderRadius: 4, padding: "2px 3px", fontSize: 8, fontWeight: 700, color: "#4A148C", fontFamily: F.display }}>Holiday</div>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ margin: "10px 14px 14px", padding: "10px 14px", background: C.goldL, borderRadius: 12, border: `1px solid ${C.gold}40` }}>
          <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, fontFamily: F.display }}>⏰ Tap a shift to view details</div>
          <div style={{ fontSize: 11, color: C.smoke, marginTop: 2, fontFamily: F.body }}>🚗 Blue = Domiciliary  ·  🏠 Purple = Supported Living</div>
        </div>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 4 — DOM SHIFT LOCKED
// ════════════════════════════════════════════════════════════════════════════════
function Screen4DomLocked({ onBack, onNext }) {
  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, ${C.tealD}, ${C.teal})` }}>
        <StatusBar light />
        <TopBar title="Shift Details" onBack={onBack} right={<Pill label="🚗 Dom" color={C.white} bg="rgba(255,255,255,0.18)" />} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Lock notice */}
        <div style={{ background: C.lockedL, border: `1px solid ${C.locked}30`, borderRadius: 14, padding: "12px 16px", marginBottom: 12, display: "flex", gap: 10 }}>
          <div style={{ fontSize: 22, flexShrink: 0 }}>🔒</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.locked, fontFamily: F.display }}>Shift not yet active</div>
            <div style={{ fontSize: 12, color: C.ink2, marginTop: 2, fontFamily: F.body }}>Full client details unlock at <strong>20:00</strong>. Address shown for journey planning.</div>
          </div>
        </div>

        <Card accent={C.tealM} style={{ background: `linear-gradient(135deg, ${C.tealL}, ${C.white})` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 6 }}>Shift Time</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.teal, fontFamily: F.display, letterSpacing: -0.8 }}>20:00 — 08:00</div>
          <div style={{ fontSize: 12, color: C.smoke, marginTop: 4, fontFamily: F.body }}>Tue 28 May 2026  ·  Night Shift  ·  12 hrs</div>
        </Card>

        {/* Double-up */}
        <Card accent="#90CAF9" style={{ background: C.blueL }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 10 }}>👥 Double-Up Call</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["OJ","You","Confirmed",C.teal],["SR","A. Mensah","Confirmed",C.tealD]].map(([init,name,status,col],i) => (
              <div key={i} style={{ flex: 1, background: C.white, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={init} size={30} bg={col} color={C.white} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, fontFamily: F.display }}>{name}</div>
                  <Pill label={status} color={C.green} bg={C.greenL} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Client — locked */}
        <Card>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Client</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.fog, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: F.display }}>J••••• S•••</div>
              <Pill label="🔒 Locked until 20:00" color={C.locked} bg={C.lockedL} size="sm" />
            </div>
          </div>
        </Card>

        {/* Address — visible */}
        <Card>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 6 }}>Address  <span style={{ color: C.green, fontStyle: "italic", textTransform: "none" }}>— visible for travel planning</span></div>
          <div style={{ fontSize: 14, color: C.teal, fontFamily: F.body, lineHeight: 1.5, fontWeight: 500 }}>14 Green Lane,<br />Bedford, Kempston</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ fontSize: 13, color: C.tealD, fontWeight: 700, fontFamily: F.display }}>MK55 6JJ</span>
          </div>
          <button style={{ marginTop: 10, background: C.teal, border: "none", color: C.white, padding: "7px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.display }}>📍 View Map</button>
        </Card>

        {/* Locked features */}
        <Card style={{ background: C.snow, border: `1.5px dashed ${C.mist}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Unlocks at 20:00</div>
          {["Full client profile & care plan","Medication & health notes","Visit task checklist","Incident reporting","Secure messaging"].map((item,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: i > 0 ? `1px solid ${C.fog}` : "none" }}>
              <span style={{ fontSize: 13 }}>🔒</span>
              <span style={{ fontSize: 12, color: C.smoke, fontFamily: F.body }}>{item}</span>
            </div>
          ))}
        </Card>
        <button onClick={onNext} style={{ width: "100%", padding: "14px 0", background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, border: "none", borderRadius: 14, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", margin: "6px 0", boxShadow: `0 6px 20px ${C.tealGlow}` }}>
          Preview: Shift Active →
        </button>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 5 — DOM SHIFT ACTIVE
// ════════════════════════════════════════════════════════════════════════════════
function Screen5DomActive({ onBack, onNote }) {
  const [tasks, setTasks] = useState([false, false, false, false]);

  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, ${C.tealD}, ${C.teal})` }}>
        <StatusBar light />
        <TopBar title="Active Visit" onBack={onBack}
          subtitle="Tue 28 May  ·  20:00 – 08:00"
          right={<div style={{ display: "flex", alignItems: "center", gap: 5, background: C.green, borderRadius: 20, padding: "5px 11px" }}>
            <div style={{ width: 6, height: 6, borderRadius: 6, background: C.white, animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.white, fontFamily: F.display }}>LIVE</span>
          </div>}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Active banner */}
        <div style={{ background: C.greenL, border: `1px solid ${C.green}30`, borderRadius: 14, padding: "12px 16px", marginBottom: 12, display: "flex", gap: 10, alignItems: "center", animation: "fadeUp 0.4s ease" }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.green, fontFamily: F.display }}>Full access granted</div>
            <div style={{ fontSize: 12, color: C.ink2, fontFamily: F.body }}>Session ends at 08:00  ·  6h 23m remaining</div>
          </div>
        </div>

        {/* Double-up crew */}
        <Card accent="#90CAF9" style={{ background: C.blueL }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 10 }}>Double-Up Team</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["OJ","You","Lead",C.teal],["SR","A. Mensah","Support",C.tealD]].map(([init,name,role,col],i) => (
              <div key={i} style={{ flex: 1, background: C.white, borderRadius: 12, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={init} size={32} bg={col} color={C.white} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, fontFamily: F.display }}>{name}</div>
                  <div style={{ fontSize: 11, color: C.smoke, fontFamily: F.body }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Client — full */}
        <Card accent={C.tealM}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, background: C.tealL, border: `2px solid ${C.tealM}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👤</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.4 }}>James Sega</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                <Pill label="Night Care" color={C.tealD} bg={C.tealL} size="sm" />
                <Pill label="2-to-1 Required" color={C.blue} bg={C.blueL} size="sm" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, background: C.goldL, borderRadius: 10, padding: "8px 12px", border: `1px solid ${C.gold}30` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, fontFamily: F.display }}>⚠️ Manual Handling Note</div>
            <div style={{ fontSize: 11, color: C.ink2, marginTop: 2, fontFamily: F.body }}>Requires 2 workers for all transfers. Do not attempt solo.</div>
          </div>
        </Card>

        {/* Tasks */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display }}>Visit Tasks</div>
            <Pill label={`${tasks.filter(Boolean).length} / 4`} color={tasks.filter(Boolean).length === 4 ? C.green : C.amber} bg={tasks.filter(Boolean).length === 4 ? C.greenL : C.amberL} size="sm" />
          </div>
          {["Personal care (2-worker lift)", "Medication administration", "Night check-in (02:00)", "Morning handover notes"].map((t, i) => (
            <div key={i} onClick={() => { const n = [...tasks]; n[i] = !n[i]; setTasks(n); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.fog}` : "none", cursor: "pointer" }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: tasks[i] ? C.teal : "transparent", border: `2px solid ${tasks[i] ? C.teal : C.mist}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {tasks[i] && <span style={{ color: C.white, fontSize: 12, animation: "tick 0.3s ease" }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: tasks[i] ? C.smoke : C.ink, fontFamily: F.body, textDecoration: tasks[i] ? "line-through" : "none", transition: "all 0.2s" }}>{t}</span>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", gap: 9, marginBottom: 6 }}>
          <button onClick={onNote} style={{ flex: 2, padding: "13px 0", background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, border: "none", borderRadius: 13, color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.display, boxShadow: `0 4px 16px ${C.tealGlow}` }}>📋 Record Visit Note</button>
          <button style={{ flex: 1, padding: "13px 0", background: C.lockedL, border: `1.5px solid ${C.locked}30`, borderRadius: 13, color: C.locked, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.display }}>🚨 Incident</button>
        </div>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 6 — VISIT NOTE
// ════════════════════════════════════════════════════════════════════════════════
function Screen6Note({ onBack }) {
  const [status, setStatus] = useState("Green");
  const [done, setDone] = useState([false, false, false, false]);
  const [cosign, setCosign] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, ${C.tealD}, ${C.teal})` }}>
        <StatusBar light />
        <TopBar title="Visit Note" onBack={onBack} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{ width: 90, height: 90, borderRadius: 28, background: C.greenL, border: `2px solid ${C.green}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, marginBottom: 20, animation: "tick 0.5s ease" }}>✅</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, fontFamily: F.display, letterSpacing: -0.5 }}>Note Submitted</div>
        <div style={{ fontSize: 14, color: C.smoke, marginTop: 8, fontFamily: F.body, lineHeight: 1.6 }}>Your visit note is locked and saved.<br />Manager notified of completion.</div>
        <button onClick={onBack} style={{ marginTop: 28, padding: "13px 32px", background: C.fog, border: "none", borderRadius: 13, color: C.ink3, fontSize: 14, fontWeight: 600, fontFamily: F.display, cursor: "pointer" }}>Back to Shift</button>
      </div>
    </Phone>
  );

  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, ${C.tealD}, ${C.teal})` }}>
        <StatusBar light />
        <TopBar title="Record Visit Note" onBack={onBack} subtitle="James Sega  ·  28 May  ·  20:00–08:00" />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Status */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 10 }}>Visit Status</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["Green","✅",C.green,C.greenL],["Amber","⚠️",C.amber,C.amberL],["Red","🔴",C.red,C.redL]].map(([s,icon,col,bg]) => (
              <button key={s} onClick={() => setStatus(s)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: `2px solid ${status===s ? col : C.mist}`, background: status===s ? bg : C.white, color: col, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>
                {icon} {s}
              </button>
            ))}
          </div>
        </Card>

        {/* Observations */}
        <Card>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Observations</div>
          <textarea placeholder="Client condition, behaviour, concerns…" style={{ width: "100%", minHeight: 80, padding: "10px 12px", borderRadius: 12, border: `2px solid ${C.fog}`, fontSize: 13, fontFamily: F.body, resize: "none", color: C.ink, background: C.snow, outline: "none", boxSizing: "border-box" }} />
        </Card>

        {/* Tasks */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display }}>Tasks</div>
            <Pill label={`${done.filter(Boolean).length} / 4`} color={C.green} bg={C.greenL} size="sm" />
          </div>
          {["Personal care (2-worker)","Medication administered","Night check-in","Morning handover"].map((t,i) => (
            <div key={i} onClick={() => { const n=[...done]; n[i]=!n[i]; setDone(n); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: i>0?`1px solid ${C.fog}`:"none", cursor: "pointer" }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: done[i]?C.teal:"transparent", border: `2px solid ${done[i]?C.teal:C.mist}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                {done[i] && <span style={{ color: C.white, fontSize: 12, animation: "tick 0.3s ease" }}>✓</span>}
              </div>
              <span style={{ fontSize: 13, color: done[i]?C.smoke:C.ink, fontFamily: F.body, textDecoration: done[i]?"line-through":"none", transition: "all 0.2s" }}>{t}</span>
            </div>
          ))}
        </Card>

        {/* Co-worker sign-off */}
        <Card accent="#90CAF9" style={{ background: C.blueL }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, fontFamily: F.display }}>Co-Worker Sign-Off</div>
              <div style={{ fontSize: 11, color: C.smoke, fontFamily: F.body, marginTop: 2 }}>A. Mensah confirms attendance</div>
            </div>
            <div onClick={() => setCosign(!cosign)} style={{ width: 46, height: 26, borderRadius: 13, background: cosign ? C.green : C.mist, cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: C.white, position: "absolute", top: 2, left: cosign ? 22 : 2, transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </Card>

        <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "14px 0", background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, border: "none", borderRadius: 14, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", marginBottom: 6, boxShadow: `0 6px 20px ${C.tealGlow}` }}>
          Submit Visit Note ✓
        </button>
        <div style={{ textAlign: "center", fontSize: 11, color: C.smoke, fontFamily: F.body, marginBottom: 12 }}>Submitted notes are permanently locked</div>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 7 — SL SHIFT LOCKED
// ════════════════════════════════════════════════════════════════════════════════
function Screen7SLLocked({ onBack, onNext }) {
  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, #3B3080, ${C.purple})` }}>
        <StatusBar light />
        <TopBar title="Shift Details" onBack={onBack} bg="transparent" right={<Pill label="🏠 Supported Living" color={C.white} bg="rgba(255,255,255,0.18)" />} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        <div style={{ background: C.lockedL, border: `1px solid ${C.locked}30`, borderRadius: 14, padding: "12px 16px", marginBottom: 12, display: "flex", gap: 10 }}>
          <div style={{ fontSize: 22, flexShrink: 0 }}>🔒</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.locked, fontFamily: F.display }}>Shift not yet active</div>
            <div style={{ fontSize: 12, color: C.ink2, marginTop: 2, fontFamily: F.body }}>Resident details unlock at <strong>08:00</strong>. House address shown for planning.</div>
          </div>
        </div>

        <Card accent={C.tealM} style={{ background: `linear-gradient(135deg, ${C.tealL}, ${C.white})` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 6 }}>Shift Time</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.teal, fontFamily: F.display, letterSpacing: -0.8 }}>08:00 — 20:00</div>
          <div style={{ fontSize: 12, color: C.smoke, marginTop: 4, fontFamily: F.body }}>Sat 9 May 2026  ·  Day Shift  ·  12 hrs</div>
        </Card>

        {/* House — visible */}
        <Card accent="#B39DDB" style={{ background: C.purpleL }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Supported Living House</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 28 }}>🏠</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.purple, fontFamily: F.display }}>Maple House</div>
              <div style={{ fontSize: 12, color: C.ink2, fontFamily: F.body }}>22 Orchard Close, Bedford  ·  MK55 6JJ</div>
            </div>
          </div>
          <button style={{ marginTop: 10, background: C.purple, border: "none", color: C.white, padding: "7px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.display }}>📍 View Map</button>
        </Card>

        {/* Residents locked */}
        <Card>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Residents — 4 assigned</div>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: `1px solid ${C.fog}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: C.fog, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
              <span style={{ fontSize: 12, color: C.mist, fontFamily: F.body }}>Resident {i}  —  ••••• •••••••</span>
              <span style={{ marginLeft: "auto", fontSize: 14 }}>🔒</span>
            </div>
          ))}
        </Card>

        <Card style={{ background: C.snow, border: `1.5px dashed ${C.mist}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Unlocks at 08:00</div>
          {["All resident profiles & care plans","Individual medication schedules","Daily activity & task lists","Incident & behaviour reporting","Handover from night shift"].map((item,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderTop: i>0?`1px solid ${C.fog}`:"none" }}>
              <span style={{ fontSize: 12 }}>🔒</span>
              <span style={{ fontSize: 11, color: C.smoke, fontFamily: F.body }}>{item}</span>
            </div>
          ))}
        </Card>
        <button onClick={onNext} style={{ width: "100%", padding: "14px 0", background: `linear-gradient(135deg, ${C.purple}, #7B6FD0)`, border: "none", borderRadius: 14, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", marginTop: 4, boxShadow: "0 6px 20px rgba(80,68,160,0.3)" }}>
          Preview: Shift Active →
        </button>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 8 — SL HOUSE DASHBOARD (ACTIVE)
// ════════════════════════════════════════════════════════════════════════════════
function Screen8SLDash({ onBack, onResident }) {
  const residents = [
    { name: "Resident A",  room: "Rm 1", status: "Green", flag: false, note: "" },
    { name: "Resident B",   room: "Rm 2", status: "Amber", flag: true,  note: "Unsettled overnight — monitor closely" },
    { name: "Resident C",    room: "Rm 3", status: "Green", flag: false, note: "" },
    { name: "Resident D",    room: "Rm 4", status: "Green", flag: false, note: "Physio at 11:00" },
  ];
  const sCol = s => s==="Green"?C.green:s==="Amber"?C.amber:C.red;
  const sBg  = s => s==="Green"?C.greenL:s==="Amber"?C.amberL:C.redL;

  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, #3B3080, ${C.purple})` }}>
        <StatusBar light />
        <TopBar title="Maple House" bg="transparent"
          subtitle="Day Shift  ·  08:00–20:00  ·  4h 12m remaining" onBack={onBack}
          right={<div style={{ display: "flex", alignItems: "center", gap: 5, background: C.green, borderRadius: 20, padding: "5px 11px" }}>
            <div style={{ width: 6, height: 6, borderRadius: 6, background: C.white, animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.white, fontFamily: F.display }}>LIVE</span>
          </div>}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Active banner */}
        <div style={{ background: C.greenL, border: `1px solid ${C.green}30`, borderRadius: 14, padding: "10px 14px", marginBottom: 12, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 18 }}>✅</span>
          <div style={{ fontSize: 12, color: C.green, fontWeight: 700, fontFamily: F.display }}>Shift active  ·  Full access granted</div>
        </div>

        {/* House summary stats */}
        <Card accent="#B39DDB" style={{ background: C.purpleL }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🏠</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.purple, fontFamily: F.display }}>Maple House</div>
              <div style={{ fontSize: 11, color: C.ink3, fontFamily: F.body }}>22 Orchard Close, Bedford  ·  MK55 6JJ</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[[3,"On track",C.green,C.greenL],[1,"Needs review",C.amber,C.amberL],[0,"Incidents",C.red,C.redL]].map(([n,label,col,bg],i) => (
              <div key={i} style={{ flex: 1, background: bg, borderRadius: 10, padding: "10px 0", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: col, fontFamily: F.display }}>{n}</div>
                <div style={{ fontSize: 10, color: C.smoke, fontFamily: F.body }}>{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resident list */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display }}>Residents — tap to open</div>
            <Pill label="4 residents" color={C.purple} bg={C.purpleL} size="sm" />
          </div>
          {residents.map((r,i) => (
            <div key={i} onClick={() => onResident(r)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: i>0?`1px solid ${C.fog}`:"none", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: sBg(r.status), border: `2px solid ${sCol(r.status)}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: F.display }}>{r.name}</span>
                  {r.flag && <span style={{ fontSize: 13 }}>⚠️</span>}
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 3, flexWrap: "wrap" }}>
                  <Pill label={r.room} color={C.purple} bg={C.purpleL} size="sm" />
                  <Pill label={r.status} color={sCol(r.status)} bg={sBg(r.status)} size="sm" />
                  {r.note && <Pill label={r.note.slice(0,22)+"…"} color={C.smoke} bg={C.fog} size="sm" />}
                </div>
              </div>
              <span style={{ color: C.mist, fontSize: 16 }}>›</span>
            </div>
          ))}
        </Card>

        <button style={{ width: "100%", padding: "13px 0", background: `linear-gradient(135deg, ${C.purple}, #7B6FD0)`, border: "none", borderRadius: 13, color: C.white, fontSize: 13, fontWeight: 700, fontFamily: F.display, cursor: "pointer", boxShadow: "0 4px 16px rgba(80,68,160,0.3)" }}>
          📋 House Handover Notes
        </button>
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 9 — SL RESIDENT PROFILE & CARE NOTE
// ════════════════════════════════════════════════════════════════════════════════
function Screen9SLResident({ resident, onBack }) {
  const [tab, setTab] = useState("profile");
  const [noteStatus, setNoteStatus] = useState("Green");
  const [done, setDone] = useState([false, false, false]);
  const [submitted, setSubmitted] = useState(false);
  const sCol = s => s==="Green"?C.green:s==="Amber"?C.amber:C.red;
  const sBg  = s => s==="Green"?C.greenL:s==="Amber"?C.amberL:C.redL;

  if (submitted) return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, #3B3080, ${C.purple})` }}>
        <StatusBar light /><TopBar title={resident.name} onBack={onBack} bg="transparent" />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 16, animation: "tick 0.5s ease" }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, fontFamily: F.display }}>Care Note Saved</div>
        <div style={{ fontSize: 13, color: C.smoke, marginTop: 8, fontFamily: F.body }}>Saved to {resident.name}'s individual record.</div>
        <button onClick={onBack} style={{ marginTop: 24, padding: "12px 28px", background: C.fog, border: "none", borderRadius: 12, color: C.ink3, fontSize: 14, fontWeight: 600, fontFamily: F.display, cursor: "pointer" }}>← Back to House</button>
      </div>
    </Phone>
  );

  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, #3B3080, ${C.purple})` }}>
        <StatusBar light />
        <TopBar title={resident.name} onBack={onBack} bg="transparent" subtitle={`${resident.room}  ·  Maple House`}
          right={<Pill label={resident.status} color={sCol(resident.status)} bg={sBg(resident.status)} />}
        />
        {/* Tabs */}
        <div style={{ display: "flex", padding: "8px 16px 0", gap: 4 }}>
          {["profile","note"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px 0", background: tab===t?"rgba(255,255,255,0.18)":"transparent", border: "none", borderRadius: "10px 10px 0 0", color: tab===t?C.white:"rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>
              {t === "profile" ? "👤 Profile" : "📋 Care Note"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {tab === "profile" ? (
          <>
            {resident.flag && (
              <div style={{ background: C.amberL, border: `1px solid ${C.amber}40`, borderRadius: 14, padding: "12px 16px", marginBottom: 12, display: "flex", gap: 10 }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, fontFamily: F.display }}>Handover flag from night shift</div>
                  <div style={{ fontSize: 12, color: C.ink2, marginTop: 2, fontFamily: F.body }}>{resident.note}</div>
                </div>
              </div>
            )}
            <Card>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Today's Tasks</div>
              {["Morning routine & personal care","Medication — 09:00","Activity session — 14:00"].map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: i>0?`1px solid ${C.fog}`:"none" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${C.mist}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.ink, fontFamily: F.body }}>{t}</span>
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Care Summary</div>
              {[["Room","Rm 2  ·  Maple House"],["Care Level","Supported Living  ·  Medium"],["Key Worker","James Sega"],["GP","Dr A. Khan, Bedford Surgery"]].map(([k,v],i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "5px 0", borderTop: i>0?`1px solid ${C.fog}`:"none" }}>
                  <div style={{ fontSize: 12, color: C.smoke, fontFamily: F.body, width: 80, flexShrink: 0 }}>{k}</div>
                  <div style={{ fontSize: 13, color: C.ink, fontFamily: F.body, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </Card>
            <button onClick={() => setTab("note")} style={{ width: "100%", padding: "13px 0", background: `linear-gradient(135deg, ${C.purple}, #7B6FD0)`, border: "none", borderRadius: 13, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", boxShadow: "0 4px 16px rgba(80,68,160,0.3)" }}>
              📋 Record Care Note
            </button>
          </>
        ) : (
          <>
            <div style={{ background: C.purpleL, borderRadius: 14, padding: "10px 14px", marginBottom: 12, border: `1px solid #B39DDB` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.purple, fontFamily: F.display }}>{resident.name}  ·  Maple House  ·  {new Date().toLocaleDateString("en-GB")}</div>
              <div style={{ fontSize: 11, color: C.smoke, fontFamily: F.body, marginTop: 2 }}>Supported Living  ·  Day Shift  ·  Individual record</div>
            </div>
            <Card>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 10 }}>Status</div>
              <div style={{ display: "flex", gap: 7 }}>
                {[["Green","✅",C.green,C.greenL],["Amber","⚠️",C.amber,C.amberL],["Red","🔴",C.red,C.redL]].map(([s,icon,col,bg]) => (
                  <button key={s} onClick={() => setNoteStatus(s)} style={{ flex: 1, padding: "9px 0", borderRadius: 11, border: `2px solid ${noteStatus===s?col:C.mist}`, background: noteStatus===s?bg:C.white, color: col, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>
                    {icon} {s}
                  </button>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display, marginBottom: 8 }}>Observations</div>
              <textarea placeholder="Behaviour, mood, activities, concerns…" style={{ width: "100%", minHeight: 72, padding: "10px 12px", borderRadius: 12, border: `2px solid ${C.fog}`, fontSize: 13, fontFamily: F.body, resize: "none", color: C.ink, background: C.snow, outline: "none", boxSizing: "border-box" }} />
            </Card>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.smoke, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: F.display }}>Tasks</div>
                <Pill label={`${done.filter(Boolean).length}/3`} color={C.green} bg={C.greenL} size="sm" />
              </div>
              {["Morning routine & personal care","Medication — 09:00","Activity session — 14:00"].map((t,i) => (
                <div key={i} onClick={() => { const n=[...done]; n[i]=!n[i]; setDone(n); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderTop: i>0?`1px solid ${C.fog}`:"none", cursor: "pointer" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 7, background: done[i]?C.teal:"transparent", border: `2px solid ${done[i]?C.teal:C.mist}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                    {done[i] && <span style={{ color: C.white, fontSize: 12, animation: "tick 0.3s ease" }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 13, color: done[i]?C.smoke:C.ink, fontFamily: F.body, textDecoration: done[i]?"line-through":"none", transition: "all 0.2s" }}>{t}</span>
                </div>
              ))}
            </Card>
            <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "13px 0", background: `linear-gradient(135deg, ${C.purple}, #7B6FD0)`, border: "none", borderRadius: 13, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", marginBottom: 6, boxShadow: "0 4px 16px rgba(80,68,160,0.3)" }}>
              Submit Care Note ✓
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: C.smoke, fontFamily: F.body, marginBottom: 10 }}>Saved to {resident.name}'s individual record only</div>
          </>
        )}
      </div>
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════════════════
export function MobileApp() {
  useEffect(() => { injectGlobalStyles(); }, []);

  const [screen, setScreen] = useState("login");
  const [selectedResident, setSelectedResident] = useState(null);

  const screenMap = {
    login:       { n: "1",  label: "Login  (Splash → Password → MFA)", tag: null },
    rota_lock:   { n: "2",  label: "Rota-Lock  —  Access Denied",       tag: null },
    calendar:    { n: "3",  label: "My Schedule  —  Calendar View",     tag: null },
    dom_locked:  { n: "4",  label: "Shift Detail  —  Locked",           tag: "DOM" },
    dom_active:  { n: "5",  label: "Shift Detail  —  Active (2-to-1)",  tag: "DOM" },
    dom_note:    { n: "6",  label: "Record Visit Note",                  tag: "DOM" },
    sl_locked:   { n: "7",  label: "SL Shift  —  Locked",               tag: "SL" },
    sl_dash:     { n: "8",  label: "House Dashboard  —  Active",        tag: "SL" },
    sl_resident: { n: "9",  label: "Resident Profile & Care Note",      tag: "SL" },
  };

  const order = ["login","rota_lock","calendar","dom_locked","dom_active","dom_note","sl_locked","sl_dash","sl_resident"];
  const cur = screen;
  const curIdx = order.indexOf(cur);

  function renderScreen() {
    switch(screen) {
      case "login":       return <Screen1 onDone={() => setScreen("rota_lock")} />;
      case "rota_lock":   return <Screen2 onNext={() => setScreen("calendar")} />;
      case "calendar":    return <Screen3 onDom={() => setScreen("dom_locked")} onSL={() => setScreen("sl_locked")} />;
      case "dom_locked":  return <Screen4DomLocked onBack={() => setScreen("calendar")} onNext={() => setScreen("dom_active")} />;
      case "dom_active":  return <Screen5DomActive onBack={() => setScreen("dom_locked")} onNote={() => setScreen("dom_note")} />;
      case "dom_note":    return <Screen6Note onBack={() => setScreen("dom_active")} />;
      case "sl_locked":   return <Screen7SLLocked onBack={() => setScreen("calendar")} onNext={() => setScreen("sl_dash")} />;
      case "sl_dash":     return <Screen8SLDash onBack={() => setScreen("sl_locked")} onResident={r => { setSelectedResident(r); setScreen("sl_resident"); }} />;
      case "sl_resident": return <Screen9SLResident resident={selectedResident || { name:"Resident B", room:"Rm 2", status:"Amber", flag:true, note:"Unsettled overnight — monitor" }} onBack={() => setScreen("sl_dash")} />;
      default: return null;
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 20% 20%, #0D2040 0%, #0A0F1E 60%)", padding: "32px 20px 60px", fontFamily: F.body }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeUp 0.6s ease" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "rgba(10,107,114,0.15)", border: "1px solid rgba(10,107,114,0.3)", borderRadius: 20, padding: "12px 22px", backdropFilter: "blur(10px)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: `0 4px 16px ${C.tealGlow}` }}>🤝</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.white, fontFamily: F.display, letterSpacing: -0.4 }}>Affable Insights</div>
            <div style={{ fontSize: 11, color: C.tealM, fontFamily: F.body }}>Interactive Prototype  ·  9 Screens  ·  Both Care Models</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#4A5878", marginTop: 10, fontFamily: F.body }}>Navigate the full support worker flow · Use buttons within screens or jump below</div>
      </div>

      {/* Screen selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 28 }}>
        {/* DOM group */}
        <div style={{ background: "rgba(20,85,168,0.1)", border: "1px solid rgba(20,85,168,0.2)", borderRadius: 14, padding: "8px 10px", display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#5080C0", fontFamily: F.display, textTransform: "uppercase", letterSpacing: 0.8, marginRight: 4 }}>🚗 Auth + Dom</span>
          {order.slice(0,6).map(s => (
            <button key={s} onClick={() => setScreen(s)} style={{ background: cur===s ? C.teal : "rgba(255,255,255,0.04)", color: cur===s ? C.white : "#5080C0", border: `1px solid ${cur===s ? C.teal : "rgba(20,85,168,0.2)"}`, borderRadius: 9, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>
              {screenMap[s].n}
            </button>
          ))}
        </div>
        {/* SL group */}
        <div style={{ background: "rgba(80,68,160,0.1)", border: "1px solid rgba(80,68,160,0.2)", borderRadius: 14, padding: "8px 10px", display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#8070D0", fontFamily: F.display, textTransform: "uppercase", letterSpacing: 0.8, marginRight: 4 }}>🏠 SL</span>
          {order.slice(6).map(s => (
            <button key={s} onClick={() => setScreen(s)} style={{ background: cur===s ? C.purple : "rgba(255,255,255,0.04)", color: cur===s ? C.white : "#8070D0", border: `1px solid ${cur===s ? C.purple : "rgba(80,68,160,0.2)"}`, borderRadius: 9, padding: "5px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: F.display, transition: "all 0.2s" }}>
              {screenMap[s].n}
            </button>
          ))}
        </div>
      </div>

      {/* Screen render */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ScreenLabel n={screenMap[cur].n} title={screenMap[cur].label} tag={screenMap[cur].tag} />
        <div style={{ animation: "slideIn 0.3s ease" }} key={screen}>
          {renderScreen()}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
        <button onClick={() => setScreen(order[Math.max(0, curIdx-1)])} disabled={curIdx===0}
          style={{ background: curIdx===0 ? "rgba(255,255,255,0.04)" : `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, color: C.white, border: "none", borderRadius: 12, padding: "10px 20px", fontWeight: 700, cursor: curIdx===0?"default":"pointer", fontFamily: F.display, fontSize: 13, opacity: curIdx===0?0.3:1, transition: "all 0.2s", boxShadow: curIdx===0?"none":`0 4px 16px ${C.tealGlow}` }}>← Prev</button>
        <span style={{ fontFamily: F.display, fontSize: 13, color: "#4A5878", alignSelf: "center" }}>{curIdx+1} / {order.length}</span>
        <button onClick={() => setScreen(order[Math.min(order.length-1, curIdx+1)])} disabled={curIdx===order.length-1}
          style={{ background: curIdx===order.length-1 ? "rgba(255,255,255,0.04)" : `linear-gradient(135deg, ${C.teal}, #0D9AA6)`, color: C.white, border: "none", borderRadius: 12, padding: "10px 20px", fontWeight: 700, cursor: curIdx===order.length-1?"default":"pointer", fontFamily: F.display, fontSize: 13, opacity: curIdx===order.length-1?0.3:1, transition: "all 0.2s", boxShadow: curIdx===order.length-1?"none":`0 4px 16px ${C.tealGlow}` }}>Next →</button>
      </div>

      {/* Flow map */}
      <div style={{ maxWidth: 520, margin: "24px auto 0", background: "rgba(255,255,255,0.03)", borderRadius: 18, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#3A4A60", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontFamily: F.display }}>Full User Flow</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
          {["Login","→","Rota-Lock","→","Calendar","→","Dom: Locked","→","Dom: Active","→","Visit Note","  ·  ","SL: Locked","→","House Dash","→","Resident + Note"].map((s,i) => {
            const isArrow = s === "→" || s === "  ·  ";
            const isLocked = s.includes("Locked");
            const isSL = s.startsWith("SL") || s.startsWith("House") || s.startsWith("Resident");
            return (
              <span key={i} style={{
                background: isArrow ? "transparent" : isLocked ? "rgba(160,32,24,0.12)" : isSL ? "rgba(80,68,160,0.15)" : "rgba(10,107,114,0.12)",
                color: isArrow ? "#2A3A50" : isLocked ? "#C04030" : isSL ? "#7060C0" : C.tealM,
                padding: isArrow ? "0 2px" : "3px 9px",
                borderRadius: 7, fontSize: 11, fontWeight: 700, fontFamily: F.display,
              }}>{s}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
