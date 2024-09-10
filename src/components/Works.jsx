import { useState } from "react";
import Gallery from "./Gallery";
import ColorGrading from "./ColorGrading";

const Works = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="works transition-all duration-200">
      <header className="header w-full h-20 flex items-center justify-center text-[max(16px,1.25vw)]">
        <button
          onClick={() => setOpenTab(1)}
          className={`${
            openTab === 1 ? "font-bold" : ""
          } transition-weight duration-200`}
        >
          cinematography
        </button>
        <span className="mx-2">{"//"}</span>
        <button
          onClick={() => setOpenTab(2)}
          className={`${
            openTab === 2 ? "font-bold" : ""
          } transition-weight duration-200`}
        >
          color grading
        </button>
      </header>

      {openTab === 1 && <Gallery />}
      {openTab === 2 && <ColorGrading />}
    </div>
  );
};

export default Works;
