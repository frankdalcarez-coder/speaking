import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";
import {
  Backdrop,
  CtaScene,
  LanguagesScene,
  PickupScene,
  RingScene,
  SummaryScene,
} from "./Scenes";
import "./theme";

export const PennyPromo: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <TransitionSeries name="Scenes">
      <TransitionSeries.Sequence name="Ring" durationInFrames={80}>
        <RingScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="Pickup" durationInFrames={80}>
        <PickupScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="Languages" durationInFrames={100}>
        <LanguagesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="Summary" durationInFrames={110}>
        <SummaryScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 12 })}
      />
      <TransitionSeries.Sequence name="CTA" durationInFrames={120}>
        <CtaScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
