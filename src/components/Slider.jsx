import { useState, useEffect } from "react";
import proptypes from "prop-types";

const Slider = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Initial slider position
  const [isDragging, setIsDragging] = useState(false); // State to manage dragging

  // Function to calculate and update slider position
  const handleMove = (clientX, rect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width)); // Calculate the x position
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100)); // Convert to percentage
    setSliderPosition(percent); // Update state
  };

  // Function to handle mouse move events
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.clientX, rect);
  };

  // Function to handle touch move events
  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      handleMove(touch.clientX, rect);
    }
  };

  // Event handlers to start and stop dragging
  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  // Adding and removing event listeners for mouse/touch events
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMoveDocument = (event) => {
      if (!isDragging) return;
      const rect = document
        .querySelector(".slider-container")
        .getBoundingClientRect();
      handleMove(event.clientX, rect);
    };

    // Add listeners when component mounts
    document.addEventListener("mousemove", handleMouseMoveDocument);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up listeners when component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveDocument);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="w-full relative slider-container"
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
    >
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        {/* Before video */}
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src={before}
        />

        {/* After video with clipping */}
        <div
          className="absolute top-0 left-0 right-0 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            src={after}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  before: proptypes.string.isRequired,
  after: proptypes.string.isRequired,
};

export default Slider;
