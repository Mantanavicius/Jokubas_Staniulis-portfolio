import GalleryItem from "./GalleryItem";
import Slider from "./Slider";
import PropTypes from "prop-types";

const VideoGallery = ({ videos, tab }) => {
  const createDesktopRows = () => {
    const rows = [];
    for (let i = 0; i < videos.length; i += 2) {
      const video1 = videos[i];
      const video2 = videos[i + 1];

      if (video1 && video2) {
        const aspect1 = video1.width / video1.height;
        const aspect2 = video2.width / video2.height;
        const totalAspect = aspect1 + aspect2;
        const width1 = (aspect1 / totalAspect) * 100;
        const width2 = (aspect2 / totalAspect) * 100;

        rows.push(
          <div className="hidden md:flex w-full gap-4 mb-4" key={i}>
            <div style={{ width: `${width1}%` }}>
              {tab === 1 ? (
                <GalleryItem video={video1} aspect={aspect1} />
              ) : (
                <Slider video={video1} aspect={aspect1} />
              )}
            </div>
            <div style={{ width: `${width2}%` }}>
              {tab === 1 ? (
                <GalleryItem video={video2} aspect={aspect2} />
              ) : (
                <Slider video={video2} aspect={aspect2} />
              )}
            </div>
          </div>
        );
      } else {
        rows.push(
          <div className="hidden md:flex w-full mb-4" key={i}>
            <div className="w-full">
              {tab === 1 ? (
                <GalleryItem
                  video={video1}
                  aspect={video1.width / video1.height}
                />
              ) : (
                <Slider
                  video={video1}
                  aspect={video1.width / video1.height}
                  isLast={i === videos.length - 1}
                />
              )}
            </div>
          </div>
        );
      }
    }
    return rows;
  };

  const createMobileLayout = () => {
    return (
      <div className="flex md:hidden flex-col w-full gap-4">
        {videos.map((video, index) => (
          <div key={index} className="w-full">
            {tab === 1 ? (
              <GalleryItem video={video} aspect={video.width / video.height} />
            ) : (
              <Slider
                video={video}
                aspect={video.width / video.height}
                isLast={index === videos.length - 1}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[100vw] px-4 md:px-0">
      {createMobileLayout()}
      {createDesktopRows()}
    </div>
  );
};

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      thumbnail: PropTypes.string,
      preview: PropTypes.string,
      before: PropTypes.string,
      after: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
    })
  ).isRequired,
  tab: PropTypes.number.isRequired,
};

export default VideoGallery;
