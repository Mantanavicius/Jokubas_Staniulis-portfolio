
const Lightbox = ({ videoSrc, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Close lightbox on clicking the backdrop
    >
      <div className="relative max-w-4xl w-full">
        <button
          className="absolute top-2 right-2 text-white text-xl z-10"
          onClick={onClose} // Close button
        >
          &times;
        </button>
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-full max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};

export default Lightbox;
