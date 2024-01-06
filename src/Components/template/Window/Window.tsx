import { appsConfig } from "@/Config/appsConfig";
import useMaximizeWindow from "@/Hooks/use-maximize-window";
import { TAppConfig, activeAppZIndex, activeApps } from "@/Store/openApps";
import { randInt } from "@/Utils/random-int";
import { useAtom } from "jotai";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import cn from "@/Utils/class-names";
import TrafficLights from "./TrafficLights";
import { AppNexus } from "./AppNexus";

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

  const { resizable, height, width, trafficLightsStyle } = appsConfig[app];

  const focusCurrentApp = () => {
    setActiveApp(app);
    console.log(activeApp);
  };

  useEffect(() => {
    if (activeApp === app) setAppZIndex(activeAppIndex);
  }, [activeApp]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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
      <section className="w-full h-full grid grid-rows-[1fr] relative shadow-[0_33px_81px_rgba(0,0,0,0.31)] cursor-app-default rounded-xl dark:shadow-[inset_0_0_0_0.9px_hsla(var(--app-color-dark-hsl),0.3),0_0_0_1px_hsla(var(--app-color-light-hsl),0.5)] dark:rounded-[inherit]">
        <div
          style={trafficLightsStyle}
          className={cn(
            "dark:shadow-[inset_0_0_0_0.9px_hsla(var(--app-color-dark-hsl),0.3),0_0_0_1px_hsla(var(--app-color-light-hsl),0.5)] dark:rounded-[inherit] absolute z-[1] left-4 top-4 window-trafficLightsContainer",
            "app-window-drag-handle"
          )}
        >
          <TrafficLights app={app} onMaximizeClick={maximizeApp} />
        </div>
        <Suspense fallback={<span></span>}>
          <AppNexus app={app} isBeingDragged={isBeingDragged} />
        </Suspense>
      </section>
    </Rnd>
  );
};

export default Window;
export { WindowRnd };
