import { useRef } from "react";
import PropTypes from "prop-types";

const GalleryItem = ({ video, aspect }) => {
  const videoRef = useRef();
  const descriptionRef = useRef();
  const preview = `../assets/img/cinematography/hover/${video.preview}`;
  const thumbnail = `../assets/img/cinematography/thumbnails/${video.thumbnail}`;

  const handleMouseEnter = (e) => {
    videoRef.current.play();
    const rect = e.target.getBoundingClientRect();

    // Show description panel
    if (descriptionRef.current) {
      // Position the description panel based on container position
      if (rect.left < 100 && window.innerWidth - rect.width < 100) {
        descriptionRef.current.style.left = "0";
        descriptionRef.current.style.right = "0";
        descriptionRef.current.style.width = `${rect.width}px`;
        descriptionRef.current.style.height = `${rect.height * 0.9}px`;
        descriptionRef.current.style.transform = `translateY(-${
          rect.height * 0.9
        }px`;
      } else if (rect.left > 100) {
        // right
        descriptionRef.current.style.right = `${rect.width}px`;
        descriptionRef.current.style.width = `${
          window.innerWidth - (rect.width + window.innerWidth - rect.right)
        }px`;
      } else {
        // left
        descriptionRef.current.style.left = `${rect.width}px`;
        descriptionRef.current.style.width = `${
          window.innerWidth - (rect.left + rect.width)
        }px`;
      }

      descriptionRef.current.style.display = "flex";
    }
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    descriptionRef.current.style.display = "none";

    // Reset video to start when mouse leaves
    videoRef.current.currentTime = 0;
  };

  return (
    // NEW: Added container with aspect ratio
    <div className="relative w-full" style={{ aspectRatio: `${aspect}` }}>
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
        className={`absolute w-[] z-50 top-0 bottom-0 opacity-85 bg-white rounded-3xl 
          transition-opacity duration-200 ease-in-out flex-col justify-center p-[2vw] hidden`}
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
