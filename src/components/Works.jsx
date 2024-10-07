import { useState } from "react";
import cinematography from "../cinematography";
import colorGrading from "../colorGrading";
import VideoGallery from "./videoGallery";
import VideoLightbox from "./VideoLightbox";

const Works = () => {
  const [openTab, setOpenTab] = useState(1);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    videoUrl: null,
    videoData: null,
  });

  const handleVideoClick = (videoData) => {
    setLightbox({
      isOpen: true,
      videoUrl: videoData.video, // Full video URL for cinematography items
      videoData,
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      videoUrl: null,
      videoData: null,
    });
  };

  return (
    <div className="works transition-all duration-200 px-4 pb-4 ease-in-out">
      <header className="menu w-full h-[max(60px,5vw)] flex items-center justify-center text-dark text-[max(16px,1.4vw)]">
        <button
          onClick={() => setOpenTab(1)}
          className={`hover:drop-shadow-2xl ${
            openTab === 1 ? "font-bold" : ""
          } transition-all duration-200`}
        >
          cinematography
        </button>
        <span className="mx-2 text-gray-400">{"//"}</span>
        <button
          onClick={() => setOpenTab(2)}
          className={`hover:drop-shadow-2xl ${
            openTab === 2 ? "font-bold" : ""
          } transition-all duration-200`}
        >
          color grading
        </button>
      </header>

      <VideoGallery
        videos={openTab === 1 ? cinematography : colorGrading}
        tab={openTab}
        onVideoClick={openTab === 1 ? handleVideoClick : undefined}
      />

      {lightbox.isOpen && (
        <VideoLightbox
          videoUrl={lightbox.videoUrl}
          videoData={lightbox.videoData}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default Works;
