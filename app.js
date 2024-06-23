document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 4000); // Change slide every 4 seconds
});

//////////////////////////////////////

function hero() {
  const parent = document.querySelector(".slide");
  const child = document.querySelector("#hero-text");

  const parentWidth = parent.offsetWidth;
  const parentHeight = parent.offsetHeight;

  const imageAspectRatio = 1920 / 1080;
  const parentAspectRatio = parentWidth / parentHeight;

  let renderWidth,
    renderHeight,
    offsetX = 0,
    offsetY = 0;
  if (parentAspectRatio > imageAspectRatio) {
    renderWidth = parentWidth;
    renderHeight = renderWidth / imageAspectRatio;
    offsetY = (parentHeight - renderHeight) / 2;
  } else {
    renderHeight = parentHeight;
    renderWidth = renderHeight * imageAspectRatio;
    offsetX = (parentWidth - renderWidth) / 2;
  }

  const squareWidth = (392 / 1920) * renderWidth;
  const squareHeight = (190 / 1080) * renderHeight;
  const squareLeft = (766 / 1920) * renderWidth + offsetX;
  const squareTop = (430 / 1080) * renderHeight + offsetY;

  child.style.width = squareWidth + "px";
  child.style.height = squareHeight + "px";
  child.style.left = squareLeft + "px";
  child.style.top = squareTop + "px";
}
hero();
window.addEventListener("resize", hero);

//////////////////////////////////////
function resizeHeroText() {
  const parentElement = document.querySelector("#hero-text");
  const textElements = document.querySelectorAll("#hero-text h2");

  const parentHeight = parentElement.offsetHeight;

  for (let textElement of textElements) {
    textElement.style.fontSize = parentHeight / 1.9 + "px";
  }
}
resizeHeroText();
window.addEventListener("resize", resizeHeroText);
