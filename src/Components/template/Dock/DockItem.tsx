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
import { useAtom } from "jotai";

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
  const [, setActiveApp] = useAtom(activeAppsAtom);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 350);
  };

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
      className="h-full !w-auto cursor-app-default transition-all duration-200 origin-bottom flex flex-col justify-end relative group items-center dock-el-animation-top"
      aria-label={`launch-${title}`}
      onClick={openApp}
    >
      <p className="whitespace-nowrap absolute top-[-35%] left-0 right-0 bg-light-hsl/50 backdrop-blur-[5px] py-2 px-3 rounded-md tooltip-shadow group-hover:block group-focus-visible:block hover:block focus-visible:block hidden text-light-contrast font-sans text-[0.9rem] tracking-[0.4px]">
        {title}
      </p>
      <motion.span
        onTap={handleClick}
        initial={false}
        animate={
          isClicked
            ? { translateY: "-39%" } // Change to "-39%" on click
            : { translateY: "0%" } // Revert to "0%" on second click
        }
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
