// GalleryItem.jsx
import { useRef } from "react";
import PropTypes from "prop-types";

const GalleryItem = ({ video, aspect }) => {
  const videoRef = useRef();
  const descriptionRef = useRef();

  // UPDATED: Fixed path construction for preview and thumbnail
  const preview = `../assets/img/cinematography/hover/${video.preview}`;
  const thumbnail = `../assets/img/cinematography/thumbnails/${video.thumbnail}`;

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();

    
    // Reset video to start when mouse leaves
    videoRef.current.currentTime = 0;
  };

  return (
    // NEW: Added container with aspect ratio
    <div
      className="relative w-full"
      style={{ aspectRatio: `${aspect}` }}
    >
      <video
        poster={thumbnail}
        src={preview}
        ref={videoRef}
        autoPlay={false}
        loop
        muted
        alt={video.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full object-cover rounded-3xl cursor-pointer"
      />
      {/* UPDATED: Fixed positioning and visibility of description */}
      <div
        className={`absolute z-50 top-0 left-[${videoRef.current.width}px] opacity-50 bg-white rounded-3xl 
          transition-opacity duration-200 ease-in-out flex flex-col justify-center p-[2vw]`}
        ref={descriptionRef}
      >
        <h3 className="text-[2vw] font-unbounded font-black text-gray-800">
          {video.title}
        </h3>
        <p className="text-[1.5vw] font-unbounded font-extralight text-gray-800">
          {video.type}
        </p>
        <p className="font-shoulders text-[1.25vw] text-red">{video.team}</p>
      </div>
    </div>
  );
};

// UPDATED: More specific PropTypes for GalleryItem
GalleryItem.propTypes = {
  video: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired,
  aspect: PropTypes.number.isRequired,
};

export default GalleryItem;
