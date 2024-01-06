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
        className='bg-[hsla(var(--app-color-light-hsl),0.4)] shadow-[inset_0_0_0_0.2px_hsla(var(--app-color-grey-100-hsl),0.7),0_0_0_0.2px_hsla(var(--app-color-grey-900-hsl),0.7),hsla(0,0%,0%,0.3)_2px_5px_19px_7px] relative h-full flex items-end p-[0.3rem] rounded-[1.2rem] before:content-[""] before:w-full before:h-full before:backdrop-blur-[10px] before:absolute before:z-[-1] before:border-[inherit] before:left-0 before:top-0'
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
