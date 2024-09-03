// Gallery.jsx

import { useState } from "react";
import GalleryItem from "./GalleryItem"; // Component for individual gallery items
import videoData from "../videoDescriptions.json"; // Import video descriptions
import "./Gallery.css";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Handle hover to show video details in overlay
  const handleMouseEnter = (video) => {
    if (selectedVideo) return;
    setSelectedVideo(video);
  };

  // Hide video details in overlay when mouse leaves
  const handleMouseLeave = () => setSelectedVideo(null);

  return (
    <div className="gallery">
      <header className="header w-full h-20 flex items-center justify-center">
        <button>cinematography</button>
        <span className="mx-2">{"//"}</span>
        <button>color grading</button>
      </header>
      <div className="gallery-wrapper relative px-4 py-6 columns-1 md:columns-2 gap-4 space-y-4">
        {/* Masonry-style layout using Tailwind CSS columns */}
        {videoData.map((video, index) => (
          <GalleryItem
            key={index}
            video={video}
            onHover={handleMouseEnter}
            onLeave={handleMouseLeave}
          />
        ))}

        {/* Overlay for showing the selected video details */}
        {selectedVideo && (
          <div className="description-overlay absolute top-0 left-0 bg-white opacity-90 h-full w-full flex flex-col justify-center p-8">
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
