import { useState } from "react";

const GalleryItem = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="gallery-item relative w-full h-[50vh] overflow-hidden cursor-pointer"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <video
          src={"src/assets/img/cinematography/hover/" + video.preview}
          className=""
          autoPlay
          loop
          muted
        />
      ) : (
        <img
          src={"src/assets/img/cinematography/thumbnails/" + video.thumbnail}
          alt="thumbnail"
          className=""
        />
      )}

      <video
        src={video.preview}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default GalleryItem;
