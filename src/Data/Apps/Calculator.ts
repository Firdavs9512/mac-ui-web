import { createAppConfig } from "@/Utils/create-app-config";

export const calculatorConfig = createAppConfig({
  title: "Calculator",

  expandable: true,
  resizable: true,

  height: 300 * 1.414,
  width: 300,

  trafficLightsStyle: {
    top: "0.7rem",
    left: "0.7rem",
  },
});
