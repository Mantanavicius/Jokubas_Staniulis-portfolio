import { useRef } from "react";
import PropTypes from "prop-types";

const GalleryItem = ({ video }) => {
  // const [isHovered, setIsHovered] = useState(false);

  const videoRef = useRef();
  const descriptionRef = useRef();

  const preview = video.srcSet[0].src;

  // useEffect(() => {

  //   setDescriptionOnTheRight(spaceOnRight > spaceOnLeft);
  //   descriptionRef.current.style.width = `${
  //     spaceOnRight > spaceOnLeft ? spaceOnRight : spaceOnLeft
  //   }px`;
  // }, []);

  const handleMouseEnter = () => {
    videoRef.current.play();
    const { left, right } = videoRef.current.getBoundingClientRect();
    const spaceOnLeft = left;
    const spaceOnRight = window.innerWidth - right;

    console.log(spaceOnLeft, spaceOnRight);
    console.log(descriptionRef.current.style);

    descriptionRef.current.classList.remove("hidden");
    // descriptionRef.current.classList.add(`w-[800px]`)

    descriptionRef.current.style = {
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
      // width: descriptionOnTheRight ? `${spaceOnRight}px` : `${spaceOnLeft}px`,
      // opacity: isHovered ? 1 : 0,
      // transform: isHovered
      //   ? "translateX(0)"
      //   : `translateX(${descriptionOnTheRight ? "100%" : "-100%"})`,
      // right: descriptionOnTheRight ? "-100%" : "auto",
      // left: descriptionOnTheRight ? "auto" : "-100%",
      // zIndex: 20,
      // textAlign: descriptionOnTheRight ? "left" : "right",
    // };
  };

  const handleMouseLeave = () => {
    videoRef.current.load();
    descriptionRef.current.classList.add("hidden");
  };

  return (
    <>
      <video
        poster={video.src}
        src={preview}
        ref={videoRef}
        autoPlay={false}
        loop
        muted
        alt={video.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-3xl cursor-pointer h-full absolute top-0 left-0 z-60"
      />
      <div
        className={`description absolute flex top-0 h-full text-gray-800 p-[2vw] flex-col box-border
          justify-center gap-4 transition-all duration-175 ease-in-out bg-light opacity-50 z-10
          `}
        ref={descriptionRef}
      >
        <h3 className="text-[2vw] font-unbounded font-black">{video.title}</h3>
        <p className="text-[1.5vw] font-unbounded font-extralight">
          {video.type}
        </p>
        <p className="font-shoulders text-[1.25vw] text-red">{video.label}</p>
      </div>
      {/* <div
        className={`description absolute top-0 text-gray-800 p-[2vw] w-full h-fit flex flex-col justify-center gap-4 transition-all duration-175 ease-in-out`}
        style={{
          // transform: isHovered
          //   ? "translateX(0)"
          //   : `translateX(${descriptionOnTheRight ? "100%" : "-100%"})`,
          right: descriptionOnTheRight ? "-100%" : "auto",
          left: descriptionOnTheRight ? "auto" : "-100%",
          // zIndex: isHovered ? 20 : 10,
          textAlign: descriptionOnTheRight ? "left" : "right",
        }}
      >
      </div> */}
    </>

    // <div className={`relative max-h-[50vh] min-h-[200px] inline-block`}>
    //   <video poster={props.srcSet[0].src}/>
    //   <div
    //     className="video-wrapper w-fit h-full relative cursor-pointer"
    //     onMouseEnter={handleMouseEnter}
    //     onMouseLeave={handleMouseLeave}
    //   >
    //     <video
    //       src={"/assets/img/cinematography/hover/" + item.preview}
    //       className={`w-auto h-full rounded-3xl cursor-pointer absolute top-0 left-0 transition-opacity duration-300 ${
    //         isHovered ? "opacity-100 z-20" : "opacity-0 z-0"
    //       }`}
    //       loop
    //       muted
    //       ref={videoRef}
    //       alt={item.title}
    //     />
    //     <img
    //       src={"/assets/img/cinematography/thumbnails/" + item.thumbnail}
    //       alt={item.title}
    //       className={`w-auto h-full rounded-3xl cursor-pointer transition-opacity duration-300 ${
    //         isHovered ? "opacity-0" : "opacity-100"
    //       }`}
    //     />
    //   </div>

    // </div>
  );
};

GalleryItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default GalleryItem;
