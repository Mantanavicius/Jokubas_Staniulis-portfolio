import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'bg-[url("../src/assets/img/slideshow-desktop/1.png")]',
    'bg-[url("../src/assets/img/slideshow-desktop/2.png")]',
    'bg-[url("../src/assets/img/slideshow-desktop/3.png")]',
    'bg-[url("../src/assets/img/slideshow-desktop/4.png")]',
  ];

  const turbulenceRef = useRef(null);
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
    const animateTurbulence = () => {
      if (turbulenceRef.current) {
        const frequency = 7 + Math.random();
        turbulenceRef.current.setAttribute(
          "baseFrequency",
          `${frequency} ${frequency}`
        );
      }
      requestAnimationFrame(animateTurbulence);
    };
    animateTurbulence();
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      if (sectionRef.current && heroTextRef.current && heroMenuRef.current) {
        const parent = sectionRef.current;
        const heroText = heroTextRef.current;
        const heroMenu = heroMenuRef.current;

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
        const menuHeight = (24 / 1080) * renderHeight;
        const menuLeft = (791 / 1920) * renderWidth + offsetX;
        const menuTop = (646 / 1080) * renderHeight + offsetY;

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
          item.style.fontSize = `${menuHeight / 1.37}px`;
        });

        menuSlashes.forEach((slash) => {
          slash.style.fontSize = `${menuHeight / 1.2}px`;
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
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

      <svg
        id="grain"
        className="absolute inset-0 z-10 mix-blend-overlay w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <filter id="noiseFilter">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="7"
            numOctaves="6"
            stitchTiles="stitch"
          ></feTurbulence>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"></rect>
      </svg>

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
        className="relative z-20 text-sage mix-blend-difference"
      >
        <ul className="menu flex justify-between items-center h-full">
          <li>
            <Link to="/works">works</Link>
          </li>
          <li className="slash">{"//"}</li>
          <li>
            <Link to="/showreel" id="showreel">
              SHOWREEL
            </Link>
          </li>
          <li className="slash">{"//"}</li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Hero;
