import cn from "@/Utils/class-names";
import { useRef } from "react";
import {
  RovingTabIndexProvider,
  useFocusEffect,
  useRovingTabIndex,
} from "react-roving-tabindex";

type MenuProps = {
  menu: any;
};

export const Menu = ({ menu }: MenuProps) => {
  return (
    <div className="top-menu-container-shadow" tabIndex={-1}>
      <RovingTabIndexProvider
        options={{ direction: "vertical", loopAround: true }}
      >
        {Object.keys(menu).map((key) => (
          <div key={key}>
            <MenuItemButton
              key={key}
              className={cn("top-menu-item", menu[key].disabled && "disabled")}
              disabled={menu[key].disabled}
            >
              {menu[key].title}
            </MenuItemButton>
            {menu[key].breakAfter && (
              <div
                key={`divider-${key}`}
                className="w-full h-[0.2px] bg-dark-hsl/20 my-[2px]"
              />
            )}
          </div>
        ))}
      </RovingTabIndexProvider>
    </div>
  );
};

const MenuItemButton = ({
  children,
  disabled = false,
  ...props
}: JSX.IntrinsicElements["button"]) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );

  useFocusEffect(focused, ref);

  return (
    <button
      tabIndex={tabIndex}
      ref={ref}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
