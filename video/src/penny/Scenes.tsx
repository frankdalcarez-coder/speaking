import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Orb } from "./Orb";
import { colors, fonts } from "./theme";
import { Wordmark } from "./Wordmark";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const headline: React.CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 700,
  fontSize: 150,
  lineHeight: 0.95,
  color: colors.ink,
  textAlign: "center",
};

const body: React.CSSProperties = {
  fontFamily: fonts.body,
  fontSize: 52,
  lineHeight: 1.3,
  color: colors.muted,
  textAlign: "center",
};

// Fades and lifts its children in, starting `delay` seconds into the scene.
const Rise: React.FC<{
  readonly delay: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = delay * fps;
  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [start, start + 0.5 * fps], [0, 1], clamp),
        translate: interpolate(
          frame,
          [start, start + 0.7 * fps],
          ["0px 60px", "0px 0px"],
          { ...clamp, easing: ease },
        ),
      }}
    >
      {children}
    </div>
  );
};

export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(${colors.line} 2px, transparent 2px)`,
        backgroundSize: "36px 36px",
        opacity: 0.6,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, ${colors.accent}22 0%, transparent 55%)`,
      }}
    />
  </AbsoluteFill>
);

const Stack: React.FC<{ readonly children: React.ReactNode; readonly gap?: number }> = ({
  children,
  gap = 56,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap,
      padding: "140px 90px",
    }}
  >
    {children}
  </AbsoluteFill>
);

const PhoneIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Buzz in short bursts, like a ringing phone.
  const buzzing = frame % fps < fps * 0.5;
  return (
    <svg
      viewBox="0 0 24 24"
      width={260}
      height={260}
      style={{ rotate: buzzing ? `${Math.sin(frame * 2.2) * 12}deg` : "0deg" }}
    >
      <path
        fill={colors.accent}
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
      />
    </svg>
  );
};

export const RingScene: React.FC = () => (
  <Stack>
    <Rise delay={0}>
      <PhoneIcon />
    </Rise>
    <Rise delay={0.2}>
      <Interactive.Div name="Ring headline" style={headline}>
        Your phone rings.
      </Interactive.Div>
    </Rise>
    <Rise delay={0.6}>
      <Interactive.Div name="Ring subline" style={body}>
        You can’t put down the scissors,
        <br />
        the drill or the client.
      </Interactive.Div>
    </Rise>
  </Stack>
);

export const PickupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stack gap={110}>
      <div
        style={{
          scale: interpolate(frame, [0, 0.8 * fps], [0.3, 1], {
            ...clamp,
            easing: Easing.spring({ damping: 12 }),
            output: "perceptual-scale",
          }),
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], clamp),
        }}
      >
        <Orb size={380} />
      </div>
      <Rise delay={0.3}>
        <Interactive.Div name="Pickup headline" style={headline}>
          Penny picks up.
        </Interactive.Div>
      </Rise>
      <Rise delay={0.7}>
        <Interactive.Div name="Pickup subline" style={body}>
          24/7, even on public holidays.
        </Interactive.Div>
      </Rise>
    </Stack>
  );
};

const greetings = [
  { word: "Hello", lang: "English" },
  { word: "你好", lang: "Mandarin" },
  { word: "Helo", lang: "Malay" },
  { word: "Halo", lang: "Bahasa Indonesia" },
];

const Greeting: React.FC<{
  readonly word: string;
  readonly lang: string;
  readonly index: number;
}> = ({ word, lang, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = (0.5 + index * 0.35) * fps;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: 860,
        padding: "28px 44px",
        borderRadius: 28,
        backgroundColor: colors.raised,
        border: `2px solid ${colors.line}`,
        opacity: interpolate(frame, [start, start + 0.4 * fps], [0, 1], clamp),
        translate: interpolate(
          frame,
          [start, start + 0.6 * fps],
          ["-80px 0px", "0px 0px"],
          { ...clamp, easing: ease },
        ),
      }}
    >
      <span
        style={{
          fontFamily: fonts.body,
          fontSize: 76,
          color: colors.ink,
        }}
      >
        {word}
      </span>
      <span
        style={{
          fontFamily: fonts.body,
          fontSize: 40,
          color: colors.accent,
        }}
      >
        {lang}
      </span>
    </div>
  );
};

export const LanguagesScene: React.FC = () => (
  <Stack gap={34}>
    <Rise delay={0} style={{ marginBottom: 40 }}>
      <Interactive.Div name="Languages headline" style={headline}>
        She speaks
        <br />
        their language.
      </Interactive.Div>
    </Rise>
    {greetings.map((g, i) => (
      <Greeting key={g.lang} word={g.word} lang={g.lang} index={i} />
    ))}
  </Stack>
);

const summaryRows = [
  { label: "When", value: "Saturday, 9:42pm" },
  { label: "Language", value: "Mandarin, then English" },
  { label: "Wants", value: "A first visit next week, mornings only" },
];

const SummaryCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        width: 900,
        padding: 56,
        borderRadius: 36,
        backgroundColor: colors.raised,
        border: `2px solid ${colors.line}`,
        display: "flex",
        flexDirection: "column",
        gap: 34,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ fontSize: 36, color: colors.accent }}>
        Call summary from Penny
      </div>
      {summaryRows.map((row, i) => {
        const start = (0.6 + i * 0.3) * fps;
        return (
          <div
            key={row.label}
            style={{
              opacity: interpolate(frame, [start, start + 0.4 * fps], [0, 1], clamp),
            }}
          >
            <div style={{ fontSize: 32, color: colors.muted }}>{row.label}</div>
            <div style={{ fontSize: 46, color: colors.ink }}>{row.value}</div>
          </div>
        );
      })}
      <div
        style={{
          padding: "26px 32px",
          borderRadius: 20,
          backgroundColor: colors.accent,
          color: colors.bg,
          fontSize: 42,
          opacity: interpolate(frame, [1.7 * fps, 2.1 * fps], [0, 1], clamp),
          scale: interpolate(frame, [1.7 * fps, 2.2 * fps], [0.9, 1], {
            ...clamp,
            easing: ease,
            output: "perceptual-scale",
          }),
        }}
      >
        <b>Next step:</b> call back Monday morning.
      </div>
    </div>
  );
};

export const SummaryScene: React.FC = () => (
  <Stack gap={70}>
    <Rise delay={0}>
      <Interactive.Div name="Summary headline" style={headline}>
        Every call,
        <br />
        summed up.
      </Interactive.Div>
    </Rise>
    <Rise delay={0.3}>
      <SummaryCard />
    </Rise>
  </Stack>
);

export const CtaScene: React.FC = () => (
  <Stack gap={64}>
    <Rise delay={0}>
      <Orb size={240} />
    </Rise>
    <Rise delay={0.2} style={{ marginTop: 40 }}>
      <Interactive.Div name="CTA headline" style={{ ...headline, fontSize: 190 }}>
        Meet Penny.
      </Interactive.Div>
    </Rise>
    <Rise delay={0.45}>
      <Interactive.Div name="CTA subline" style={body}>
        Your AI receptionist.
        <br />
        Talk to her free. No sign-up.
      </Interactive.Div>
    </Rise>
    <Rise delay={0.75}>
      <Interactive.Div
        name="CTA button"
        style={{
          fontFamily: fonts.body,
          fontSize: 50,
          fontWeight: 700,
          color: colors.bg,
          backgroundColor: colors.accent,
          padding: "30px 60px",
          borderRadius: 20,
        }}
      >
        penny.pencilglow.com →
      </Interactive.Div>
    </Rise>
    <Rise delay={1} style={{ marginTop: 50 }}>
      <Wordmark width={420} />
    </Rise>
  </Stack>
);
