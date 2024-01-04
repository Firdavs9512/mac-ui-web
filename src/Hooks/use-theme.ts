import { themeAtom } from "@/Store/theme";
import { useAtom } from "jotai";

export default function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  const getTheme = () => {
    return theme;
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return { getTheme, toggleTheme };
}
