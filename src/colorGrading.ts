import type { Photo } from "react-photo-album";

const photos = [
  {
    title: "A bite at the cherry",
    type: "Music video",
    team: "• Jokūbas Staniulis and others",
    src: "color_grading_bite_img00000000.jpg",
    before: "color_grading_bite_hover_slider_before.mp4",
    after: "color_grading_bite_hover_slider_after.mp4",
    width: 1920,
    height: 1400
  },
  {
    title: "Kali kali",
    type: "Music video",
    team: "• Jokūbas Staniulis and others",
    src: "color_grading_kalikali_img00000000.jpg",
    before: "color_grading_kalikali_hover_slider_before.mp4",
    after: "color_grading_kalikali_hover_slider_after.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "Eit iš proto",
    type: "Something",
    team: "• Jokūbas Staniulis",
    src: "color_grading_eitisproto_img00000000.jpg",
    before: "color_grading_eitisproto_hover_slider_before.mp4",
    after: "color_grading_eitisproto_hover_slider_after.mp4",
    width: 1920,
    height: 1440
  },
  {
    title: "LKL ofisas",
    type: "Promotional video",
    team: "• Jokūbas Staniulis and others",
    src: "color_grading_lklofisas_img00000000.jpg",
    before: "color_grading_lklofisas_hover_slider_before.mp4",
    after: "color_grading_lklofisas_hover_slider_after.mp4",
    width: 1920,
    height: 1080
  },
  {
    title: "Gėlės",
    type: "Short film",
    team: "• Jokūbas Staniulis and others",
    src: "color_grading_geles_img00000000.jpg",
    before: "color_grading_geles_hover_slider_before.mp4",
    after: "color_grading_geles_hover_slider_after.mp4",
    width: 2048,
    height: 858
  },

].map(
  ({ src, title, width, height }) =>
    ({
      src: "../assets/img/color-grading/thumbnails/" + src,
      alt: title,
      width,
      height
      
    }) as Photo,
  );
  
  export default photos;
  