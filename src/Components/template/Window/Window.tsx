import { appsConfig } from "@/Config/appsConfig";
import useMaximizeWindow from "@/Hooks/use-maximize-window";
import { TAppConfig, activeApps } from "@/Store/openApps";
import { randInt } from "@/Utils/random-int";
import { useAtom } from "jotai";
import { Suspense, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { activeAppZIndex } from "@/Store/openApps";
import cn from "@/Utils/class-names";
import TrafficLights from "./TrafficLights";

type WindowProps = {
  app: TAppConfig;
};

class WindowRnd extends Rnd {
  base?: HTMLDivElement;
}

const Window = ({ app }: WindowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<WindowRnd>(null);

  const [activeAppIndex] = useAtom(activeAppZIndex);
  const [activeApp, setActiveApp] = useAtom(activeApps);

  const [appZIndex, setAppZIndex] = useState(0);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const randX = useMemo(() => randInt(-600, 600), []);
  const randY = useMemo(() => randInt(-100, 100), []);

  const maximizeApp = useMaximizeWindow(windowRef);

  const { resizable, height, width, trafficLightsStyle, expandable } =
    appsConfig[app];

  const focusCurrentApp = () => {
    setActiveApp(app);
    console.log(activeApp);
  };

  return (
    <Rnd
      ref={windowRef}
      style={{ zIndex: appZIndex }}
      default={{
        height,
        width,
        x: ((3 / 2) * document.body.clientWidth + randX) / 2,
        y: (100 + randY) / 2,
      }}
      enableResizing={resizable}
      dragHandleClassName="app-window-drag-handle"
      bounds="parent"
      minWidth="300"
      minHeight="300"
      onDragStart={() => {
        focusCurrentApp();
        setIsBeingDragged(true);
      }}
      onDragStop={() => setIsBeingDragged(false)}
    >
      <section>
        <div style={trafficLightsStyle} className={cn("")}>
          <TrafficLights app={app} onMaximizeClick={maximizeApp} />
        </div>
        <Suspense fallback={<span></span>}>{/* <AppNexus /> */}</Suspense>
      </section>
    </Rnd>
  );
};

export default Window;
export { WindowRnd };
