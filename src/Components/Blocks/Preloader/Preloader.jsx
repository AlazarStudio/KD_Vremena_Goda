import React, { useState, useEffect } from "react";
import classes from "./Preloader.module.css";

function Preloader({ isMobile }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // через 5 секунд скрываем прелоадер
    const timer = setTimeout(() => {
      setShowPreloader(false);
      document.body.style.overflow = "";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showPreloader) return null; // убираем полностью

  let videoName = isMobile ? "/IMG_8540.MP4" : "/Animation_Emunarq-2.webm"
  let videPosterName = isMobile ? "/IMG_8540.webp" : "/preloader_poster.webp"

  return (
    <div className={classes.preloader}>
      <video
        className={classes.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={videPosterName}
      >
        <source src={videoName} type="video/webm" />
      </video>
      <div className={classes.spinner}>
        <img src="/Preloader.webp" alt="" />
      </div>
    </div>
  );
}

export default Preloader;
