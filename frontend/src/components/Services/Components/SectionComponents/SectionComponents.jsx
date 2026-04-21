import React from "react";

// ─── Color tokens ─────────────────────────────────────────────────────────────

const ACCENT_COLORS = {
  blue:   { bg: "#E6F1FB", text: "#0C447C", iconStroke: "#185FA5", sectionBg: "#F4F8FD" },
  green:  { bg: "#EAF3DE", text: "#27500A", iconStroke: "#3B6D11", sectionBg: "#F5FAF0" },
  purple: { bg: "#EEEDFE", text: "#3C3489", iconStroke: "#534AB7", sectionBg: "#F5F4FE" },
  teal:   { bg: "#E1F5EE", text: "#085041", iconStroke: "#0F6E56", sectionBg: "#F0FAF6" },
  amber:  { bg: "#FAEEDA", text: "#633806", iconStroke: "#854F0B", sectionBg: "#FDF7EE" },
  coral:  { bg: "#FAECE7", text: "#712B13", iconStroke: "#993C1D", sectionBg: "#FDF1EC" },
};

const RISK_DOTS = {
  low:      "#639922",
  medium:   "#EF9F27",
  high:     "#D85A30",
  critical: "#E24B4A",
};

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const Icons = {
  briefcase: (s) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="5" width="12" height="9" rx="2" stroke={s} strokeWidth="1.2" />
      <path d="M5 5V4a3 3 0 0 1 6 0v1" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="9" x2="14" y2="9" stroke={s} strokeWidth="1.2" />
    </svg>
  ),
  shield: (s) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L13 4.5V8c0 2.8-2 4.8-5 6-3-1.2-5-3.2-5-6V4.5L8 2Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.5 8l1.5 1.5 3-3" stroke={s} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  monitor: (s) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2.5" width="14" height="9" rx="2" stroke={s} strokeWidth="1.2" />
      <path d="M5.5 13.5h5" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 11.5v2" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  cpu: (s) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke={s} strokeWidth="1.2" />
      <line x1="6" y1="2" x2="6" y2="4" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="2" x2="10" y2="4" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="12" x2="6" y2="14" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="12" x2="10" y2="14" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="6" x2="4" y2="6" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="10" x2="4" y2="10" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="6" x2="14" y2="6" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="10" x2="14" y2="10" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  alert: (s) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 13H2L8 2Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="8" y1="6.5" x2="8" y2="9.5" stroke={s} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="0.7" fill={s} />
    </svg>
  ),
};

// ─── InfoCardsSection ─────────────────────────────────────────────────────────
/**
 * @param {object}   props
 * @param {string}   props.label        - Eyebrow label (e.g. "Pricing & structure")
 * @param {string}   props.title        - Section heading
 * @param {string}   props.icon         - Icon key: "briefcase" | "shield" | "monitor" | "cpu"
 * @param {string}   props.accentColor  - Color key: "blue" | "green" | "purple" | "teal" | "amber" | "coral"
 * @param {Array}    props.cards        - [{ badge, title, description }]
 */
export function InfoCardsSection({ label, title, icon, accentColor = "blue", cards = [] }) {
  const color = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue;
  const IconEl = Icons[icon];

  return (
    <div  style={{ padding: "2rem 1.5rem", background: color.sectionBg }}>
      <div className="container"> 
      {label && (
        <p style={{
          fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "#888780", margin: "0 0 6px",
        }}>
          {label}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        {IconEl && (
          <span style={{
            width: 32, height: 32, borderRadius: "50%", background: color.bg,
            display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {IconEl(color.iconStroke)}
          </span>
        )}
        <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>{title}</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
      }}>
        {cards.map((card, i) => (
          <div key={i} style={{
            background: "#ffffff",
            border: "0.5px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "1rem 1.1rem",
          }}>
            {card.badge && (
              <span style={{
                display: "inline-block", fontSize: 13, fontWeight: 500,
                padding: "2px 8px", borderRadius: 99,
                background: color.bg, color: color.text, marginBottom: 8,
              }}>
                {card.badge}
              </span>
            )}
            <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", margin: "0 0 4px" }}>{card.title}</p>
            <p style={{ fontSize: 15, color: "#6b6b6b", margin: 0, lineHeight: 1.55 }}>{card.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

// ─── RisksSection ─────────────────────────────────────────────────────────────
/**
 * @param {object}   props
 * @param {string}   props.label   - Eyebrow label (e.g. "What to watch out for")
 * @param {string}   props.title   - Section heading
 * @param {Array}    props.risks   - [{ severity, title, description }]
 *                                   severity: "low" | "medium" | "high" | "critical"
 */
export function RisksSection({ label, title, risks = [] }) {
  return (
    <div className="container" style={{ padding: "1.75rem 1.5rem 1.5rem", background: "#ffffff" }}>
      {label && (
        <p style={{
          fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "#888780", margin: "0 0 6px",
        }}>
          {label}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <span style={{
          width: 32, height: 32, borderRadius: "50%", background: "#FCEBEB",
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {Icons.alert("#A32D2D")}
        </span>
        <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>{title}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {risks.map((risk, i) => (
          <div key={i} style={{
            background: "#ffffff",
            border: "0.5px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "1rem 1.1rem",
            display: "flex", gap: 12, alignItems: "flex-start",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: RISK_DOTS[risk.severity] || RISK_DOTS.medium,
              flexShrink: 0, marginTop: 5,
            }} />
            <div>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", margin: "0 0 3px" }}>{risk.title}</p>
              <p style={{ fontSize: 15, color: "#6b6b6b", margin: 0, lineHeight: 1.55 }}>{risk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Usage example ────────────────────────────────────────────────────────────
//
// import { InfoCardsSection, RisksSection } from "./SectionComponents";
// import { commercialModels, risksAndConsiderations } from "./sectionData.json";
//
// <InfoCardsSection {...commercialModels} />
// <RisksSection {...risksAndConsiderations} />
