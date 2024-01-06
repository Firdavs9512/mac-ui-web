import { appsConfig } from "@/Config/appsConfig";
import { atom } from "jotai";

export type TAppConfig = keyof typeof appsConfig;

// Default open apps
export const openApps = atom<Record<TAppConfig, boolean>>({
  calculator: false,
});

// Active app
export const activeApps = atom<TAppConfig>("calculator");

// Default z index
export const activeAppZIndex = atom<number>(-2);
