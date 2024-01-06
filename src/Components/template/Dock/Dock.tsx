import { appsConfig } from "@/Config/appsConfig";
import { openApps as openAppsAtom } from "@/Store/openApps";
import { useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { RovingTabIndexProvider } from "react-roving-tabindex";
import DockItem from "./DockItem";

export default function Dock() {
  const [openApps] = useAtom(openAppsAtom);

  const mouseX = useMotionValue<number | null>(null);

  return (
    <section
      id="dock"
      className="fixed mb-[0.3rem] bottom-0 left-0 z-[9990] w-full h-[5.2rem] p-[0.4rem] flex justify-center"
    >
      <div
        // className="bg-light-hsl/40 relative p-[0.3rem] rounded-[1.2rem] h-full flex items-center before:content-[''] before:w-full before:h-full before:border-inherit before:backdrop-blur-[10px] before:absolute before:top-0 before:left-0 before:z-[-1] dock-el-shadow"
        // className="dockEl"
        className="bg-light-hsl/40 dock-el-shadow relative p-[0.3rem] rounded-[1.2rem] h-full flex items-end before:content-[''] before:w-full before:h-full before:border-inherit before:"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        <RovingTabIndexProvider options={{ direction: "horizontal" }}>
          {Object.keys(appsConfig).map((key, i) => (
            <div key={i}>
              {/* 
              // @ts-ignore */}
              {appsConfig[key].dockBreaksBefore && (
                <div
                  className="h-full w-[0.2px] bg-dark-hsl/30 my-0 mx-[2px]"
                  key={`${key}-divider`}
                  aria-hidden
                ></div>
              )}
              <DockItem
                index={i}
                key={key}
                mouseX={mouseX}
                app={key}
                // @ts-ignore
                isOpen={openApps[key]}
                // @ts-ignore
                {...appsConfig[key]}
              />
            </div>
          ))}
        </RovingTabIndexProvider>
      </div>
    </section>
  );
}
