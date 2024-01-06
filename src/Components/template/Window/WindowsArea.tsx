import { appsConfig } from "@/Config/appsConfig";
import {
  activeAppZIndex,
  activeApps as activeAppsAtom,
  openApps as openAppsAtom,
} from "@/Store/openApps";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";

const WindowsArea = () => {
  const [openApps] = useAtom(openAppsAtom);
  const [activeApps] = useAtom(activeAppsAtom);
  const [activeAppIndex, setActiveAppIndex] = useAtom(activeAppZIndex);

  // Z-index update
  useEffect(() => {
    setActiveAppIndex(activeAppIndex + 2);
  }, [activeApps]);

  return (
    <section>
      <Suspense fallback={<span></span>}>
        {Object.keys(openApps).map(
          (app) =>
            // @ts-ignore
            openApps[app] &&
            // @ts-ignore
            appsConfig[app].shouldOpenWindow && <Window key={app} app={app} />
        )}
      </Suspense>
    </section>
  );
};

export default WindowsArea;
