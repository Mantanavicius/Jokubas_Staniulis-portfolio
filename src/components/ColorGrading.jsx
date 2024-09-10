import Slider from "./Slider";

import.meta.glob("../assets/img/color-grading/*");

const beforeArray = import.meta.glob("../assets/img/color-grading/before/*", {eager: true});
const afterArray = import.meta.glob("../assets/img/color-grading/after/*", {eager: true});

const ColorGrading = () => {
  console.log(beforeArray)
  console.log(afterArray)
  const sliders = [];
  for (let i = 0; i < beforeArray.length; i++) {
    if (beforeArray[i] && afterArray[i]) {
      sliders.push(
        <Slider key={i} before={beforeArray[i]} after={afterArray[i]} />
      );
    }
  }
  console.log(sliders)

  return (
    <div className="w-full h-screen">{sliders.map((slider) => slider)}</div>
  );
};

export default ColorGrading;
