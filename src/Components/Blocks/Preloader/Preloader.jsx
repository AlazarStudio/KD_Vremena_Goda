import React, { useState, useEffect } from "react";
import classes from "./Preloader.module.css";

function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // через 5 секунд скрываем прелоадер
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showPreloader) return null; // убираем полностью

  return (
    <div className={classes.preloader}>
      <video
        className={classes.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/preloader_poster.webp"
      >
        <source src="/Animation_Emunarq-2.webm" type="video/webm" />
      </video>
      <div className={classes.spinner}>
        <img src="/Preloader.webp" alt="" />
      </div>
    </div>
  );
}

export default Preloader;
