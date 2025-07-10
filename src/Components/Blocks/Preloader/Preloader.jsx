import React, { useState, useEffect } from "react";
import classes from "./Preloader.module.css";

function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    function handleLoad() {
      // запускаем анимацию затухания
      setFadeOut(true);
      // через 500мс скрываем прелоадер совсем
      setTimeout(() => setLoading(false), 500);
    }

    if (document.readyState === "complete") {
      // если уже загружено
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`${classes.preloader} ${
        fadeOut ? classes.fadeOut : ""
      }`}
    >
      <div className={classes.spinner}>
        {/* Наш четырёхлистник как SVG */}
        <img src="/Preloader.png" alt="" />
      </div>
    </div>
  );
}

export default Preloader;
