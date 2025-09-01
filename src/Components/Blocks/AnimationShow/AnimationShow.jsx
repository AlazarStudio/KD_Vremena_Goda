import React, { useEffect, useRef, useState } from "react";
import classes from './AnimationShow.module.css';
import Header from "../Header/Header";
import Main_section from "../Main_section/Main_section";
import Collection_section from "../Collection_section/Collection_section";
import History_section from "../History_section/History_section";
import Flats_section from "../Flats_section/Flats_section";
import Elegant_section from "../Elegant_section/Elegant_section";
import Presentation_section from "../Presentation_section/Presentation_section";
import Contacts from "../Contacts/Contacts";
import Consultation from "../Consultation/Consultation";
import Footer from "../Footer/Footer";
import { useIsVisible } from "../../../useIsVisible";
import { useScrollStop } from "../../../useScrollStop";
import Elegant_section_mobile from "../Elegant_section_mobile/Elegant_section_mobile";

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

function AnimationShow({ isMobile }) {
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

            // console.log(progress)

            if (progress >= 0.3) {
                setShowCollectionAnim(true)
            } else {
                setShowCollectionAnim(false)
            }

            const maxRadius = 1600; // максимальный радиус круга
            smoothRadius.set(progress * maxRadius);
        };

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
            const scrollStart = isMobile ? 3200 : 7200;
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
                const flatsHeight = flatsContentRef.current.offsetHeight - 100;
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
        const scrollStart = isMobile ? 5000 : 14500;
        const scrollEnd = (scrollStart) + window.innerHeight;

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

                // console.log(offset)
                // console.log(clampedOffset)
                // console.log(maxScroll)
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

    return (
        <div className={classes.wrapper} style={{ height: `${isMobile ? '1100vh' : '2500vh'}` }}>
            <div className={classes.bottom} style={{
                zIndex: 1,
                pointerEvents: scrollY > 0 ? 'none' : 'auto',
            }}>
                <Header isMobile={isMobile} />
                <Main_section />
            </div>

            <div className={classes.top} ref={topRef} style={{
                zIndex: hasScrolled ? 2 : 0
            }}>
                <Collection_section reveal={showCollectionAnim} />
            </div>

            <div className={classes.history} ref={historyMaskRef} style={{
                zIndex: hasScrolled ? 3 : 0
            }}>
                <div ref={historyContentRef}>
                    <History_section shown={showHistoryAnim} blockHeight={window.innerHeight} />
                </div>
            </div>

            <div className={classes.flats} ref={flatsMaskRef} style={{
                zIndex: hasScrolled ? 4 : 0
            }}>
                <div ref={flatsContentRef}>
                    <Flats_section
                        scrollPos={scrollY}
                        shown={showFlatsAnim}
                        scale={true}
                        tower={showFlatsHistoryAnim}
                        flatsHistoryRef={flatsHistoryRef}
                        flatSliderMovePosition={flatSliderMovePosition}
                        isMobile={isMobile}
                    />
                </div>
            </div>

            <div className={classes.elegant} ref={elegantMaskRef} style={{
                zIndex: hasScrolled ? 5 : 0
            }}>
                <div ref={elegantContentRef}>
                    {isMobile
                        ?
                        <Elegant_section_mobile shown={true} isMobile={isMobile} targetScroll={elegantSectionScroll} />
                        :
                        <Elegant_section shown={true} />
                    }

                    <Presentation_section presShow={showElegantPrezentationAnim} elegantPrezentationRef={elegantPrezentationRef} />
                    <Contacts contactShow={showElegantContactsAnim} elegantContactsAnimRef={elegantContactsAnimRef} isMobile={isMobile} />
                    <Consultation consultation={showElegantConsultationAnim} elegantConsultationAnimRef={elegantConsultationAnimRef} />
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AnimationShow;
