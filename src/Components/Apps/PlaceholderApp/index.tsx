import { TAppConfig } from "@/Store/openApps";
import cn from "@/Utils/class-names";
import { motion } from "framer-motion";

type PlaceholderAppProps = {
  app: TAppConfig;
};

const PlaceholderApp = ({ app }: PlaceholderAppProps) => {
  return (
    <section className="rounded-[inherit] bg-light">
      <header
        className={cn(
          "app-window-drag-handle",
          "p-4 w-full absolute top-0 left-0"
        )}
      ></header>
      <section className="text-[1.618rem] text-light-contrast w-full h-full flex flex-col justify-center items-center">
        <motion.img
          className="max-w-32 aspect-square"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          draggable={false}
          src={`/assets/app-icons/${app}/256.webp`}
        />
        <h1>Apps coming soon!</h1>
      </section>
    </section>
  );
};

export default PlaceholderApp;
