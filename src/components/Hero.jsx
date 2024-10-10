import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import.meta.glob("../assets/img/slideshow-desktop/*");

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'bg-[url("/assets/img/slideshow-desktop/1.png")]',
    'bg-[url("/assets/img/slideshow-desktop/2.png")]',
    'bg-[url("/assets/img/slideshow-desktop/3.png")]',
    'bg-[url("/assets/img/slideshow-desktop/4.png")]',
  ];

  // const turbulenceRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroMenuRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const updateLayout = () => {
      const section = sectionRef.current;
      const heroText = heroTextRef.current;
      const heroMenu = heroMenuRef.current;

      if (!section || !heroText || !heroMenu) return;

      const parentWidth = section.offsetWidth;
      const parentHeight = section.offsetHeight;
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

      // Hero Text positioning
      const textWidth = (392 / 1920) * renderWidth;
      const textHeight = (190 / 1080) * renderHeight;
      const textLeft = (766 / 1920) * renderWidth + offsetX;
      const textTop = (430 / 1080) * renderHeight + offsetY;

      heroText.style.width = `${textWidth}px`;
      heroText.style.height = `${textHeight}px`;
      heroText.style.left = `${textLeft}px`;
      heroText.style.top = `${textTop}px`;

      // Hero Menu positioning
      const menuWidth = (340 / 1920) * renderWidth;
      const menuFontSize = (16 / 1080) * renderHeight;
      const menuHeight = 1.5 * menuFontSize;
      const menuLeft = (791 / 1920) * renderWidth + offsetX;
      const menuTop = (642.5 / 1080) * renderHeight + offsetY;

      heroMenu.style.width = `${menuWidth}px`;
      heroMenu.style.height = `${menuHeight}px`;
      heroMenu.style.left = `${menuLeft}px`;
      heroMenu.style.top = `${menuTop}px`;

      // Resize text
      const heroTextElements = heroText.querySelectorAll("h2");
      heroTextElements.forEach((element) => {
        element.style.fontSize = `${textHeight / 1.9}px`;
      });

      const menuItems = heroMenu.querySelectorAll("a:not(.slash)");
      const menuSlashes = heroMenu.querySelectorAll(".slash");

      menuItems.forEach((item) => {
        item.style.fontSize = `${menuFontSize}px`;
      });

      menuSlashes.forEach((slash) => {
        slash.style.fontSize = `${menuHeight / 1.2}px`;
        slash.style.lineHeight = `${menuHeight * 0.65}px`;
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${slide}`}
          ></div>
        ))}
      </div>

      <div
        ref={heroTextRef}
        id="hero-text"
        className="absolute text-sage mix-blend-difference select-none font-norman"
      >
        <h2 id="jokubas" className="relative">
          JOKUBAS
          <span>-</span>
        </h2>
        <h2 id="staniulis" className="relative text-right">
          STANIULIS
        </h2>
      </div>

      <nav
        ref={heroMenuRef}
        id="hero-menu"
        className="relative z-20 text-sage mix-blend-difference flex justify-between items-center font-unbounded"
      >
        <Link to="#works">
          works
        </Link>
        <div className="slash font-norman font-bold mt-1.5">{"//"}</div>
        <Link to="/showreel" id="showreel">
          SHOWREEL
        </Link>
        <div className="slash font-norman font-bold mt-1.5">{"//"}</div>
        <Link to="/about" className="text-right">about</Link>
      </nav>
    </section>
  );
};

export default Hero;
