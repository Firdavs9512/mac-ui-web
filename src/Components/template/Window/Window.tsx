import { appsConfig } from "@/Config/appsConfig";
import useMaximizeWindow from "@/Hooks/use-maximize-window";
import {
  TAppConfig,
  activeAppZIndex,
  activeApps,
  appCloseAnimation,
} from "@/Store/openApps";
import { useAtom } from "jotai";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import cn from "@/Utils/class-names";
import TrafficLights from "./TrafficLights";
import { AppNexus } from "./AppNexus";
import _ from "lodash";
import { motion } from "framer-motion";

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
  const [animationClose, setAnimationClose] = useAtom(appCloseAnimation);

  const [appZIndex, setAppZIndex] = useState(0);
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  const randX = useMemo(() => _.random(-600, 900), []);
  const randY = useMemo(() => _.random(-100, 100), []);

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
      style={{ zIndex: appZIndex, width: width, height: height }}
      default={{
        height,
        width,
        x: (document.body.clientWidth / 2 + randX) / 2,
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
      <motion.section
        className={cn(
          "w-full h-full grid grid-rows-[1fr] relative shadow-[0_33px_81px_rgba(0,0,0,0.31)] cursor-app-default rounded-xl dark:shadow-[inset_0_0_0_0.9px_hsla(var(--app-color-dark-hsl),0.3),0_0_0_1px_hsla(var(--app-color-light-hsl),0.5)]",
          "backdrop-blur-lg "
        )}
        initial={{ opacity: 1 }}
        animate={animationClose ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (animationClose) {
            setAnimationClose(false);
          }
        }}
      >
        <div
          style={trafficLightsStyle}
          className={cn(
            "dark:shadow-[inset_0_0_0_0.9px_hsla(var(--app-color-dark-hsl),0.3),0_0_0_1px_hsla(var(--app-color-light-hsl),0.5)] dark:rounded-[inherit] absolute z-[1] left-4 top-4 window-trafficLightsContainer",
            "app-window-drag-handle"
          )}
        >
          <TrafficLights app={app} onMaximizeClick={maximizeApp} />
        </div>
        <Suspense
          fallback={
            <div className="w-full -h-full flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-testid="loader"
                className="text-current w-6 h-auto mx-auto dark:text-white"
              >
                <g>
                  <path d="M11 1h2v5h-2z" opacity="0.14"></path>
                  <path
                    d="m16.634 1.974 1.732 1-2.5 4.33-1.732-1z"
                    opacity="0.29"
                  ></path>
                  <path
                    d="m21.026 5.634 1 1.732-4.33 2.5-1-1.732z"
                    opacity="0.43"
                  ></path>
                  <path d="M23 11v2h-5v-2z" opacity="0.57"></path>
                  <path
                    d="m22.026 16.634-1 1.732-4.33-2.5 1-1.732z"
                    opacity="0.71"
                  ></path>
                  <path
                    d="m18.366 21.026-1.732 1-2.5-4.33 1.732-1z"
                    opacity="0.86"
                  ></path>
                  <path d="M13 23h-2v-5h2z"></path>
                  <animateTransform
                    attributeName="transform"
                    calcMode="discrete"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
                  ></animateTransform>
                </g>
              </svg>
            </div>
          }
        >
          <AppNexus app={app} isBeingDragged={isBeingDragged} />
        </Suspense>
      </motion.section>
    </Rnd>
  );
};

export default Window;
export { WindowRnd };
