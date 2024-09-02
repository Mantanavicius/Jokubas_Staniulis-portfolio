// Gallery.jsx

import { useState } from "react";
import GalleryItem from "./GalleryItem"; // Component for individual gallery items
import Lightbox from "./Lightbox"; // Component for the lightbox modal
import videoData from "../videoDescriptions.json"; // Import video descriptions

const Gallery = () => {
  const [lightboxVideo, setLightboxVideo] = useState(null);

  const openLightbox = (videoSrc) => {
    setLightboxVideo(videoSrc);
  };
  const closeLightbox = () => {
    setLightboxVideo(null);
  };

  return (
    <div className="gallery">
      <header className="header w-full h-20 flex items-center justify-center">
        <button>cinematography</button>
        <span className="mx-2">{"//"}</span>
        <button>color grading</button>
      </header>
      <div className="gallery-wrapper flex flex-wrap gap-4 h-screen">
        {videoData.map((video, index) => (
          <GalleryItem
            key={index}
            video={video}
            onClick={() => openLightbox(video.video)}
          />
        ))}

        {lightboxVideo && (
          <Lightbox
            videoSrc={"src/assets/img/cinematography/video/" + lightboxVideo}
            onClose={closeLightbox}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
