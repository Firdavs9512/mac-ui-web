import React from "react";
import { TAppConfig } from "@/Store/openApps";
import { AppConfig } from "@/Utils/create-app-config";
import { MotionValue } from "framer-motion";
import { useImmerAtom } from "jotai-immer";
import {
  openApps as openAppsAtom,
  activeApps as activeAppsAtom,
} from "@/Store/openApps";
import { useRef, useState } from "react";
import useDockHoverAnimation from "./use-dock-hover-animation";
import { motion } from "framer-motion";

interface DockItemProps extends AppConfig {
  mouseX: MotionValue<number | null>;
  app: TAppConfig;
  isOpen: boolean;
  index: number;
}

const DockItem = ({
  title,
  externalAction,
  mouseX,
  app,
  isOpen,
  shouldOpenWindow,
}: DockItemProps) => {
  const [, setOpenApps] = useImmerAtom(openAppsAtom);
  const [, setActiveApp] = useImmerAtom(activeAppsAtom);
  const [animateObj, setAnimateObj] = useState({
    translateY: ["0%", "0%", "0%"],
  });

  const imgRef = useRef<HTMLImageElement>(null);

  const { width } = useDockHoverAnimation(mouseX, imgRef);

  const openApp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!shouldOpenWindow) return void externalAction?.(e);

    setOpenApps((draft) => {
      draft[app] = true;
      return draft;
    });
    setActiveApp(app);
  };

  return (
    <button
      className="h-full w-auto cursor-app-default transition-all duration-200 origin-bottom flex flex-col justify-end relative"
      aria-label={`launch-${title}`}
      onClick={openApp}
    >
      <p className="whitespace-nowrap absolute top-[-35%] bg-light-hsl/50 backdrop-blur-[5px] py-2 px-3 rounded-md tooltip-shadow hover:block focus-visible:block hidden text-light-contrast font-sans text-[0.9rem] tracking-[0.4px]">
        {title}
      </p>

      <motion.span
        onTap={() =>
          setAnimateObj({
            translateY: ["0%", "-39.2%", "0%"],
          })
        }
        initial={false}
        animate={animateObj}
        transition={{
          type: "spring",
          duration: 0.7,
        }}
        transformTemplate={({ translateY }) => `translateY(${translateY})`}
        className="flex place-items-center"
      >
        <motion.img
          ref={imgRef}
          src={`/assets/app-icons/${title.toLowerCase()}/256.webp`}
          draggable={false}
          style={{ width, willChange: "width" }}
          alt={`${title} app`}
        />
      </motion.span>
      <div
        className="h-[4px] w-[4px] m-0 rounded-[50%] bg-dark opacity-[var(--opacity)]]"
        style={{ "--opacity": +isOpen } as React.CSSProperties}
      />
    </button>
  );
};

export default DockItem;
