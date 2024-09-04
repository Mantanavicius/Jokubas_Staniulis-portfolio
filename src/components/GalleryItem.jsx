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
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;

    setDescriptionOnTheRight(spaceRight > spaceLeft);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
    videoRef.current.pause();
  };

  return (
    <div
      className="break-inside-avoid mb-4 relative"
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        src={"/assets/img/cinematography/hover/" + video.preview}
        className={`w-full h-auto rounded-3xl cursor-pointer absolute top-0 left-0 transition-opacity duration-300 ${
          isHovered ? "opacity-100 z-20" : "opacity-0 z-0"
        }`}
        loop
        muted
        ref={videoRef}
        alt={video.title}
      />
      <img
        src={"/assets/img/cinematography/thumbnails/" + video.thumbnail}
        alt={video.title}
        className={`w-full h-auto rounded-3xl cursor-pointer transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`description absolute top-0 text-gray-800 p-[2vw] w-full h-fit flex flex-col justify-center gap-4 transition-all duration-175 ease-in-out`}
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered
            ? "translateX(0)"
            : `translateX(${descriptionOnTheRight ? "100%" : "-100%"})`,
          right: descriptionOnTheRight ? "-100%" : "auto",
          left: descriptionOnTheRight ? "auto" : "-100%",
          zIndex: isHovered ? 20 : 10,
          textAlign: descriptionOnTheRight ? "left" : "right",
        }}
      >
        <h3 className="text-[2vw] font-unbounded font-black">{video.title}</h3>
        <p className="text-[1.5vw] font-unbounded font-extralight">
          {video.type}
        </p>
        <p className="font-shoulders text-[1.25vw] text-red">{video.team}</p>
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  video: PropTypes.object.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default GalleryItem;
