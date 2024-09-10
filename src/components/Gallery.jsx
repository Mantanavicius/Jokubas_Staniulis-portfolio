// Gallery.jsx

import { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";
import videoData from "../videoDescriptions.json";
import "./Gallery.css";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    selectedVideo ? setIsOverlayVisible(true) : setIsOverlayVisible(false);
  }, [selectedVideo]);

  const handleMouseEnter = (video) => setSelectedVideo(video);

  const handleMouseLeave = () => setSelectedVideo(null);

  return (
    <div className="gallery">
      <div className="gallery-wrapper relative px-4 py-6 columns-1 md:columns-2 gap-4 space-y-4">
        {videoData.map((video, index) => (
          <GalleryItem
            key={index}
            video={video}
            onHover={handleMouseEnter}
            onLeave={handleMouseLeave}
          />
        ))}

        <div
          className={`description-overlay absolute top-0 left-0 bg-white w-full h-full flex flex-col justify-center p-8 transition-all duration-300 ease-in-out ${
            isOverlayVisible ? "opacity-95 visible" : "opacity-0 invisible"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Gallery;
