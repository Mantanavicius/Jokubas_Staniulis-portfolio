import { useRef, useState } from "react";
import PropTypes from "prop-types";
import.meta.glob("../assets/img/cinematography/hover/*");
import.meta.glob("../assets/img/cinematography/thumbnails/*");
import.meta.glob("../assets/img/cinematography/videos/*");

const GalleryItem = ({ video, onHover, onLeave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionOnTheRight, setDescriptionOnTheRight] = useState(false);
  const videoRef = useRef();

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(video);
    videoRef.current.play();

    // Calculate space available on the left and right
    const rect = videoRef.current.getBoundingClientRect();
    const spaceLeft = rect.left; // Space to the left of the element
    const spaceRight = window.innerWidth - rect.right; // Space to the right of the element

    setDescriptionOnTheRight(spaceRight > spaceLeft); // Decide to show description on the side with more space
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
    videoRef.current.pause();
  };

  return (
    <div
      className="break-inside-avoid mb-4 relative rounded-lg cursor-pointer"
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element is always loaded but hidden under the thumbnail */}
      <video
        src={"/assets/img/cinematography/hover/" + video.preview}
        className={`w-full h-auto rounded-3xl cursor-pointer absolute top-0 left-0 transition-opacity duration-300 ${
          isHovered ? "flex z-20" : "hidden z-0"
        }`}
        loop
        muted
        ref={videoRef}
        alt={video.title}
      />
      {/* Thumbnail image on top, initially visible */}
      <img
        src={"/assets/img/cinematography/thumbnails/" + video.thumbnail}
        alt={video.title}
        className={`w-full h-auto rounded-3xl cursor-pointer transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Dynamic Description Box */}
      <div
        className={`description absolute top-0 text-gray-800 p-4 transition-opacity duration-300 ease-in-out w-full h-fit flex flex-col justify-center gap-4 ${
          isHovered ? "opacity-100 z-20" : "opacity-0 z-[-1]"
        }`}
        style={{
          right: descriptionOnTheRight ? `-105%` : "auto",
          left: descriptionOnTheRight ? "auto" : `-95%`,
        }}
      >
        <h3 className="text-xl font-unbounded font-black">{video.title}</h3>
        <p className="text-l font-unbounded font-extralight">{video.type}</p>
        <p className="font-shoulders text-md text-red">{video.team}</p>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  video: PropTypes.object.isRequired,
  onHover: PropTypes.func.isRequired, // Correct PropTypes
  onLeave: PropTypes.func.isRequired, // Correct PropTypes
};

export default GalleryItem;
