import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./theme";

// Penny's glowing orb with pulsing rings, as on the site's share image.
export const Orb: React.FC<{ readonly size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const breathe = 1 + 0.03 * Math.sin((frame / fps) * Math.PI * 1.2);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      {[0, 1, 2].map((i) => {
        const t = ((frame / fps + i * 0.8) % 2.4) / 2.4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `3px solid ${colors.accent}`,
              scale: interpolate(t, [0, 1], [1, 2.1]),
              opacity: interpolate(t, [0, 0.15, 1], [0, 0.55, 0]),
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: -size * 0.45,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}55 0%, ${colors.accent}10 45%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          scale: breathe,
          background: `radial-gradient(circle at 32% 28%, #E6F8FF 0%, ${colors.accent} 22%, #3F6BFD 55%, ${colors.purple} 80%, #3D0F9E 100%)`,
          boxShadow: `0 0 ${size * 0.4}px ${colors.accent}66`,
        }}
      />
    </div>
  );
};
