import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Slider = ({ video, aspect }) => {
  const before = `../assets/img/color-grading/before/${video.before}`;
  const after = `../assets/img/color-grading/after/${video.after}`;
  const thumbnail = `../assets/img/color-grading/thumbnails/${video.thumbnail}`;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const beforeRef = useRef();
  const afterRef = useRef();

  // UPDATED: Improved mouse/touch handling
  const handleMove = (clientX, rect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  // NEW: Separated mouse and touch handlers for better control
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.clientX, rect);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.touches.length > 0) {
      handleMove(event.touches[0].clientX, rect);
    }
  };

  // NEW: Added separate interaction handlers
  const handleInteractionStart = () => {
    setIsDragging(true);
    beforeRef.current.play();
    afterRef.current.play();
    beforeRef.current.currentTime = afterRef.current.currentTime;
  };
  const handleInteractionEnd = () => {
    setIsDragging(false);
    beforeRef.current.pause();
    afterRef.current.pause();
    beforeRef.current.currentTime = afterRef.current.currentTime;
  };

  // UPDATED: Improved event listener management
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMoveDocument = (event) => {
      if (!isDragging) return;
      // UPDATED: Use data attribute for more reliable element selection
      const rect = document
        // .querySelector(`[data-slider-id="${video.id}"]`)
        .getBoundingClientRect();
      handleMove(event.clientX, rect);
    };

    document.addEventListener("mousemove", handleMouseMoveDocument);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveDocument);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    // NEW: Added data-slider-id and aspect ratio styling
    <div
      className="slider-container w-full relative"
      style={{ aspectRatio: aspect }}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
    >
      {/* UPDATED: Added rounded corners and proper positioning */}
      <video
        loop
        muted
        poster={thumbnail}
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        src={before}
        ref={beforeRef}
      />
      <div
        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <video
          loop
          muted
          poster={thumbnail}
          className="w-full h-full object-cover"
          src={after}
          ref={afterRef}
        />
      </div>

      {/* Slider line remains largely unchanged */}
      {/* <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 1px)` }}
      >
        <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
      </div> */}
    </div>
  );
};

// NEW: Added comprehensive PropTypes for Slider
Slider.propTypes = {
  video: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    before: PropTypes.string.isRequired,
    after: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  aspect: PropTypes.number.isRequired,
};

export default Slider;
