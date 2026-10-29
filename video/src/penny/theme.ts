import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Brand tokens from penny.pencilglow.com (dark theme).
export const colors = {
  bg: "#0B0B0F",
  raised: "#14141A",
  ink: "#FFFFFF",
  muted: "#B4B4C0",
  line: "#2A2A33",
  accent: "#00BBFE",
  purple: "#7028FC",
};

export const fonts = {
  display: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  body: "Barlow, 'WenQuanYi Zen Hei', 'PingFang SC', 'Noto Sans SC', sans-serif",
};

loadFont({
  family: "Barlow",
  url: staticFile("penny/barlow-400.woff2"),
  weight: "400",
});
loadFont({
  family: "Barlow Condensed",
  url: staticFile("penny/barlow-condensed-700.woff2"),
  weight: "700",
});
