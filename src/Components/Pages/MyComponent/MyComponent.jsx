import React, { useEffect, useRef, useState } from "react";
import classes from "./MyComponent.module.css";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Elegant_section from "../../Blocks/Elegant_section/Elegant_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";

function MyComponent({ enableCountScroll }) {
  const [count, setCount] = useState(0);
  const [historyState, setHistoryState] = useState("idle"); // idle | scrolling | scrolled | keep
  const scrollLock = useRef(false);
  const historyOffset = useRef(0);
  const historyRef = useRef(null);
  const touchStartY = useRef(null);

  const sections = [
    <div key="empty" className={classes.empty} />,
    <div key="history" className={classes.historyOuter}>
      <div
        className={classes.historyInner}
        ref={historyRef}
        style={{
          transform: `translateY(-${historyOffset.current}px)`,
        }}
      >
        <History_section shown={count === 1 && historyState !== "keep"}/>
      </div>
    </div>,
    <Flats_section key="flats" />,
    <Elegant_section key="elegant" />,
    <Contacts key="contacts" />,
    <Consultation key="consultation" />,
  ];

  const lockScroll = (ms = 500) => {
    scrollLock.current = true;
    setTimeout(() => {
      scrollLock.current = false;
    }, ms);
  };

  const animateHistoryScroll = (targetOffset, onComplete) => {
    const el = historyRef.current;
    if (!el) return;

    const start = historyOffset.current;
    const delta = targetOffset - start;
    const duration = 500;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      historyOffset.current = start + delta * eased;
      el.style.transform = `translateY(-${historyOffset.current}px)`;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(step);
  };

  const handleScrollDirection = (deltaY) => {
    const el = historyRef.current;
    const fullHeight = el?.scrollHeight || 0;
    const viewportHeight = window.innerHeight;

    // === Логика History_section ===
    if (count === 1) {
      if (deltaY > 0) {
        if (historyState === "idle") {
          setHistoryState("scrolling");
          lockScroll();
          animateHistoryScroll(fullHeight - viewportHeight, () => {
            setHistoryState("scrolled");
            lockScroll();
          });
          return;
        }

        if (historyState === "scrolled") {
          setCount(2);
          setHistoryState("keep");
          lockScroll();
          return;
        }

        return;
      }

      if (deltaY < 0) {
        if (historyState === "keep" || historyState === "scrolled") {
          setHistoryState("scrolling");
          lockScroll();
          animateHistoryScroll(0, () => {
            setHistoryState("idle");
            lockScroll();
          });
          return;
        }

        if (historyState === "idle") {
          setCount(0);
          lockScroll();
          return;
        }

        return;
      }
    }

    // === Обычные переходы
    const next = deltaY > 0 ? count + 1 : count - 1;
    const clamped = Math.max(0, Math.min(sections.length - 1, next));
    if (clamped !== count) {
      setCount(clamped);
      lockScroll();
    }
  };

  // === Wheel (desktop)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!enableCountScroll || scrollLock.current) return;
      handleScrollDirection(e.deltaY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [count, enableCountScroll, historyState]);

  // === Touch (mobile)
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (!enableCountScroll || scrollLock.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!enableCountScroll || scrollLock.current || touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      handleScrollDirection(deltaY);
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [count, enableCountScroll, historyState]);

  return (
    <div className={classes.wrapper}>
      {sections.map((Component, i) => (
        <div
          key={i}
          className={`${classes.screen} ${count >= i ? classes.visible : ""}`}
          style={{ zIndex: i + 1 }}
        >
          {Component}
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
