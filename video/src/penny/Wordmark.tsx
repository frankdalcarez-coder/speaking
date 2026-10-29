import { WORDMARK_ACCENT, WORDMARK_INK } from "./logoPaths";
import { colors } from "./theme";

export const Wordmark: React.FC<{ readonly width: number }> = ({ width }) => (
  <svg viewBox="38 33 500 74" width={width} height={(width * 74) / 500}>
    <g transform="translate(35 105)">
      <path d={WORDMARK_INK} fill={colors.ink} />
      <path d={WORDMARK_ACCENT} fill={colors.accent} />
    </g>
  </svg>
);
