import { useTimeout } from "@/Hooks/use-timeout";
import { useState } from "react";
import AppleLogo from "@/Assets/img/svg/apple-logo-svgrepo-com.svg";
import cn from "@/Utils/class-names";

const Loading = () => {
  const [hiddenSplashScreen, setHiddenSplashScreen] = useState(false);

  useTimeout(() => {
    setHiddenSplashScreen(true);
  }, 3000);

  return (
    <>
      <div
        className={cn(
          "h-screen w-screen z-[99999] top-0 bottom-0 left-0 right-0 fixed cursor-none flex justify-center items-center bg-black transition-opacity duration-500",
          hiddenSplashScreen && "hidden"
        )}
        hidden={hiddenSplashScreen}
      >
        <img src={AppleLogo} alt="Apple Logo" className="invert w-20" />
      </div>
    </>
  );
};

export default Loading;
