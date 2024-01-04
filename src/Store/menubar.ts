import { atom } from "jotai";
import { topBarMenuConfig } from "@/Data/top-bar-menu";

const menuConfigs = { finder: topBarMenuConfig };

export const menuBarMenusStore = atom(
  // Uncomment when all apps get their own menus
  // (get) => menuConfigs[get(activeAppStore) as keyof typeof menuConfigs],
  menuConfigs.finder
);

export const activeMenuStore = atom<string>("");
