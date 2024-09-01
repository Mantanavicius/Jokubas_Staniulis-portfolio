// Gallery.jsx

import { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem"; // Component for individual gallery items
import Lightbox from "./Lightbox"; // Component for the lightbox modal
import videoDescriptions from "../videoDescriptions.json"; // Import video descriptions

const Gallery = () => {
  const [videoData, setVideoData] = useState([]);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState(null); // Track hovered video index


  useEffect(() => {
    const loadVideos = async () => {
      console.log(videoDescriptions)

      // Add thumbnails
      thumbnailPaths.forEach((path) => {
        const baseName = path.split("/").pop().split(".")[0];
        if (!videoDataMap[baseName]) videoDataMap[baseName] = {};
        videoDataMap[baseName].thumbnail = thumbnails[path];
      });

      // Add previews
      previewPaths.forEach((path) => {
        const baseName = path.split("/").pop().split("_")[0];
        if (!videoDataMap[baseName]) videoDataMap[baseName] = {};
        videoDataMap[baseName].preview = previews[path];
      });

      // Convert the data map to an array of objects
      const videoArray = await Promise.all(
        Object.values(videoDataMap).map(async (video, index) => ({
          thumbnail: (await video.thumbnail()).default,
          preview: (await video.preview()).default,
          description: videoDescriptions[index], // Add description
        }))
      );

      setVideoData(videoArray); // Set video data to state
    };

    loadVideos(); // Load videos on component mount
  }, []);

  const openLightbox = (videoSrc) => {
    setLightboxVideo(videoSrc);
  };

  const closeLightbox = () => {
    setLightboxVideo(null);
  };

  return (
    <div className="gallery-wrapper grid grid-cols-2 gap-4 h-screen">
      {videoData.map((video, index) => (
        <GalleryItem
          key={index}
          video={video}
          isHovered={index === hoveredVideoIndex} // Pass hover state to item
          onClick={() => openLightbox(video.preview)} // Open lightbox with preview video
          onMouseEnter={() => setHoveredVideoIndex(index)} // Set hovered video index on hover
          onMouseLeave={() => setHoveredVideoIndex(null)} // Clear hovered video index on mouse leave
        />
      ))}

      {lightboxVideo && (
        <Lightbox videoSrc={lightboxVideo} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Gallery;
