import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimationTestNew.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";
import Presentation_section from "../../Blocks/Presentation_section/Presentation_section";
import Elegant_section_mobile from "../../Blocks/Elegant_section_mobile/Elegant_section_mobile";
import { useIsVisible } from "../../../useIsVisible";
import { useScrollStop } from "../../../useScrollStop";
import Footer from "../../Blocks/Footer/Footer";
import Header from "../../Blocks/Header/Header";

function createSmoothDriver(initial = 0, speed = 0.12) {
  let current = initial;
  let target = initial;
  let raf = null;
  const listeners = new Set();

  function update() {
    const delta = target - current;
    if (Math.abs(delta) > 0.1) {
      current += delta * speed;
      listeners.forEach(fn => fn(current));
      raf = requestAnimationFrame(update);
    } else {
      current = target;
      listeners.forEach(fn => fn(current));
      raf = null;
    }
  }

  return {
    set(value) {
      target = value;
      if (!raf) raf = requestAnimationFrame(update);
    },
    onUpdate(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    get value() {
      return current;
    }
  };
}

function useSectionMetrics(options = {}) {
  const { margin = 0 } = options;
  const ref = useRef(null);
  const [state, setState] = useState({
    topAbs: 0,
    height: 0,
    inView: false,
    progress: 0,
    distanceToViewportTop: 0,
  });

  useEffect(() => {
    let raf = null;

    const measure = () => {
      raf = null;
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const topAbs = rect.top + window.scrollY;
      const height = rect.height;
      const viewportH = window.innerHeight;

      // Прогресс прохождения: начинаем считать, когда низ вьюпорта касается верха секции,
      // и заканчиваем, когда верх вьюпорта проходит низ секции.
      const start = topAbs - viewportH - margin;
      const end = topAbs + height + margin;
      const y = window.scrollY;
      const raw = (y - start) / (end - start);
      const progress = Math.max(0, Math.min(1, raw));

      const inView = rect.top < viewportH && rect.bottom > 0;

      setState({
        topAbs,
        height,
        inView,
        progress,
        distanceToViewportTop: rect.top,
      });
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(measure);
    };

    const onResize = measure;

    // Следим за изменением размеров узла (динамический контент)
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [margin]);

  return [ref, state];
}

function AnimationTestNew({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 50);
  }, []);

  const [showCollectionAnim, setShowCollectionAnim] = useState(false);
  const [showHistoryAnim, setShowHistoryAnim] = useState(false);
  const [showFlatsAnim, setShowFlatsAnim] = useState(false);
  const [showFlatsHistoryAnim, setShowFlatsHistoryAnim] = useState(false);
  const [showElegantPrezentationAnim, setShowElegantPrezentationAnim] = useState(false);
  const [showElegantContactsAnim, setShowElegantContactsAnim] = useState(false);
  const [showElegantConsultationAnim, setShowElegantConsultationAnim] = useState(false);

  const [isCollectionDone, setIsCollectionDone] = useState(false);

  const [flatSliderMovePosition, setFlatSliderMovePosition] = useState(0);

  const topRef = useRef(null);
  const smoothRadius = useRef(createSmoothDriver(0, 0.12)).current;

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasScrolled]);


  useEffect(() => {
    const onScroll = () => {
      const scrollEnd = window.innerHeight * 2; // когда скролл >= этого значения — цветок раскрыт полностью
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (scrollEnd * 1.5), 1); // clamp от 0 до 1


      if (progress >= 0.15) {
        setShowCollectionAnim(true)
      } else {
        setShowCollectionAnim(false)
      }

      // console.log(progress)

      if (progress == 1) {
        setIsCollectionDone(true);
      } else {
        setIsCollectionDone(false);
      }


      const maxRadius = 1600; // максимальный радиус круга
      smoothRadius.set(progress * maxRadius);
    };
    // Обновляем clip-path в зависимости от скролла

    const unsubscribe = smoothRadius.onUpdate(r => {
      if (topRef.current) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const offsetX = r * 0.85;
        const offsetY = r * 0.85;

        // Новые центры, смещающиеся от центра по мере роста r
        const cx1 = centerX - offsetX; // верх-лево
        const cx2 = centerX + offsetX; // верх-право
        const cx3 = centerX - offsetX; // низ-лево
        const cx4 = centerX + offsetX; // низ-право

        const cy1 = centerY - offsetY;
        const cy2 = centerY - offsetY;
        const cy3 = centerY + offsetY;
        const cy4 = centerY + offsetY;

        const circlePath = (cx, cy, r) =>
          `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 -${r * 2},0 Z`;

        const path =
          circlePath(cx1, cy1, r) + ' ' +
          circlePath(cx2, cy2, r) + ' ' +
          circlePath(cx3, cy3, r) + ' ' +
          circlePath(cx4, cy4, r) + ' ' +
          circlePath(centerX, centerY, r);

        topRef.current.style.clipPath = `path('${path}')`;
      }
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubscribe();
    };
  }, [smoothRadius]);


  // console.log(isCollectionDone)

  const [isUnpinned, setIsUnpinned] = useState(false);
  const historyMaskRef = useRef(null);
  const smoothRectOffset = useRef(createSmoothDriver(0, 0.12)).current;

  const historyContentRef = useRef(null);
  const smoothHistoryOffset = useRef(createSmoothDriver(0, 0.12)).current;

  const [historyMaxOffset, setHistoryMaxOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Фаза 1: Раскрытие маски
      const scrollStart = 1800;
      const scrollEnd = scrollStart + window.innerHeight;
      const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
      const maxOffset = window.innerHeight;
      smoothRectOffset.set(progress * maxOffset);

      // console.log(progress)

      if (progress >= 0.6) {
        setShowHistoryAnim(true)
      } else {
        setShowHistoryAnim(false)
      }

      if (progress >= 1) {
        setTimeout(() => {
          setIsUnpinned(true);
        }, 500)
      } else {
        setIsUnpinned(false);
      }

      // Фаза 2: Двигаем весь блок вверх
      if (isUnpinned && !isUnpinned2) {
        const localScroll = Math.max(scrollY - scrollEnd, 0);
        const limitedOffset = Math.min(localScroll, historyMaxOffset);
        smoothHistoryOffset.set(limitedOffset);
      }
    };

    const unsubMask = smoothRectOffset.onUpdate(offset => {
      if (historyMaskRef.current) {
        const count = 6;
        const rects = [];
        const rectWidth = window.innerWidth / count;
        const height = window.innerHeight;
        const progress = offset / height;
        const scaledProgress = progress * 7;

        for (let i = 0; i < count; i++) {
          const x = i * rectWidth;
          const baseDelay = (Math.sin(i * 1) + 1) / 2;
          const speedFactor = 0.15 + (Math.cos(i * 0.9) + 1) / 10;
          const localProgress = Math.max(0, Math.min(1, (scaledProgress - baseDelay) * speedFactor));
          const translateY = (1 - localProgress) * height;

          rects.push(`M${x},${translateY} h${rectWidth} v${height} h-${rectWidth} Z`);
        }

        const path = rects.join(" ");
        historyMaskRef.current.style.clipPath = `path('${path}')`;
      }
    });

    const unsubTransform = smoothHistoryOffset.onUpdate(offset => {
      if (!isMobile && historyContentRef.current) {
        historyContentRef.current.style.transform = `translateY(-${offset}px)`;
      }
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubMask();
      unsubTransform();
    };
  }, [isUnpinned]);

  useEffect(() => {
    const updateHeight = () => {
      if (historyContentRef.current) {
        const scrollHeight = historyContentRef.current.scrollHeight;
        const max = scrollHeight - window.innerHeight;
        setHistoryMaxOffset(max > 0 ? max : 0);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);


  const [isUnpinned2, setIsUnpinned2] = useState(false);
  const flatsMaskRef = useRef(null);
  const flatsContentRef = useRef(null);
  const smoothRectOffset2 = useRef(createSmoothDriver(0, 0.12)).current;
  const smoothFlatsOffset = useRef(createSmoothDriver(0, 0.12)).current;


  useEffect(() => {
    const onScroll = () => {
      const scrollStart = isMobile ? 3200 : 4000;
      const scrollEnd = scrollStart + window.innerHeight;
      const scrollY = window.scrollY;

      const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
      const maxOffset = window.innerHeight;
      smoothRectOffset2.set(progress * maxOffset);

      setFlatSliderMovePosition(scrollEnd)

      if (progress >= 0.7) {
        setShowFlatsAnim(true)
      } else {
        setShowFlatsAnim(false)
      }

      if (progress >= 1) {
        setTimeout(() => setIsUnpinned2(true), 500);
      } else {
        setIsUnpinned2(false);
      }

      if (isUnpinned2) {
        const localScroll = Math.max(scrollY - scrollEnd, 0);
        smoothFlatsOffset.set(localScroll);
      }
    };

    const unsubMask = smoothRectOffset2.onUpdate(offset => {
      if (flatsMaskRef.current) {
        const count = 6;
        const rects = [];
        const rectWidth = window.innerWidth / count;
        const height = window.innerHeight;
        const progress = offset / height;
        const scaledProgress = progress * 7;

        for (let i = 0; i < count; i++) {
          const x = i * rectWidth;
          const baseDelay = (Math.sin(i * 1.5) + 1) / 2;
          const speedFactor = 0.15 + (Math.cos(i * 1.1) + 1) / 10;
          const localProgress = Math.max(0, Math.min(1, (scaledProgress - baseDelay) * speedFactor));
          const translateY = (1 - localProgress) * height;
          rects.push(`M${x},${translateY} h${rectWidth} v${height} h-${rectWidth} Z`);
        }

        const path = rects.join(" ");
        flatsMaskRef.current.style.clipPath = `path('${path}')`;
      }
    });

    const unsubTransform = smoothFlatsOffset.onUpdate(offset => {
      if (flatsContentRef.current) {
        const flatsHeight = flatsContentRef.current.offsetHeight;
        const clampedOffset = Math.min(offset, flatsHeight - window.innerHeight);
        flatsContentRef.current.style.transform = `translateY(-${clampedOffset}px)`;
      }
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubMask();
      unsubTransform();
    };
  }, [isUnpinned2]);

  const elegantMaskRef = useRef(null);
  const elegantContentRef = useRef(null);
  const smoothRectOffset3 = useRef(createSmoothDriver(0, 0.12)).current;
  const smoothElegantOffset = useRef(createSmoothDriver(0, 0.12)).current;
  const [isElegantUnpinned, setIsElegantUnpinned] = useState(false);

  useEffect(() => {
    const scrollStart = isMobile ? 5000 : 7200;
    const scrollEnd = scrollStart + window.innerHeight;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
      smoothRectOffset3.set(progress * window.innerHeight);

      if (progress >= 1) {
        setTimeout(() => setIsElegantUnpinned(true), 500);
      } else {
        setIsElegantUnpinned(false);
      }

      if (isElegantUnpinned) {
        const localScroll = Math.max(scrollY - scrollEnd, 0);
        smoothElegantOffset.set(localScroll);
      }
    };

    const unsubMask = smoothRectOffset3.onUpdate(offset => {
      if (!elegantMaskRef.current) return;
      const count = 6;
      const rectWidth = window.innerWidth / count;
      const height = window.innerHeight;
      const progress = offset / height;
      const scaledProgress = progress * 7;

      const rects = Array.from({ length: count }).map((_, i) => {
        const x = i * rectWidth;
        const baseDelay = (Math.sin(i * 1.5) + 1) / 2;
        const speedFactor = 0.15 + (Math.cos(i * 1.1) + 1) / 10;
        const localProgress = Math.max(0, Math.min(1, (scaledProgress - baseDelay) * speedFactor));
        const translateY = (1 - localProgress) * height;
        return `M${x},${translateY} h${rectWidth} v${height} h-${rectWidth} Z`;
      });

      elegantMaskRef.current.style.clipPath = `path('${rects.join(" ")}')`;
    });

    const unsubTransform = smoothElegantOffset.onUpdate(offset => {
      if (elegantContentRef.current) {
        const maxScroll = elegantContentRef.current.offsetHeight - window.innerHeight;
        const clampedOffset = Math.min(offset, maxScroll);
        elegantContentRef.current.style.transform = `translateY(-${clampedOffset}px)`;
      }
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubMask();
      unsubTransform();
    };
  }, [isElegantUnpinned]);

  const flatsHistoryRef = useRef(null);
  const flatsHistoryVisible = useIsVisible(flatsHistoryRef);

  useEffect(() => {
    if (flatsHistoryVisible) {
      setShowFlatsHistoryAnim(true)
    } else {
      setShowFlatsHistoryAnim(false)
    }
  }, [flatsHistoryVisible]);


  const elegantPrezentationRef = useRef(null);
  const elegantPrezentationVisible = useIsVisible(elegantPrezentationRef);

  useEffect(() => {
    if (elegantPrezentationVisible) {
      setShowElegantPrezentationAnim(true)
    } else {
      setShowElegantPrezentationAnim(false)
    }
  }, [elegantPrezentationVisible]);


  const elegantContactsAnimRef = useRef(null);
  const elegantContactsVisible = useIsVisible(elegantContactsAnimRef);

  useEffect(() => {
    if (elegantContactsVisible) {
      setShowElegantContactsAnim(true)
    } else {
      setShowElegantContactsAnim(false)
    }
  }, [elegantContactsVisible]);


  const elegantConsultationAnimRef = useRef(null);
  const elegantConsultationVisible = useIsVisible(elegantConsultationAnimRef);

  useEffect(() => {
    if (elegantConsultationVisible) {
      setShowElegantConsultationAnim(true)
    } else {
      setShowElegantConsultationAnim(false)
    }
  }, [elegantConsultationVisible]);


  const elegantRef = useRef(null);
  const isElegantVisible = useIsVisible(elegantRef);
  const isScrollStopped = useScrollStop(500);

  useEffect(() => {
    if (isElegantVisible && isScrollStopped && elegantRef.current) {
      const top = elegantRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [isElegantVisible, isScrollStopped]);


  const elegantSectionRef = useRef(null);
  const [elegantSectionScroll, setElegantSectionScroll] = useState(0);

  useEffect(() => {
    if (elegantSectionRef.current) {
      const blockTop = elegantSectionRef.current.offsetTop;
      setElegantSectionScroll(blockTop);
    }
  }, []);


  const [historyHostRef, historyMetrics] = useSectionMetrics({ margin: 0 });
  const [flatsHostRef, flatsMetrics] = useSectionMetrics({ margin: 0 });
  const [elegantHostRef, elegantMetrics] = useSectionMetrics({ margin: 0 });
  const [presentationHostRef, presentationMetrics] = useSectionMetrics({ margin: 0 });
  const [contactsHostRef, contactsMetrics] = useSectionMetrics({ margin: 0 });
  const [consultationHostRef, consultationMetrics] = useSectionMetrics({ margin: 0 });

  const vhRef = useRef(null);
  const lvhRef = useRef(null);
  const [viewHeight, setViewHeight] = useState(0);
  const [viewHeightLarge, setViewHeightLarge] = useState(0);
  const [viewHeightLarge2, setViewHeightLarge2] = useState(0);

  useEffect(() => {
    // вычисляем только один раз
    // vhRef.current = window.innerHeight;
    lvhRef.current = window.screen.height;
    // setViewHeight(vhRef.current + 'px');
    setViewHeight(lvhRef.current + 'px');
    setViewHeightLarge2(lvhRef.current * 2 + 'px');
  }, []);
  return (
    <>
      <div className={classes.wrapper} style={{
        width: '100%',
        height: `${isMobile ? viewHeightLarge2 : '1500vh'}`
      }}>
        <div className={classes.bottom} style={{
          zIndex: 1,
          pointerEvents: scrollY > 0 ? 'none' : 'auto',
        }}>
          <Main_section viewHeight={viewHeight} />
        </div>

        <div className={classes.top} ref={topRef} style={{
          zIndex: hasScrolled ? 2 : 0,
        }}>
          <Collection_section reveal={showCollectionAnim} viewHeight={viewHeight} />
        </div>
      </div >

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 4 }}>
        <Header viewHeight={viewHeight} scrollY={scrollY} />
      </div>

      <div style={{ position: 'relative', zIndex: 3 }} >
        {/* <Main_section mobileChange={true} viewHeight={viewHeight} />

        <Collection_section reveal={showCollectionAnim} viewHeight={viewHeight} /> */}

        <div ref={historyHostRef}>
          <History_section shown={historyMetrics.progress >= 0.15} viewHeight={viewHeight} isMobile={isMobile} />
        </div>

        <div ref={flatsHostRef}>
          <Flats_section
            scrollPos={scrollY}
            shown={flatsMetrics.progress >= 0.15}
            scale={flatsMetrics.progress >= 0.15}
            tower={flatsMetrics.progress >= 0.3}
            flatsHistoryRef={flatsHistoryRef}
            flatSliderMovePosition={flatSliderMovePosition}
            isMobile={isMobile}
            viewHeight={viewHeight}
          />
        </div>

        <div style={{ paddingBottom: '40px', backgroundColor: '#fff' }}></div>


        <div ref={elegantHostRef}>
          <Elegant_section_mobile shown={elegantMetrics.progress >= 0.4} isMobile={isMobile} targetScroll={elegantMetrics.topAbs} viewHeight={viewHeight} />
        </div>
        
        <div ref={presentationHostRef}>
          <Presentation_section presShow={presentationMetrics.progress >= 0.15} viewHeight={viewHeight} isMobile={isMobile}/>
        </div>

        <div ref={contactsHostRef}>
          <Contacts contactShow={contactsMetrics.progress >= 0.15} isMobile={isMobile} />
        </div>

        <div ref={consultationHostRef} >
          <Consultation consultation={consultationMetrics.progress >= 0.15} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AnimationTestNew;
