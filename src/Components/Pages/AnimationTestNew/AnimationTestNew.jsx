import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimationTestNew.module.css";

function AnimationTestNew() {
  const [radius, setRadius] = useState(0);
  const [circlePos, setCirclePos] = useState({ cx: "50%", cy: "100%" }); // изначально снизу по центру

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const raf = useRef(null);

  const animate = () => {
    const diff = targetRef.current - currentRef.current;

    if (Math.abs(diff) < 1) {
      currentRef.current = targetRef.current;
      setRadius(currentRef.current);
      return;
    }

    const speed = diff > 0 ? 0.02 : 0.04; // раскрытие медленнее, схлопывание быстрее
    currentRef.current += diff * speed;

    setRadius(currentRef.current);
    raf.current = requestAnimationFrame(animate);
  };

  const startAnimationTo = (target) => {
    targetRef.current = target;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
  };

  const handleReveal = (e) => {
    const { clientX, clientY } = e;
    setCirclePos({ cx: clientX, cy: clientY }); // мышь как центр
    startAnimationTo(1600);
  };

  const handleHide = () => startAnimationTo(0);

  return (
    <div className={classes.wrapper}>
      <div className={classes.topBlock}>
        <h1 onClick={handleReveal}>Top (нажми в любую точку)</h1>
      </div>

      <svg width="0" height="0">
        <defs>
          <mask id="circleMask">
            <rect width="100%" height="100%" fill="black" />
            <circle
              cx={circlePos.cx}
              cy={circlePos.cy}
              r={radius}
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div
        className={classes.maskedBlock}
        style={{
          mask: "url(#circleMask)",
          WebkitMask: "url(#circleMask)",
          pointerEvents: radius > 0 ? "all" : "none",
        }}
      >
        <h2 onClick={handleHide}>Masked (нажми чтобы закрыть)</h2>
      </div>
    </div>
  );
}

export default AnimationTestNew;
