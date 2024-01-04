import BackgroundImage from "@/Components/template/BackgroundImage";
import ContextMenu from "@/Components/template/ContextMenu";
import Loading from "@/Components/template/Loading";
import TopBar from "@/Components/template/Top/TopBar";
import { useRef } from "react";

export default function MacOs() {
  const outerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <main className="h-full w-full grid grid-rows-[auto,1fr,auto]">
        <ContextMenu outerRef={outerRef} />
        <TopBar />
      </main>
      <Loading />

      <BackgroundImage />
    </>
  );
}
