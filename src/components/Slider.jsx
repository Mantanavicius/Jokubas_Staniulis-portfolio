import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Slider = ({ video, aspect }) => {
  const before = `../assets/img/color-grading/before/${video.before}`;
  const after = `../assets/img/color-grading/after/${video.after}`;
  const thumbnail = `../assets/img/color-grading/thumbnails/${video.thumbnail}`;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef();
  const beforeRef = useRef();
  const afterRef = useRef();
  const descriptionRef = useRef();

  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(position, 100));
    setSliderPosition(clampedPosition);
    console.log(rect);
    console.log(window.innerWidth);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault(); // Prevent text selection while dragging
    handleMove(event.clientX);
  };

  const handleTouchMove = (event) => {
    if (!isDragging || !event.touches[0]) return;
    handleMove(event.touches[0].clientX);
  };

  const handleInteractionStart = () => {
    // Prevent video from pausing on click
    setIsDragging(true);
    beforeRef.current?.play();
    afterRef.current?.play();

    // Show description panel
    if (descriptionRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

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
  const handleInteractionEnd = () => {
    setIsDragging(false);
    beforeRef.current?.pause();
    afterRef.current?.pause();

    // Hide description panel
    if (descriptionRef.current) {
      descriptionRef.current.style.display = "none";
    }

    // Reset videos to start
    if (beforeRef.current) beforeRef.current.currentTime = 0;
    if (afterRef.current) afterRef.current.currentTime = 0;
  };

  useEffect(() => {
    // const handleMouseUp = () => handleInteractionEnd();
    const handleMouseMoveDocument = (event) => {
      if (isDragging) {
        handleMove(event.clientX);
      }
    };

    document.addEventListener("mousemove", handleMouseMoveDocument);
    // document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveDocument);
      // document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ aspectRatio: aspect }}
    >
      <div
        className="w-full h-full"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
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

        {/* <div
          className="absolute top-0 bottom-0 w-0.5 bg-white"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div> */}
      </div>

      {/* Description Panel */}
      <div
        className={`absolute z-50 top-0 bottom-0 opacity-85 bg-white rounded-3xl 
          transition-opacity duration-200 ease-in-out flex-col justify-center p-[3vw] hidden`}
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

Slider.propTypes = {
  video: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    before: PropTypes.string.isRequired,
    after: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired,
  aspect: PropTypes.number.isRequired,
};

export default Slider;
