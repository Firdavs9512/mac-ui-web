import ActionCenterToggle from "./ActionCenterToggle";
import MenuBar from "./MenuBar";
import TopBarTime from "./TopBarTime";

const TopBar = () => {
  return (
    <header id="top-bar" className="flex w-full h-[1.4rem] items-center bg-light-hsl bg-opacity-30 text-light-contrast fill-light-contrast backdrop-blur-md">
      <MenuBar />
      <span style={{ flex: "1 1 auto" }} />

      <ActionCenterToggle />

      <button className="font-medium text-[0.8rem] font-sans tracking-[0.3px] relative h-full inline-flex items-center justify-center shadow-sm cursor-app-default">
        <TopBarTime />
      </button>
    </header>
  );
};

export default TopBar;
