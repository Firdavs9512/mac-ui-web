import {
  TAppConfig,
  activeApps,
  appCloseAnimation,
  openApps,
} from "@/Store/openApps";
import cn from "@/Utils/class-names";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";

type TrafficLightProps = {
  app: TAppConfig;
  onMaximizeClick?: () => void;
  className?: string | null;
};

const TrafficLights = ({ app, className }: TrafficLightProps) => {
  const [, setOpenApp] = useImmerAtom(openApps);
  const [activeApp] = useAtom(activeApps);
  const [, setAnimationClose] = useAtom(appCloseAnimation);

  const closeApp = () => {
    setAnimationClose(true);
    setTimeout(() => {
      setOpenApp((draft: any) => {
        draft[app] = false;
        return draft;
      });
      setAnimationClose(false);
    }, 300);
  };

  const hiddenApp = () => {};

  const resizeApp = () => {};

  return (
    <div
      className={cn(
        "traffic-lights-container",
        app !== activeApp && "unFocussed",
        className
      )}
      style={
        {
          "--button-size": "0.8rem",
        } as React.CSSProperties
      }
    >
      <button className="closeLight" onClick={closeApp}>
        <svg
          width={7}
          height={7}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="#000"
            strokeWidth={1.2}
            strokeLinecap="round"
            d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"
          />
        </svg>
      </button>
      <button className="minimizeLight" onClick={hiddenApp}>
        <svg
          width={6}
          height={1}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            d="M.61.703h5.8"
          />
        </svg>
      </button>
      <button className="stretchLight" onClick={resizeApp}>
        <svg
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit={2}
        >
          <path d="M4.871 3.553L9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z" />
          <circle cx={6.438} cy={6.438} r={6.438} fill="none" />
        </svg>
      </button>
    </div>
  );
};

export default TrafficLights;
