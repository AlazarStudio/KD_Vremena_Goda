import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimationTestNew.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import Header from "../../Blocks/Header/Header";

function AnimationTestNew() {
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [targetScale, setTargetScale] = useState(0.1);
  const [smoothScale, setSmoothScale] = useState(0.1);
  const raf = useRef(null);

  // Следим за скроллом и ресайзом
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Пересчитываем целевой scale из прокрутки (линейно)
  useEffect(() => {
    // Чем больше высота, тем дальше «цветок» растёт
    const raw = 0 + (scrollY / (viewport.height * 0.6));
    setTargetScale(raw);
  }, [scrollY, viewport.height]);

  // Плавная анимация scale
  useEffect(() => {
    const animate = () => {
      setSmoothScale(prev => prev + (targetScale - prev) * 0.03);
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [targetScale]);

  const { width, height } = viewport;
  const cx = width / 2;
  const cy = height / 2;

  const revealCollection = scrollY >= viewport.height * 4;

  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask
            id="flowerMask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={width}
            height={height * 2}  /* два экрана */
          >
            <rect width={width} height={height * 2} fill="black" />
            <g
              style={{
                transform: `translate(${cx}px, ${cy}px) scale(${smoothScale}) translate(-110px, -110px)`,
                willChange: "transform",
              }}
            >
              <path
                d="
                  M130,110
                  A50,50 0 1 1 110,130
                  A50,50 0 1 1 90,110
                  A50,50 0 1 1 110,90
                  A50,50 0 1 1 130,110
                  Z
                "
                fill="white"
              />
            </g>
          </mask>
        </defs>
      </svg>

      <div className={classes.wrapper}>
        <div className={classes.background}>
          <Header />
          <Main_section />
        </div>

        <div
          className={classes.maskedBlock}
          style={{
            mask: "url(#flowerMask)",
            WebkitMask: "url(#flowerMask)",
          }}
        >
          <Collection_section reveal={revealCollection}/>
        </div>
      </div>
    </>
  );
}

export default AnimationTestNew;
