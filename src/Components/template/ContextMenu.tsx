import { contextMenuConfig } from "@/Config/context.menu.config";
import { useContextMenu } from "@/Hooks/use-context-menu";
import { useFocusOutside } from "@/Hooks/use-focus-outside";
import { RefObject, useEffect, useRef } from "react";
import {
  RovingTabIndexProvider,
  useFocusEffect,
  useRovingTabIndex,
} from "react-roving-tabindex";

type Props = {
  outerRef: RefObject<HTMLDivElement>;
};

const ContextMenu = ({ outerRef }: Props) => {
  const { xPos, yPos, isMenuVisible, setIsMenuVisible } =
    useContextMenu(outerRef);

  const containerRef = useRef<HTMLDivElement>(null);

  const defMenu = contextMenuConfig.default;

  useFocusOutside(containerRef, () => isMenuVisible && setIsMenuVisible(false));

  useEffect(() => {
    isMenuVisible && containerRef.current?.focus();
  }, [isMenuVisible]);

  return isMenuVisible ? (
    <div
      tabIndex={-1}
      style={{ top: yPos, left: xPos }}
      ref={containerRef}
      className="block z-[9999] min-w-64 select-none bg-light-hsl rounded-lg backdrop-blur-lg absolute"
    >
      <RovingTabIndexProvider
        options={{ direction: "vertical", loopAround: true }}
      >
        {Object.keys(defMenu).map((key) => (
          <>
            <ContextMenuButton>{defMenu[key].title}</ContextMenuButton>
            {(defMenu[key] as any).breakAfter && (
              <div className="w-full h-[0.2px] bg-light-hsl my-[2px]"></div>
            )}
          </>
        ))}
      </RovingTabIndexProvider>
    </div>
  ) : (
    <></>
  );
};

type ContextMenuButtonProps = {
  children: React.ReactNode;
};

const ContextMenuButton = ({ children }: ContextMenuButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    false
  );

  useFocusEffect(focused, ref);

  return (
    <button
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={tabIndex}
      className="flex justify-start w-full p-1 m-1 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      ref={ref}
    >
      {children}
    </button>
  );
};

export default ContextMenu;
