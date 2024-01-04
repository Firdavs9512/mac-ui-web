import { themeConfig } from "@/Config/theme.config";
import { atom } from "jotai";

export type Theme = "light" | "dark";

export const themeAtom = atom<Theme>(themeConfig.defaultTheme as Theme);
