import { SwitchSVG } from "@/Assets/svg/SwitchSVG";
import { useOutsideClick } from "@/Hooks/use-click-outside";
import { useFocusOutside } from "@/Hooks/use-focus-outside";
import cn from "@/Utils/class-names";
import { useRef, useState } from "react";

const ActionCenterToggle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden">("hidden");

  const show = () => setState("visible");
  const hide = () => setState("hidden");

  useOutsideClick(containerRef, hide);
  useFocusOutside(containerRef, hide);

  return (
    <div ref={containerRef}>
      <span>
        <div onClick={show} onFocus={show} className="max-h-full mx-[0.7rem]">
          <SwitchSVG className="w-4 h-4 fill-light-contrast relative" />
        </div>
      </span>
      <div
        className={cn(
          "z-[1] absolute right-4 mt-[4.5px]",
          state === "hidden" && "invisible"
        )}
      >
        {/* <ActionCenter /> */}
      </div>
    </div>
  );
};

export default ActionCenterToggle;
