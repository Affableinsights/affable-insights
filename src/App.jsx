import { useState, useEffect } from "react";
import { MobileApp } from "./MobilePrototype.jsx";
import { AdminApp }  from "./AdminPrototype.jsx";

const C = {
  teal:"#0A6B72", tealD:"#074F54", tealL:"#D6F0F2", tealM:"#7EC8CC",
  navy:"#0A1628", ink:"#0A0F1E", smoke:"#8A90A0", white:"#FFFFFF",
  fog:"#EEF0F5", snow:"#F7F8FA",
};
const F = { display:"'Sora','DM Sans',sans-serif", body:"'DM Sans','Sora',sans-serif" };

const GCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A1628; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  @keyframes float  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
`;

function injectCSS() {
  if (document.getElementById("landing-css")) return;
  const s = document.createElement("style");
  s.id = "landing-css"; s.textContent = GCSS;
  document.head.appendChild(s);
}

// ── Landing page ─────────────────────────────────────────────────────────────
function Landing({ onSelect }) {
  const cards = [
    {
      id: "mobile",
      icon: "📱",
      title: "Support Worker App",
      subtitle: "Mobile prototype",
      desc: "9 screens covering the full support worker flow on a phone — login, rota-lock, calendar, domiciliary visits, supported living house dashboard, care notes, and visit sign-off.",
      screens: ["Login & MFA","Rota-Lock screen","Monthly calendar","Dom: locked & active shift","2-to-1 visit + care note","SL house dashboard","Resident profile & care note"],
      tag: "9 screens",
      tagColor: C.teal,
      tagBg: C.tealL,
      gradient: "linear-gradient(135deg, #0A6B72, #0D9AA6)",
      glow: "rgba(10,107,114,0.4)",
      device: "📱 Mobile",
    },
    {
      id: "admin",
      icon: "🖥️",
      title: "Manager & Admin Portal",
      subtitle: "Desktop prototype",
      desc: "6 screens covering the full manager workflow on desktop — login, live dashboard, drag-and-drop rota builder for both services, care plan management, incident handling, and reports.",
      screens: ["Login & MFA","Live dashboard + alerts","Rota: drag, drop & duplicate","Care plans: 5-tab editor","Incidents: log & resolve","Reports & immutable audit log"],
      tag: "6 screens",
      tagColor: "#5044A0",
      tagBg: "#EDEAF8",
      gradient: "linear-gradient(135deg, #3B3080, #5044A0)",
      glow: "rgba(80,68,160,0.4)",
      device: "🖥️ Desktop",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 30% 20%, #0D2040 0%, #0A1628 65%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px 60px" }}>

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.6s ease" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, #0A6B72, #0D9AA6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: "0 8px 32px rgba(10,107,114,0.4)", animation: "float 4s ease-in-out infinite" }}>🤝</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: C.white, fontFamily: F.display, letterSpacing: -0.8, lineHeight: 1 }}>Affable Insights</div>
            <div style={{ fontSize: 14, color: C.tealM, fontFamily: F.body, marginTop: 3 }}>Unified Health & Social Care Platform</div>
          </div>
        </div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", fontFamily: F.body, maxWidth: 520, lineHeight: 1.6 }}>
          Interactive prototype — choose a view to explore
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
          <div style={{ width: 7, height: 7, borderRadius: 7, background: "#1C7A42", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontSize: 12, color: "#1C7A42", fontFamily: F.display, fontWeight: 700 }}>Prototype live — all placeholder data</span>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.6s 0.1s ease both" }}>
        {cards.map((card) => (
          <div key={card.id} onClick={() => onSelect(card.id)}
            style={{ width: 400, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", backdropFilter: "blur(10px)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 24px 60px ${card.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, boxShadow: `0 6px 24px ${card.glow}` }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.white, fontFamily: F.display, letterSpacing: -0.4 }}>{card.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: F.body }}>{card.device}</span>
                  <span style={{ width: 3, height: 3, borderRadius: 3, background: "rgba(255,255,255,0.2)" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: card.tagColor, background: card.tagBg, borderRadius: 20, padding: "2px 8px", fontFamily: F.display }}>{card.tag}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: F.body, lineHeight: 1.65, marginBottom: 20 }}>
              {card.desc}
            </div>

            {/* Screen list */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", marginBottom: 22, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, fontFamily: F.display, marginBottom: 10 }}>Screens included</div>
              {card.screens.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: 6, background: card.tagColor, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: F.body }}>{s}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{ width: "100%", padding: "13px 0", background: card.gradient, border: "none", borderRadius: 14, color: C.white, fontSize: 14, fontWeight: 700, fontFamily: F.display, cursor: "pointer", boxShadow: `0 6px 24px ${card.glow}`, letterSpacing: -0.2 }}>
              Open {card.title} →
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: "center", animation: "fadeUp 0.6s 0.3s ease both" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: F.body, lineHeight: 1.8 }}>
          Affable Insights  ·  106 Harlequin Crescent, Bedford, MK42 6EH  ·  Confidential prototype<br />
          All names, addresses, and data shown are fictional placeholders only
        </div>
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { injectCSS(); }, []);
  const [view, setView] = useState("landing"); // "landing" | "mobile" | "admin"

  // Back button overlay (shown when inside a prototype)
  const BackBtn = () => (
    <div style={{ position: "fixed", top: 16, left: 16, zIndex: 9999 }}>
      <button onClick={() => setView("landing")}
        style={{ background: "rgba(10,107,114,0.9)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", color: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.display, backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
        ← All Prototypes
      </button>
    </div>
  );

  if (view === "mobile") return <><BackBtn /><MobileApp /></>;
  if (view === "admin")  return <><BackBtn /><AdminApp /></>;
  return <Landing onSelect={setView} />;
}
