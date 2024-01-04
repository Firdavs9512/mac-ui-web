import useTheme from "@/Hooks/use-theme";
import DarkImg from "@/Assets/img/wallpapers/37-1.jpg";
import LightImg from "@/Assets/img/wallpapers/37-2.jpg";

const BackgroundImage = () => {
  const { getTheme } = useTheme();
  return (
    <div
      className="h-full w-full fixed top-0 left-0 bg-cover bg-center z-[-1] will-change-[background-image] bg-no-repeat"
      aria-hidden
      style={{
        backgroundImage: `url(${getTheme() === "dark" ? DarkImg : LightImg})`,
      }}
    />
  );
};

export default BackgroundImage;
