import { useOutsideClick } from "@/Hooks/use-click-outside";
import { useFocusOutside } from "@/Hooks/use-focus-outside";
import { menuBarMenusStore, activeMenuStore } from "@/Store/menubar";
import { useAtom } from "jotai";
import { useRef } from "react";
import AppleLogo from "@/Assets/img/svg/apple-logo-svgrepo-com.svg";
import cn from "@/Utils/class-names";
import { Menu } from "./Menu";

const MenuBar = () => {
  const [currentAppMenus] = useAtom<any>(menuBarMenusStore);
  const [activeMenu, setActiveMenu] = useAtom(activeMenuStore);

  const parentRef = useRef<HTMLDivElement>(null);

  /** Close when document focus isn't in any menubar */
  useFocusOutside(parentRef, () => setActiveMenu(""));

  /** Close when clicked outside */
  useOutsideClick(parentRef, () => setActiveMenu(""));

  return (
    <div className="h-full flex relative text-[0.8rem]" ref={parentRef}>
      {Object.keys(currentAppMenus).map((menuID) => (
        <div key={menuID}>
          <div className="h-full flex items-center">
            <button
              onClick={() => setActiveMenu(menuID)}
              onMouseOver={() => activeMenu && setActiveMenu(menuID)}
              onFocus={() => setActiveMenu(menuID)}
              style={
                {
                  "--scale": activeMenu === menuID ? 1 : 0,
                } as React.CSSProperties
              }
              className={cn(
                "top-menuButton",
                menuID === "default" && "!font-semibold my-0 mx-[6px]",
                menuID === "apple" && "ml-2 p-0 px-[0.7rem]"
              )}
            >
              {menuID === "apple" ? (
                <img src={AppleLogo} alt="Apple" className="w-[15px] invert" />
              ) : (
                // @ts-ignore
                currentAppMenus[menuID].title
              )}
            </button>
          </div>
          <div
            className="z-10 absolute mb-[1.5px]"
            style={{
              visibility: activeMenu !== menuID ? "hidden" : "visible",
            }}
          >
            <Menu menu={currentAppMenus[menuID].menu} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
