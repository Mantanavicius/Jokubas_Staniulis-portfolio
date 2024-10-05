import type { Photo } from "react-photo-album";

const photos = [
  {
    title: "Showreel",
    type: "Showreel",
    team: "• Jokūbas Staniulis",
    src: "cinematography_showreel_img00000000.jpg",
    preview: "cinematography_showreel_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 2048,
    height: 858
  },
  {
    title: "Oxford",
    type: "Something",
    team: "• Jokūbas Staniulis",
    src: "cinematography_oxford_img00000000.jpg",
    preview: "cinematography_oxford_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "A bite at the cherry",
    type: "Music video",
    team: "• Jokūbas Staniulis and others",
    src: "cinematography_abiteatthecherry_img00000000.jpg",
    preview: "cinematography_abiteatthecherry_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 1920,
    height: 1400
  },
  {
    title: "Kali kali",
    type: "Music video",
    team: "• Jokūbas Staniulis and others",
    src: "cinematography_kalikali_img00000000.jpg",
    preview: "cinematography_kalikali_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "Shallow",
    type: "Something",
    team: "• Jokūbas Staniulis",
    src: "cinematography_shallow_img00000000.jpg",
    preview: "cinematography_shallow_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 2048,
    height: 858
  },
  {
    title: "LKL ofisas",
    type: "Promotional video",
    team: "• Jokūbas Staniulis and others",
    src: "cinematography_lklofisas_img00000000.jpg",
    preview: "cinematography_lklofisas_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "LKL kurjeris",
    type: "Promotional video",
    team: "• Jokūbas Staniulis and others",
    src: "cinematography_lklkurjeris_img00000000.jpg",
    preview: "cinematography_lklkurjeris_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "Apraiška",
    type: "Short film",
    team: "• Jokūbas Staniulis and others",
    src: "cinematography_apraiska_img00000000.jpg",
    preview: "cinematography_apraiska_hover.mp4",
    video: "cinematography_placeholder.mp4",
    width: 2048,
    height: 858
  },
].map(
  ({ src, title, width, height, preview, video, team, type }) =>
    ({
      src: "../assets/img/cinematography/thumbnails/" + src,
      width,
      height,
      alt: title,
      title,
      type,
      label: team,
      srcSet: [
       {src: "../assets/img/cinematography/hover/" + preview},
       {src: "../assets/img/cinematography/videos/" + video}
      ]
      
    }) as Photo,
  );
  
  export default photos;
  