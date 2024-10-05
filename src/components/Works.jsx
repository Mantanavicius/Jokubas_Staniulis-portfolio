import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import cinematography from "../cinematography";
import colorGrading from "../colorGrading";
import GalleryItem from "./GalleryItem";
import Slider from "./Slider";

const Works = () => {

  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="works transition-all duration-200 px-4 pb-4">
      <header className="menu w-full h-[max(60px,5vw)] flex items-center justify-center text-dark text-[max(14px,1.3vw)]">
        <button
          onClick={() => setOpenTab(1)}
          className={`${
            openTab === 1 ? "font-bold" : ""
          } transition-weight duration-200`}
        >
          cinematography
        </button>
        <span className="mx-2">{"//"}</span>
        <button
          onClick={() => setOpenTab(2)}
          className={`${
            openTab === 2 ? "font-bold" : ""
          } transition-weight duration-200`}
        >
          color grading
        </button>
      </header>
      <RowsPhotoAlbum
        photos={openTab === 1 ? cinematography : colorGrading}
        spacing={15}
        breakpoints={[768, 1024, 3250]}
        targetRowHeight={300}
        rowConstraints={(containerWidth) =>
          containerWidth > 768 && containerWidth < 3250
            ? { maxPhotos: 2 }
            : containerWidth > 768
            ? { maxPhotos: 3 }
            : { maxPhotos: 1 }
        }
        render={
          openTab === 1
            ? //  {
              //     photo: ({ onClick }, { index, ...props }) => (
              //       <GalleryItem
              //         onClick={onClick}
              //         video={props.photo}
              //         key={index}
              //         width={props.photo.width}
              //         height={props.photo.height}
              //       />
              //     ),
              //   }
              {
                image: (props) => <img {...props} className="rounded-3xl opacity-0 relative" />,
                extras: (_, { photo, index }) => (
                  <GalleryItem video={photo} index={index} />
                ),
              }
            : 
            {
              image: (props) => <img {...props} className="rounded-3xl relative" />,
              extras: (_, { photo, index }) => (
                <Slider video={photo} index={index} />
              ),
            }
        }
      />
    </div>
  );
};

export default Works;
