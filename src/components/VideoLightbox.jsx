import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const VideoLightbox = ({ videoUrl, videoData, onClose }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const handleClose = useCallback(
    (e) => {
      if (e.target === containerRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-7xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          Close
        </button>

        <div
          className="relative"
          style={{ aspectRatio: videoData.width / videoData.height }}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover rounded-lg"
            controls
            autoPlay
          />
        </div>

        <div className="mt-4 text-white">
          <h2 className="text-2xl font-unbounded font-black">
            {videoData.title}
          </h2>
          <p className="font-unbounded font-extralight mt-1">
            {videoData.type}
          </p>
          <p className="font-shoulders text-red mt-1">{videoData.team}</p>
        </div>
      </div>
    </div>
  );
};

VideoLightbox.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  videoData: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoLightbox;
