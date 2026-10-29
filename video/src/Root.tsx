import { Composition } from "remotion";
import { PennyPromo } from "./penny/PennyPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PennyPromo"
        component={PennyPromo}
        durationInFrames={442}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
