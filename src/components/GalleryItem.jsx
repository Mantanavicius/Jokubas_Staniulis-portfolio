const GalleryItem = ({
  video,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}) => {
  return (
    <div
      className="gallery-item relative w-full h-[50vh] overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={video.thumbnail}
        alt="thumbnail"
        className="w-full h-full object-cover"
      />
      {isHovered && video.preview && (
        <video
          src={video.preview}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
      )}
      {isHovered && video.description && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col justify-center p-4 text-black">
          <h2 className="text-xl font-bold">{video.description.title}</h2>
          <p className="text-md">{video.description.type}</p>
          <p className="text-sm">{video.description.team}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
