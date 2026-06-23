"use client";

/**
 * _CharacterParts — High-fidelity anime SVG primitives for Reeti.
 *
 * Reference: tall anime girl, long wavy dark hair, big lavender eyes,
 * white collared shirt, mauve vest, dark pleated skirt, lavender socks,
 * brown platform shoes. Natural proportions (not chibi).
 *
 * Coordinate system: parent <svg viewBox="0 0 400 560">
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ============================================================
 * COLOR PALETTE — matched to reference image
 * ============================================================ */
export const COLORS = {
  // Skin
  skin: "#FCEADE",
  skinMid: "#F5CEBC",
  skinShadow: "#EDB89A",
  skinDeep: "#D9957A",

  // Hair — very dark brown/black with warm highlight
  hair: "#1A1218",
  hairMid: "#2E1F2B",
  hairHighlight: "#4A3040",
  hairSheen: "#6B4A5A",

  // Eyes — soft lavender-purple, richly shaded
  iris: "#9B8AC4",
  irisLight: "#C3AEE8",
  irisDark: "#5C4A8A",
  pupil: "#1A1218",
  eyeWhite: "#FAFAFA",
  eyeReflect: "#FFFFFF",
  eyeLash: "#1A1218",
  eyebrow: "#251820",

  // Face
  blush: "#F0A898",
  blushLight: "#F8C4B8",
  lips: "#C4756A",
  lipsLight: "#D9948A",
  nose: "#E0A08A",

  // Shirt — crisp white with collar detail
  shirt: "#F8F4EF",
  shirtShadow: "#E8E0D8",
  shirtDeep: "#D4C8BC",
  collar: "#E8B4C0",  // pink collar tie

  // Vest — soft mauve/lavender
  vest: "#C4A0B4",
  vestLight: "#D8B8C8",
  vestShadow: "#A07890",
  vestDeep: "#8A607A",
  vestRibbing: "#B490A4",

  // Skirt — dark blue-purple, pleated
  skirt: "#3C3454",
  skirtLight: "#504868",
  skirtShadow: "#2A2440",
  skirtPleat: "#463C60",
  skirtHighlight: "#625880",

  // Socks — pale lavender
  socks: "#D4C8E8",
  socksLight: "#E4DCF4",
  socksShadow: "#B4A8CC",

  // Shoes — warm brown platform
  shoes: "#5C3E2E",
  shoesLight: "#7A5444",
  shoesSole: "#2E1E14",
  shoesHighlight: "#8A6050",

  // Fox
  foxBody: "#E8A882",
  foxBodyShadow: "#C47A5A",
  foxBelly: "#FAF0E8",
  foxNose: "#2D2438",
  foxMark: "#C47A5A",

  // Scene
  line: "#1A1218",
  lineLight: "#3A2830",
  shadow: "rgba(26,18,24,0.12)",
};

const LW = 1.8;   // standard line weight
const LWF = 1.4;   // fine detail line weight
const LWH = 2.4;   // heavy outline


/* ============================================================
 * LOW-LEVEL HELPERS
 * ============================================================ */

/** Single anime eye with iris gradient shading */
function Eye({
  cx, cy,
  scaleX = 1,
}: {
  cx: number; cy: number; scaleX?: number;
}) {
  const w = 11 * scaleX;
  const h = 14;
  return (
    <g>
      {/* White */}
      <ellipse cx={cx} cy={cy} rx={w} ry={h * 0.72} fill={COLORS.eyeWhite} />
      {/* Iris — layered for depth */}
      <ellipse cx={cx} cy={cy + 1} rx={w * 0.78} ry={h * 0.62} fill={COLORS.iris} />
      <ellipse cx={cx} cy={cy + 2} rx={w * 0.62} ry={h * 0.50} fill={COLORS.irisLight} opacity="0.55" />
      <ellipse cx={cx} cy={cy + 3} rx={w * 0.44} ry={h * 0.38} fill={COLORS.irisDark} opacity="0.7" />
      {/* Pupil */}
      <ellipse cx={cx} cy={cy + 2} rx={w * 0.30} ry={h * 0.28} fill={COLORS.pupil} />
      {/* Catchlight — two spots */}
      <circle cx={cx - w * 0.18} cy={cy - h * 0.18} r={w * 0.16} fill={COLORS.eyeReflect} opacity="0.95" />
      <circle cx={cx + w * 0.22} cy={cy + h * 0.05} r={w * 0.09} fill={COLORS.eyeReflect} opacity="0.7" />
      {/* Shadow at top of iris */}
      <ellipse cx={cx} cy={cy - h * 0.28} rx={w * 0.75} ry={h * 0.22} fill={COLORS.irisDark} opacity="0.35" />
      {/* Upper lash line */}
      <path
        d={`M ${cx - w} ${cy - h * 0.5} Q ${cx} ${cy - h * 0.82} ${cx + w} ${cy - h * 0.5}`}
        fill="none" stroke={COLORS.eyeLash} strokeWidth={LW + 0.6} strokeLinecap="round"
      />
      {/* Lower lash line */}
      <path
        d={`M ${cx - w * 0.85} ${cy + h * 0.45} Q ${cx} ${cy + h * 0.68} ${cx + w * 0.85} ${cy + h * 0.45}`}
        fill="none" stroke={COLORS.eyeLash} strokeWidth={LWF} strokeLinecap="round"
      />
      {/* Corner lashes */}
      <path d={`M ${cx - w} ${cy - h * 0.2} L ${cx - w - 3} ${cy - h * 0.42}`} stroke={COLORS.eyeLash} strokeWidth={LWF} strokeLinecap="round" />
      <path d={`M ${cx + w} ${cy - h * 0.2} L ${cx + w + 2} ${cy - h * 0.38}`} stroke={COLORS.eyeLash} strokeWidth={LWF} strokeLinecap="round" />
      {/* Eyelid crease */}
      <path
        d={`M ${cx - w * 0.6} ${cy - h * 0.52} Q ${cx} ${cy - h * 0.68} ${cx + w * 0.6} ${cy - h * 0.52}`}
        fill="none" stroke={COLORS.skinShadow} strokeWidth={LWF} strokeLinecap="round" opacity="0.5"
      />
    </g>
  );
}

/** Arched eyebrow */
function Eyebrow({ cx, cy, flip = false }: { cx: number; cy: number; flip?: boolean }) {
  const d = flip
    ? `M ${cx + 14} ${cy} Q ${cx + 4} ${cy - 8} ${cx - 10} ${cy - 4}`
    : `M ${cx - 14} ${cy} Q ${cx - 4} ${cy - 8} ${cx + 10} ${cy - 4}`;
  return (
    <path d={d} fill="none" stroke={COLORS.eyebrow} strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" />
  );
}


/* ============================================================
 * REETI HEAD — high-fidelity, natural anime proportions
 * ============================================================ */
export function ReetiHead({
  cx = 200,
  cy = 140,
}: {
  cx?: number;
  cy?: number;
}) {
  return (
    <g>
      {/* ── Back hair layer (behind face) ── */}
      <motion.g
        animate={{ rotate: [-0.8, 0.8, -0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy - 40}px` }}
      >
        {/* Left side flowing wave */}
        <path
          d={`
            M ${cx - 46} ${cy - 38}
            C ${cx - 72} ${cy + 20}, ${cx - 88} ${cy + 100}, ${cx - 80} ${cy + 200}
            C ${cx - 76} ${cy + 240}, ${cx - 68} ${cy + 280}, ${cx - 60} ${cy + 310}
            L ${cx - 38} ${cy + 316}
            C ${cx - 44} ${cy + 285}, ${cx - 52} ${cy + 248}, ${cx - 56} ${cy + 200}
            C ${cx - 62} ${cy + 106}, ${cx - 52} ${cy + 30}, ${cx - 36} ${cy - 10}
            Z
          `}
          fill={COLORS.hair}
          stroke={COLORS.line}
          strokeWidth={LW}
          strokeLinejoin="round"
        />
        {/* Right side flowing wave */}
        <path
          d={`
            M ${cx + 46} ${cy - 38}
            C ${cx + 72} ${cy + 20}, ${cx + 88} ${cy + 100}, ${cx + 80} ${cy + 200}
            C ${cx + 76} ${cy + 240}, ${cx + 68} ${cy + 280}, ${cx + 60} ${cy + 310}
            L ${cx + 38} ${cy + 316}
            C ${cx + 44} ${cy + 285}, ${cx + 52} ${cy + 248}, ${cx + 56} ${cy + 200}
            C ${cx + 62} ${cy + 106}, ${cx + 52} ${cy + 30}, ${cx + 36} ${cy - 10}
            Z
          `}
          fill={COLORS.hair}
          stroke={COLORS.line}
          strokeWidth={LW}
          strokeLinejoin="round"
        />

        {/* Hair wave highlight — left */}
        <path
          d={`M ${cx - 66} ${cy + 60} C ${cx - 74} ${cy + 130}, ${cx - 72} ${cy + 180}, ${cx - 64} ${cy + 230}`}
          fill="none" stroke={COLORS.hairHighlight} strokeWidth={2.2} strokeLinecap="round" opacity="0.6"
        />
        {/* Hair wave highlight — right */}
        <path
          d={`M ${cx + 66} ${cy + 60} C ${cx + 74} ${cy + 130}, ${cx + 72} ${cy + 180}, ${cx + 64} ${cy + 230}`}
          fill="none" stroke={COLORS.hairHighlight} strokeWidth={2.2} strokeLinecap="round" opacity="0.6"
        />
      </motion.g>

      {/* ── Face base ── */}
      {/* Face shadow for roundness */}
      <ellipse cx={cx + 2} cy={cy + 4} rx={50} ry={58} fill={COLORS.skinShadow} opacity="0.3" />
      {/* Main face */}
      <ellipse cx={cx} cy={cy} rx={50} ry={57} fill={COLORS.skin} stroke={COLORS.line} strokeWidth={LW} />
      {/* Chin detail — slightly tapered */}
      <path
        d={`M ${cx - 26} ${cy + 42} Q ${cx} ${cy + 64} ${cx + 26} ${cy + 42}`}
        fill={COLORS.skin} stroke="none"
      />
      <path
        d={`M ${cx - 26} ${cy + 42} Q ${cx} ${cy + 64} ${cx + 26} ${cy + 42}`}
        fill="none" stroke={COLORS.line} strokeWidth={LW} strokeLinecap="round"
      />

      {/* Neck */}
      <path
        d={`M ${cx - 16} ${cy + 52} L ${cx - 16} ${cy + 76} L ${cx + 16} ${cy + 76} L ${cx + 16} ${cy + 52}`}
        fill={COLORS.skin}
      />
      {/* Neck shadow */}
      <path
        d={`M ${cx - 4} ${cy + 54} L ${cx - 4} ${cy + 76} L ${cx + 8} ${cy + 76} L ${cx + 8} ${cy + 54}`}
        fill={COLORS.skinShadow} opacity="0.35"
      />
      <line x1={cx - 16} y1={cy + 52} x2={cx - 16} y2={cy + 76} stroke={COLORS.line} strokeWidth={LW} />
      <line x1={cx + 16} y1={cy + 52} x2={cx + 16} y2={cy + 76} stroke={COLORS.line} strokeWidth={LW} />

      {/* ── Hair crown (front layer, over face) ── */}
      <path
        d={`
          M ${cx - 52} ${cy - 26}
          C ${cx - 62} ${cy - 74}, ${cx - 28} ${cy - 96}, ${cx} ${cy - 94}
          C ${cx + 28} ${cy - 96}, ${cx + 62} ${cy - 74}, ${cx + 52} ${cy - 26}
          Z
        `}
        fill={COLORS.hair}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Crown hair sheen */}
      <path
        d={`M ${cx - 22} ${cy - 90} C ${cx - 8} ${cy - 96} ${cx + 14} ${cy - 92} ${cx + 28} ${cy - 82}`}
        fill="none" stroke={COLORS.hairSheen} strokeWidth={3} strokeLinecap="round" opacity="0.5"
      />

      {/* ── Blunt bangs — straight across with subtle variation ── */}
      <motion.g
        animate={{ y: [0, -0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d={`
            M ${cx - 52} ${cy - 26}
            L ${cx - 50} ${cy - 2}
            L ${cx - 38} ${cy - 6}
            L ${cx - 28} ${cy + 4}
            L ${cx - 14} ${cy - 4}
            L ${cx - 2}  ${cy + 2}
            L ${cx + 2}  ${cy + 2}
            L ${cx + 14} ${cy - 4}
            L ${cx + 28} ${cy + 4}
            L ${cx + 38} ${cy - 6}
            L ${cx + 50} ${cy - 2}
            L ${cx + 52} ${cy - 26}
            Z
          `}
          fill={COLORS.hair}
          stroke={COLORS.line}
          strokeWidth={LW}
          strokeLinejoin="round"
        />
        {/* Bang highlight */}
        <path
          d={`M ${cx - 18} ${cy - 18} C ${cx - 4} ${cy - 24} ${cx + 10} ${cy - 22} ${cx + 22} ${cy - 16}`}
          fill="none" stroke={COLORS.hairSheen} strokeWidth={2.4} strokeLinecap="round" opacity="0.45"
        />
      </motion.g>

      {/* ── Side hair strands ── */}
      <path
        d={`M ${cx - 50} ${cy - 26} C ${cx - 62} ${cy + 6}, ${cx - 60} ${cy + 48}, ${cx - 48} ${cy + 60}`}
        fill="none" stroke={COLORS.hair} strokeWidth={4.5} strokeLinecap="round"
      />
      <path
        d={`M ${cx - 50} ${cy - 26} C ${cx - 68} ${cy + 10}, ${cx - 64} ${cy + 52}, ${cx - 50} ${cy + 66}`}
        fill="none" stroke={COLORS.hairMid} strokeWidth={2.5} strokeLinecap="round"
      />
      <path
        d={`M ${cx + 50} ${cy - 26} C ${cx + 62} ${cy + 6}, ${cx + 60} ${cy + 48}, ${cx + 48} ${cy + 60}`}
        fill="none" stroke={COLORS.hair} strokeWidth={4.5} strokeLinecap="round"
      />
      <path
        d={`M ${cx + 50} ${cy - 26} C ${cx + 68} ${cy + 10}, ${cx + 64} ${cy + 52}, ${cx + 50} ${cy + 66}`}
        fill="none" stroke={COLORS.hairMid} strokeWidth={2.5} strokeLinecap="round"
      />

      {/* ── Eyebrows ── */}
      <Eyebrow cx={cx - 20} cy={cy - 10} />
      <Eyebrow cx={cx + 20} cy={cy - 10} flip />

      {/* ── Eyes with blink ── */}
      <motion.g
        animate={{ scaleY: [1, 1, 0.06, 1, 1] }}
        transition={{
          duration: 5, repeat: Infinity,
          times: [0, 0.92, 0.96, 1, 1],
          ease: "easeInOut",
        }}
        style={{ transformOrigin: `${cx}px ${cy + 10}px`, transformBox: "fill-box" }}
      >
        <Eye cx={cx - 20} cy={cy + 10} />
        <Eye cx={cx + 20} cy={cy + 10} />
      </motion.g>

      {/* ── Nose — subtle ── */}
      <path
        d={`M ${cx - 3} ${cy + 26} Q ${cx} ${cy + 30} ${cx + 3} ${cy + 26}`}
        fill="none" stroke={COLORS.nose} strokeWidth={LWF + 0.2} strokeLinecap="round"
      />

      {/* ── Mouth — soft smile ── */}
      <motion.g
        animate={{ scaleX: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy + 38}px` }}
      >
        <path
          d={`M ${cx - 8} ${cy + 36} Q ${cx} ${cy + 44} ${cx + 8} ${cy + 36}`}
          fill="none" stroke={COLORS.lips} strokeWidth={LW} strokeLinecap="round"
        />
        {/* Lower lip highlight */}
        <path
          d={`M ${cx - 4} ${cy + 42} Q ${cx} ${cy + 45} ${cx + 4} ${cy + 42}`}
          fill="none" stroke={COLORS.lipsLight} strokeWidth={LWF} strokeLinecap="round" opacity="0.7"
        />
      </motion.g>

      {/* ── Blush — soft circles ── */}
      <ellipse cx={cx - 30} cy={cy + 20} rx={10} ry={7} fill={COLORS.blush} opacity="0.38" />
      <ellipse cx={cx + 30} cy={cy + 20} rx={10} ry={7} fill={COLORS.blush} opacity="0.38" />
      {/* Softer outer blush */}
      <ellipse cx={cx - 30} cy={cy + 20} rx={15} ry={10} fill={COLORS.blushLight} opacity="0.18" />
      <ellipse cx={cx + 30} cy={cy + 20} rx={15} ry={10} fill={COLORS.blushLight} opacity="0.18" />

      {/* ── Face shading — cheek shadow, under chin ── */}
      <path
        d={`M ${cx - 50} ${cy + 10} Q ${cx - 48} ${cy + 40} ${cx - 26} ${cy + 54}`}
        fill="none" stroke={COLORS.skinShadow} strokeWidth={3} strokeLinecap="round" opacity="0.2"
      />
      <path
        d={`M ${cx + 50} ${cy + 10} Q ${cx + 48} ${cy + 40} ${cx + 26} ${cy + 54}`}
        fill="none" stroke={COLORS.skinShadow} strokeWidth={3} strokeLinecap="round" opacity="0.2"
      />
    </g>
  );
}


/* ============================================================
 * REETI TORSO — white shirt + mauve vest, detailed shading
 * ============================================================ */
export function ReetiTorso({
  cx = 200,
  cy = 280,
}: {
  cx?: number;
  cy?: number;
}) {
  return (
    <g>
      {/* ── White shirt base ── */}
      <path
        d={`
          M ${cx - 44} ${cy - 44}
          L ${cx - 50} ${cy + 60}
          L ${cx + 50} ${cy + 60}
          L ${cx + 44} ${cy - 44}
          Q ${cx + 20} ${cy - 60} ${cx} ${cy - 60}
          Q ${cx - 20} ${cy - 60} ${cx - 44} ${cy - 44}
          Z
        `}
        fill={COLORS.shirt}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Shirt fold shadow */}
      <path
        d={`M ${cx - 8} ${cy - 58} L ${cx - 6} ${cy + 20} Q ${cx} ${cy + 30} ${cx + 6} ${cy + 20} L ${cx + 8} ${cy - 58}`}
        fill={COLORS.shirtShadow} opacity="0.25"
      />
      {/* Side shadows */}
      <path
        d={`M ${cx - 44} ${cy - 44} L ${cx - 50} ${cy + 60} Q ${cx - 38} ${cy + 50} ${cx - 30} ${cy - 40} Z`}
        fill={COLORS.shirtShadow} opacity="0.35"
      />
      <path
        d={`M ${cx + 44} ${cy - 44} L ${cx + 50} ${cy + 60} Q ${cx + 38} ${cy + 50} ${cx + 30} ${cy - 40} Z`}
        fill={COLORS.shirtShadow} opacity="0.35"
      />

      {/* ── Collar — shirt collar ── */}
      <path
        d={`M ${cx - 20} ${cy - 56} L ${cx - 14} ${cy - 32} L ${cx} ${cy - 26} L ${cx + 14} ${cy - 32} L ${cx + 20} ${cy - 56}`}
        fill={COLORS.shirt} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
      />
      {/* Collar shadow */}
      <path
        d={`M ${cx - 10} ${cy - 56} L ${cx - 8} ${cy - 34} L ${cx} ${cy - 28} L ${cx + 8} ${cy - 34} L ${cx + 10} ${cy - 56}`}
        fill={COLORS.shirtShadow} opacity="0.4"
      />
      {/* Pink collar ribbon/tie */}
      <path
        d={`M ${cx - 6} ${cy - 28} L ${cx} ${cy - 16} L ${cx + 6} ${cy - 28} Z`}
        fill={COLORS.collar} stroke={COLORS.line} strokeWidth={LWF}
      />
      <circle cx={cx} cy={cx - 14 - (cx - 200)} r={3.5} fill={COLORS.collar} stroke={COLORS.line} strokeWidth={LWF} />

      {/* ── Vest/cardigan over shirt ── */}
      {/* Left vest panel */}
      <path
        d={`
          M ${cx - 42} ${cy - 42}
          L ${cx - 48} ${cy + 60}
          L ${cx - 4} ${cy + 60}
          L ${cx - 4} ${cy - 22}
          L ${cx - 16} ${cy - 48}
          Z
        `}
        fill={COLORS.vest}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Right vest panel */}
      <path
        d={`
          M ${cx + 42} ${cy - 42}
          L ${cx + 48} ${cy + 60}
          L ${cx + 4} ${cy + 60}
          L ${cx + 4} ${cy - 22}
          L ${cx + 16} ${cy - 48}
          Z
        `}
        fill={COLORS.vest}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Vest shading — left */}
      <path
        d={`M ${cx - 42} ${cy - 42} L ${cx - 48} ${cy + 60} Q ${cx - 36} ${cy + 50} ${cx - 28} ${cy - 38} Z`}
        fill={COLORS.vestShadow} opacity="0.4"
      />
      {/* Vest shading — right */}
      <path
        d={`M ${cx + 42} ${cy - 42} L ${cx + 48} ${cy + 60} Q ${cx + 36} ${cy + 50} ${cx + 28} ${cy - 38} Z`}
        fill={COLORS.vestShadow} opacity="0.4"
      />
      {/* Vest highlight — left center */}
      <path
        d={`M ${cx - 24} ${cy - 36} L ${cx - 22} ${cy + 40}`}
        fill="none" stroke={COLORS.vestLight} strokeWidth={2} strokeLinecap="round" opacity="0.5"
      />
      {/* Vest highlight — right center */}
      <path
        d={`M ${cx + 24} ${cy - 36} L ${cx + 22} ${cy + 40}`}
        fill="none" stroke={COLORS.vestLight} strokeWidth={2} strokeLinecap="round" opacity="0.5"
      />
      {/* Bottom hem ribbing lines */}
      {[-2, -1, 0, 1, 2].map((i) => (
        <line
          key={i}
          x1={cx - 48 + (i + 2) * 2} y1={cy + 54}
          x2={cx - 48 + (i + 2) * 2} y2={cy + 62}
          stroke={COLORS.vestRibbing} strokeWidth={1} opacity="0.5"
        />
      ))}
    </g>
  );
}


/* ============================================================
 * REETI LEGS — skirt + socks + platform shoes
 * ============================================================ */
export function ReetiLegs({
  pose = "standing",
  cx = 200,
  topY = 360,
}: {
  pose?: "standing" | "sitting-chair" | "sitting-cross";
  cx?: number;
  topY?: number;
}) {
  if (pose === "sitting-chair") {
    const legY = topY;
    return (
      <g>
        {/* Skirt (visible part) */}
        <path
          d={`M ${cx - 50} ${legY} Q ${cx} ${legY + 10} ${cx + 50} ${legY} L ${cx + 52} ${legY + 32} Q ${cx} ${legY + 44} ${cx - 52} ${legY + 32} Z`}
          fill={COLORS.skirt} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
        {/* Skirt pleats */}
        {[-30, -15, 0, 15, 30].map((offset) => (
          <line
            key={offset}
            x1={cx + offset} y1={legY + 2}
            x2={cx + offset * 1.1} y2={legY + 36}
            stroke={COLORS.skirtPleat} strokeWidth={1.2} opacity="0.5"
          />
        ))}
        {/* Left thigh */}
        <path
          d={`M ${cx - 42} ${legY + 28} Q ${cx - 44} ${legY + 80} ${cx - 30} ${legY + 100} L ${cx - 14} ${legY + 100} Q ${cx - 20} ${legY + 80} ${cx - 18} ${legY + 28} Z`}
          fill={COLORS.skin} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
        {/* Right thigh */}
        <path
          d={`M ${cx + 18} ${legY + 28} Q ${cx + 20} ${legY + 80} ${cx + 14} ${legY + 100} L ${cx + 30} ${legY + 100} Q ${cx + 44} ${legY + 80} ${cx + 42} ${legY + 28} Z`}
          fill={COLORS.skin} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
      </g>
    );
  }

  if (pose === "sitting-cross") {
    return (
      <g>
        {/* Crossed legs area */}
        <path
          d={`M ${cx - 60} ${topY} Q ${cx - 50} ${topY + 40} ${cx - 20} ${topY + 50} Q ${cx} ${topY + 55} ${cx + 20} ${topY + 50} Q ${cx + 50} ${topY + 40} ${cx + 60} ${topY} Q ${cx} ${topY - 10} ${cx - 60} ${topY} Z`}
          fill={COLORS.skirt} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
        {/* Visible legs */}
        <ellipse cx={cx - 38} cy={topY + 30} rx={22} ry={12} fill={COLORS.socks} stroke={COLORS.line} strokeWidth={LW} />
        <ellipse cx={cx + 38} cy={topY + 30} rx={22} ry={12} fill={COLORS.socks} stroke={COLORS.line} strokeWidth={LW} />
        {/* Shoes */}
        <path
          d={`M ${cx - 56} ${topY + 32} Q ${cx - 62} ${topY + 46} ${cx - 44} ${topY + 52} L ${cx - 20} ${topY + 50} Q ${cx - 18} ${topY + 36} ${cx - 28} ${topY + 28} Z`}
          fill={COLORS.shoes} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
        <path
          d={`M ${cx + 56} ${topY + 32} Q ${cx + 62} ${topY + 46} ${cx + 44} ${topY + 52} L ${cx + 20} ${topY + 50} Q ${cx + 18} ${topY + 36} ${cx + 28} ${topY + 28} Z`}
          fill={COLORS.shoes} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
        />
      </g>
    );
  }

  // Standing pose — the full lower body
  const skirtBottom = topY + 80;
  const kneeY = skirtBottom + 60;
  const calfBottom = kneeY + 80;
  const sockTop = calfBottom - 30;
  const footY = calfBottom + 10;

  return (
    <g>
      {/* ── Skirt ── */}
      <path
        d={`
          M ${cx - 50} ${topY}
          Q ${cx - 54} ${topY + 40} ${cx - 62} ${skirtBottom}
          Q ${cx} ${skirtBottom + 18} ${cx + 62} ${skirtBottom}
          Q ${cx + 54} ${topY + 40} ${cx + 50} ${topY}
          Z
        `}
        fill={COLORS.skirt}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Skirt highlight */}
      <path
        d={`M ${cx - 20} ${topY + 4} Q ${cx - 22} ${topY + 44} ${cx - 28} ${skirtBottom - 4}`}
        fill="none" stroke={COLORS.skirtHighlight} strokeWidth={2} strokeLinecap="round" opacity="0.5"
      />
      {/* Skirt pleat lines */}
      {[-40, -26, -12, 2, 16, 30, 44].map((offset, i) => (
        <path
          key={i}
          d={`M ${cx + offset} ${topY + 6} Q ${cx + offset * 1.2} ${topY + 44} ${cx + offset * 1.35} ${skirtBottom - 4}`}
          fill="none" stroke={COLORS.skirtPleat} strokeWidth={1.1} strokeLinecap="round" opacity="0.45"
        />
      ))}
      {/* Skirt shadow at top */}
      <path
        d={`M ${cx - 50} ${topY} Q ${cx} ${topY + 16} ${cx + 50} ${topY} Q ${cx} ${topY + 6} ${cx - 50} ${topY}`}
        fill={COLORS.skirtShadow} opacity="0.35"
      />

      {/* ── Left leg ── */}
      {/* Thigh */}
      <path
        d={`
          M ${cx - 36} ${skirtBottom - 4}
          Q ${cx - 40} ${skirtBottom + 30} ${cx - 32} ${kneeY}
          L ${cx - 16} ${kneeY}
          Q ${cx - 18} ${skirtBottom + 28} ${cx - 16} ${skirtBottom - 4}
          Z
        `}
        fill={COLORS.skin}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Thigh shadow */}
      <path
        d={`M ${cx - 36} ${skirtBottom - 4} Q ${cx - 40} ${skirtBottom + 28} ${cx - 34} ${kneeY}`}
        fill="none" stroke={COLORS.skinShadow} strokeWidth={3} strokeLinecap="round" opacity="0.4"
      />
      {/* Knee highlight */}
      <ellipse cx={cx - 24} cy={kneeY} rx={8} ry={6} fill={COLORS.blush} opacity="0.25" />
      {/* Calf */}
      <path
        d={`
          M ${cx - 32} ${kneeY}
          Q ${cx - 36} ${kneeY + 40} ${cx - 30} ${sockTop}
          L ${cx - 14} ${sockTop}
          Q ${cx - 16} ${kneeY + 38} ${cx - 16} ${kneeY}
          Z
        `}
        fill={COLORS.skin}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />

      {/* ── Right leg ── */}
      {/* Thigh */}
      <path
        d={`
          M ${cx + 16} ${skirtBottom - 4}
          Q ${cx + 18} ${skirtBottom + 28} ${cx + 16} ${kneeY}
          L ${cx + 32} ${kneeY}
          Q ${cx + 40} ${skirtBottom + 30} ${cx + 36} ${skirtBottom - 4}
          Z
        `}
        fill={COLORS.skin}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Thigh shadow */}
      <path
        d={`M ${cx + 36} ${skirtBottom - 4} Q ${cx + 40} ${skirtBottom + 28} ${cx + 34} ${kneeY}`}
        fill="none" stroke={COLORS.skinShadow} strokeWidth={3} strokeLinecap="round" opacity="0.4"
      />
      {/* Knee highlight */}
      <ellipse cx={cx + 24} cy={kneeY} rx={8} ry={6} fill={COLORS.blush} opacity="0.25" />
      {/* Calf */}
      <path
        d={`
          M ${cx + 16} ${kneeY}
          Q ${cx + 16} ${kneeY + 38} ${cx + 14} ${sockTop}
          L ${cx + 30} ${sockTop}
          Q ${cx + 36} ${kneeY + 40} ${cx + 32} ${kneeY}
          Z
        `}
        fill={COLORS.skin}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />

      {/* ── Socks — pale lavender ── */}
      {/* Left sock */}
      <path
        d={`
          M ${cx - 32} ${sockTop}
          L ${cx - 34} ${calfBottom}
          L ${cx - 12} ${calfBottom}
          L ${cx - 14} ${sockTop}
          Z
        `}
        fill={COLORS.socks}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Sock cuff fold */}
      <path
        d={`M ${cx - 34} ${sockTop + 8} Q ${cx - 23} ${sockTop + 12} ${cx - 12} ${sockTop + 8}`}
        fill="none" stroke={COLORS.socksShadow} strokeWidth={LWF + 0.2} strokeLinecap="round" opacity="0.6"
      />
      {/* Sock shadow */}
      <path
        d={`M ${cx - 32} ${sockTop} L ${cx - 34} ${calfBottom} Q ${cx - 28} ${calfBottom - 4} ${cx - 26} ${sockTop} Z`}
        fill={COLORS.socksShadow} opacity="0.3"
      />

      {/* Right sock */}
      <path
        d={`
          M ${cx + 14} ${sockTop}
          L ${cx + 12} ${calfBottom}
          L ${cx + 34} ${calfBottom}
          L ${cx + 32} ${sockTop}
          Z
        `}
        fill={COLORS.socks}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Sock cuff fold */}
      <path
        d={`M ${cx + 12} ${sockTop + 8} Q ${cx + 23} ${sockTop + 12} ${cx + 34} ${sockTop + 8}`}
        fill="none" stroke={COLORS.socksShadow} strokeWidth={LWF + 0.2} strokeLinecap="round" opacity="0.6"
      />
      {/* Sock shadow */}
      <path
        d={`M ${cx + 32} ${sockTop} L ${cx + 34} ${calfBottom} Q ${cx + 28} ${calfBottom - 4} ${cx + 26} ${sockTop} Z`}
        fill={COLORS.socksShadow} opacity="0.3"
      />

      {/* ── Shoes — platform shoes ── */}
      {/* Left shoe upper */}
      <path
        d={`
          M ${cx - 34} ${calfBottom}
          L ${cx - 36} ${footY}
          Q ${cx - 44} ${footY + 10} ${cx - 46} ${footY + 18}
          L ${cx - 6}  ${footY + 18}
          L ${cx - 10} ${footY}
          L ${cx - 12} ${calfBottom}
          Z
        `}
        fill={COLORS.shoes}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Left sole platform */}
      <path
        d={`
          M ${cx - 46} ${footY + 18}
          Q ${cx - 48} ${footY + 28} ${cx - 44} ${footY + 32}
          L ${cx - 4}  ${footY + 32}
          Q ${cx + 0}  ${footY + 28} ${cx - 6} ${footY + 18}
          Z
        `}
        fill={COLORS.shoesSole}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Shoe highlight */}
      <path
        d={`M ${cx - 30} ${calfBottom + 2} Q ${cx - 26} ${footY + 8} ${cx - 18} ${footY + 4}`}
        fill="none" stroke={COLORS.shoesHighlight} strokeWidth={2.2} strokeLinecap="round" opacity="0.55"
      />

      {/* Right shoe upper */}
      <path
        d={`
          M ${cx + 12} ${calfBottom}
          L ${cx + 10} ${footY}
          L ${cx + 6}  ${footY + 18}
          L ${cx + 46} ${footY + 18}
          Q ${cx + 44} ${footY + 10} ${cx + 36} ${footY}
          L ${cx + 34} ${calfBottom}
          Z
        `}
        fill={COLORS.shoes}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Right sole platform */}
      <path
        d={`
          M ${cx + 6} ${footY + 18}
          Q ${cx + 0}  ${footY + 28} ${cx + 4}  ${footY + 32}
          L ${cx + 44} ${footY + 32}
          Q ${cx + 48} ${footY + 28} ${cx + 46} ${footY + 18}
          Z
        `}
        fill={COLORS.shoesSole}
        stroke={COLORS.line}
        strokeWidth={LW}
        strokeLinejoin="round"
      />
      {/* Shoe highlight */}
      <path
        d={`M ${cx + 30} ${calfBottom + 2} Q ${cx + 26} ${footY + 8} ${cx + 18} ${footY + 4}`}
        fill="none" stroke={COLORS.shoesHighlight} strokeWidth={2.2} strokeLinecap="round" opacity="0.55"
      />
    </g>
  );
}


/* ============================================================
 * FOX COMPANION (unchanged structure, upgraded colors)
 * ============================================================ */
export function FoxCompanion({
  state = "watching",
  cx = 200,
  cy = 420,
}: {
  state?: "napping" | "wagging" | "watching" | "pawing" | "sleeping";
  cx?: number;
  cy?: number;
}) {
  if (state === "napping" || state === "sleeping") {
    return (
      <g>
        {/* Body curled */}
        <ellipse
          cx={cx} cy={cy} rx={46} ry={24}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW}
        />
        {/* Belly */}
        <ellipse cx={cx - 6} cy={cy + 4} rx={28} ry={14} fill={COLORS.foxBelly} />
        {/* Tail curled */}
        <motion.path
          d={`M ${cx + 36} ${cy - 6} Q ${cx + 58} ${cy - 16} ${cx + 54} ${cy + 8}`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx + 36}px ${cy}px` }}
        />
        <ellipse cx={cx + 56} cy={cy + 4} rx={8} ry={6} fill={COLORS.foxBelly} />
        {/* Head resting */}
        <ellipse cx={cx - 30} cy={cy - 4} rx={20} ry={16}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
        <path d={`M ${cx - 40} ${cy - 18} L ${cx - 36} ${cy - 6} L ${cx - 28} ${cy - 14} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
        <path d={`M ${cx - 26} ${cy - 18} L ${cx - 20} ${cy - 6} L ${cx - 14} ${cy - 14} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
        {/* Sleepy eyes */}
        <path d={`M ${cx - 36} ${cy - 2} q 4 -2 8 0`} fill="none" stroke={COLORS.line} strokeWidth={1.6} strokeLinecap="round" />
        <path d={`M ${cx - 26} ${cy - 2} q 4 -2 8 0`} fill="none" stroke={COLORS.line} strokeWidth={1.6} strokeLinecap="round" />
        <ellipse cx={cx - 48} cy={cy + 2} rx={2.5} ry={2} fill={COLORS.foxNose} />
        {/* Breathing motion */}
        <motion.ellipse
          cx={cx} cy={cy} rx={48} ry={26}
          fill="transparent"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </g>
    );
  }

  if (state === "wagging" || state === "watching") {
    return (
      <g>
        {/* Tail */}
        <motion.path
          d={`M ${cx + 22} ${cy - 10} Q ${cx + 60} ${cy - 30} ${cx + 58} ${cy + 10}`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
          animate={state === "wagging" ? { rotate: [-25, 25, -25] } : { rotate: [-5, 5, -5] }}
          transition={{ duration: state === "wagging" ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx + 22}px ${cy - 10}px` }}
        />
        <motion.ellipse
          cx={cx + 58} cy={cy - 18} rx={9} ry={7}
          fill={COLORS.foxBelly}
          animate={state === "wagging" ? { rotate: [-25, 25, -25] } : { rotate: [-5, 5, -5] }}
          transition={{ duration: state === "wagging" ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx + 22}px ${cy - 10}px` }}
        />
        {/* Body */}
        <ellipse cx={cx} cy={cy + 10} rx={28} ry={32}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
        <ellipse cx={cx - 2} cy={cy + 18} rx={16} ry={20} fill={COLORS.foxBelly} />
        {/* Paws */}
        <path d={`M ${cx - 12} ${cy + 30} L ${cx - 14} ${cy + 42} L ${cx - 4} ${cy + 42} L ${cx - 4} ${cy + 30} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
        <path d={`M ${cx + 4} ${cy + 30} L ${cx + 4} ${cy + 42} L ${cx + 14} ${cy + 42} L ${cx + 12} ${cy + 30} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
        {/* Head */}
        <ellipse cx={cx} cy={cy - 22} rx={22} ry={20}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
        <path d={`M ${cx - 8} ${cy - 18} Q ${cx} ${cy - 8} ${cx + 8} ${cy - 18} Z`}
          fill={COLORS.foxBelly} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
        {/* Ears */}
        <motion.path
          d={`M ${cx - 18} ${cy - 38} L ${cx - 12} ${cy - 20} L ${cx - 4} ${cy - 32} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
          animate={{ rotate: [0, -10, 0, 0, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1], ease: "easeOut" }}
          style={{ transformOrigin: `${cx - 10}px ${cy - 22}px` }}
        />
        <motion.path
          d={`M ${cx + 18} ${cy - 38} L ${cx + 12} ${cy - 20} L ${cx + 4} ${cy - 32} Z`}
          fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round"
          animate={{ rotate: [0, 10, 0, 0, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1], ease: "easeOut", delay: 0.2 }}
          style={{ transformOrigin: `${cx + 10}px ${cy - 22}px` }}
        />
        <path d={`M ${cx - 14} ${cy - 32} L ${cx - 10} ${cy - 24} L ${cx - 8} ${cy - 30} Z`} fill={COLORS.foxMark} />
        <path d={`M ${cx + 14} ${cy - 32} L ${cx + 10} ${cy - 24} L ${cx + 8} ${cy - 30} Z`} fill={COLORS.foxMark} />
        {/* Eyes */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.9, 0.94, 1], ease: "easeInOut" }}
          style={{ transformOrigin: `${cx}px ${cy - 22}px`, transformBox: "fill-box" }}
        >
          <ellipse cx={cx - 8} cy={cy - 24} rx={2.2} ry={3} fill={COLORS.line} />
          <ellipse cx={cx + 8} cy={cy - 24} rx={2.2} ry={3} fill={COLORS.line} />
          <circle cx={cx - 7.5} cy={cy - 25.5} r={0.8} fill="#FFFFFF" />
          <circle cx={cx + 8.5} cy={cy - 25.5} r={0.8} fill="#FFFFFF" />
        </motion.g>
        <ellipse cx={cx} cy={cy - 16} rx={2.5} ry={2} fill={COLORS.foxNose} />
      </g>
    );
  }

  // Pawing state
  return (
    <g>
      <motion.path
        d={`M ${cx + 22} ${cy + 4} Q ${cx + 56} ${cy - 4} ${cx + 50} ${cy + 30}`}
        fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW}
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx + 22}px ${cy + 4}px` }}
      />
      <ellipse cx={cx + 52} cy={cy + 4} rx={9} ry={7} fill={COLORS.foxBelly} />
      <ellipse cx={cx} cy={cy + 16} rx={22} ry={32}
        fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
      <ellipse cx={cx - 2} cy={cy + 24} rx={12} ry={22} fill={COLORS.foxBelly} />
      <motion.g
        animate={{ y: [0, -3, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <path d={`M ${cx - 14} ${cy - 8} Q ${cx - 22} ${cy - 30} ${cx - 16} ${cy - 40}`}
          fill="none" stroke={COLORS.foxBody} strokeWidth={9} strokeLinecap="round" />
        <path d={`M ${cx - 14} ${cy - 8} Q ${cx - 22} ${cy - 30} ${cx - 16} ${cy - 40}`}
          fill="none" stroke={COLORS.line} strokeWidth={LW} strokeLinecap="round" />
        <path d={`M ${cx + 14} ${cy - 8} Q ${cx + 22} ${cy - 30} ${cx + 16} ${cy - 40}`}
          fill="none" stroke={COLORS.foxBody} strokeWidth={9} strokeLinecap="round" />
        <path d={`M ${cx + 14} ${cy - 8} Q ${cx + 22} ${cy - 30} ${cx + 16} ${cy - 40}`}
          fill="none" stroke={COLORS.line} strokeWidth={LW} strokeLinecap="round" />
      </motion.g>
      <ellipse cx={cx} cy={cy - 16} rx={20} ry={18}
        fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} />
      <path d={`M ${cx - 6} ${cy - 12} Q ${cx} ${cy - 4} ${cx + 6} ${cy - 12} Z`}
        fill={COLORS.foxBelly} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
      <path d={`M ${cx - 16} ${cy - 30} L ${cx - 10} ${cy - 14} L ${cx - 4} ${cy - 26} Z`}
        fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
      <path d={`M ${cx + 16} ${cy - 30} L ${cx + 10} ${cy - 14} L ${cx + 4} ${cy - 26} Z`}
        fill={COLORS.foxBody} stroke={COLORS.line} strokeWidth={LW} strokeLinejoin="round" />
      <ellipse cx={cx - 6} cy={cy - 18} rx={2} ry={2.5} fill={COLORS.line} />
      <ellipse cx={cx + 6} cy={cy - 18} rx={2} ry={2.5} fill={COLORS.line} />
      <ellipse cx={cx} cy={cy - 12} rx={2.5} ry={2} fill={COLORS.foxNose} />
    </g>
  );
}


/* ============================================================
 * SPARKLE (four-pointed star)
 * ============================================================ */
export function Sparkle({
  x, y,
  size = 12,
  color = "#E8A882",
  delay = 0,
}: {
  x: number; y: number;
  size?: number; color?: string; delay?: number;
}) {
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px` }}
      animate={{ scale: [0.3, 1, 0.3], opacity: [0, 1, 0], rotate: [0, 90] }}
      transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path
        d={`M ${x} ${y - size} L ${x + size * 0.28} ${y - size * 0.28} L ${x + size} ${y} L ${x + size * 0.28} ${y + size * 0.28} L ${x} ${y + size} L ${x - size * 0.28} ${y + size * 0.28} L ${x - size} ${y} L ${x - size * 0.28} ${y - size * 0.28} Z`}
        fill={color}
      />
    </motion.g>
  );
}


/* ============================================================
 * CHARACTER STAGE — mouse-tilt + ambient float wrapper
 * ============================================================ */
export function CharacterStage({
  children,
  duration = 4,
  delay = 0,
  rotate = false,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  rotate?: boolean;
}) {
  return (
    <motion.div
      className="relative w-full max-w-[420px] mx-auto cursor-pointer"
      animate={
        rotate
          ? { scale: [1, 1.012, 1], rotate: [-0.4, 0.4, -0.4] }
          : { scale: [1, 1.012, 1] }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}