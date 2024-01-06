import { TAppConfig } from "@/Store/openApps";
import { lazy } from "react";

type AppNexusProps = {
  app: TAppConfig;
  isBeingDragged: boolean;
};

const Calculator = lazy(() => import("@/Components/Apps/Calculator"));
// const VSCode = lazy(() => import("./VSCode/VSCode"));
// const Calendar = lazy(() => import("./Calendar/Calendar"));

const PlaceholderApp = lazy(() => import("@/Components/Apps/PlaceholderApp"));

export const AppNexus = ({ app }: AppNexusProps) => {
  switch (app) {
    case "calculator":
      return <Calculator />;
    // case "vscode":
    //   return <VSCode isBeingDragged={isBeingDragged} />;
    // case "calendar":
    //   return <Calendar />;
    default:
      return <PlaceholderApp app={app} />;
  }
};
