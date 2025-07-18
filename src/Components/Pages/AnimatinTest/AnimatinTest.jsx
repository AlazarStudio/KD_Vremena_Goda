import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimatinTest.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import Header from "../../Blocks/Header/Header";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Elegant_section from "../../Blocks/Elegant_section/Elegant_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";
import Footer from "../../Blocks/Footer/Footer";

function AnimatinTest() {
    const [scrollY, setScrollY] = useState(0);
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [smoothScale1, setSmoothScale1] = useState(0);
    const [smoothScale2, setSmoothScale2] = useState(0);
    const [smoothScale3, setSmoothScale3] = useState(0);

    const targetScaleRef1 = useRef(0);
    const targetScaleRef2 = useRef(0);
    const targetScaleRef3 = useRef(0);
    const hasTriggeredSecond = useRef(false);

    const raf1 = useRef(null);
    const raf2 = useRef(null);
    const raf3 = useRef(null);

    // Scroll & Resize
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrollY(y);

            if (y < 9500) {
                hasTriggeredSecond.current = false;
                targetScaleRef1.current = y / (viewport.height * 0.6);

                targetScaleRef2.current = 0;
            } else {
                if (!hasTriggeredSecond.current) {
                    hasTriggeredSecond.current = true;
                }

                targetScaleRef2.current = (y - 9500) / (viewport.height * 0.6);

                if (y < 17000) {
                    targetScaleRef3.current = 0;
                } else {
                    targetScaleRef3.current = (y - 17000) / (viewport.height * 0.6);
                }
            }
        };


        const onResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, [viewport.height, smoothScale1]);

    // Маска 1
    useEffect(() => {
        const animate1 = () => {
            setSmoothScale1(prev => {
                const diff = targetScaleRef1.current - prev;
                return Math.abs(diff) < 0.001 ? prev : prev + diff * 0.03;
            });
            raf1.current = requestAnimationFrame(animate1);
        };
        raf1.current = requestAnimationFrame(animate1);
        return () => cancelAnimationFrame(raf1.current);
    }, []);

    // Маска 2
    useEffect(() => {
        const animate2 = () => {
            setSmoothScale2(prev => {
                const diff = targetScaleRef2.current - prev;
                return Math.abs(diff) < 0.001 ? prev : prev + diff * 0.03;
            });
            raf2.current = requestAnimationFrame(animate2);
        };
        raf2.current = requestAnimationFrame(animate2);
        return () => cancelAnimationFrame(raf2.current);
    }, []);

    const { width, height } = viewport;
    const cx = width / 2;
    const cy = height / 2;

    const useFirstMask = scrollY < 9500;
    const useSecondMask = scrollY >= 9500;

    const scrollStart = 14000;
    const scrollSpeedFactor = 0.3;
    const scrollOffset = Math.max(0, (scrollY - scrollStart) * scrollSpeedFactor);
    const maxOffset = 1700 - height;
    const limitedOffset = Math.min(scrollOffset, maxOffset);

    // 👇 плавное значение, как у smoothScale
    const [smoothOffset, setSmoothOffset] = useState(0);
    const targetOffsetRef = useRef(0);
    const rafOffset = useRef(null);

    useEffect(() => {
        targetOffsetRef.current = limitedOffset;
    }, [limitedOffset]);

    useEffect(() => {
        const animateOffset = () => {
            setSmoothOffset(prev => {
                const diff = targetOffsetRef.current - prev;
                return Math.abs(diff) < 0.5 ? targetOffsetRef.current : prev + diff * 0.04;
            });
            rafOffset.current = requestAnimationFrame(animateOffset);
        };
        rafOffset.current = requestAnimationFrame(animateOffset);
        return () => cancelAnimationFrame(rafOffset.current);
    }, []);


    useEffect(() => {
        const animate3 = () => {
            setSmoothScale3(prev => {
                const diff = targetScaleRef3.current - prev;
                return Math.abs(diff) < 0.001 ? prev : prev + diff * 0.03;
            });
            raf3.current = requestAnimationFrame(animate3);
        };
        raf3.current = requestAnimationFrame(animate3);
        return () => cancelAnimationFrame(raf3.current);
    }, []);

    const [smoothOffset2, setSmoothOffset2] = useState(0);
    const targetOffsetRef2 = useRef(0);
    const rafOffset2 = useRef(null);

    const flatsRef = useRef(null);
    const [flatsHeight, setFlatsHeight] = useState(0);

    useEffect(() => {
        if (flatsRef.current) {
            setFlatsHeight(flatsRef.current.offsetHeight);
        }
    }, [viewport.height, viewport.width]);


    useEffect(() => {
        const scrollStart2 = 20000 + (1700 - height) / 0.3;
        const scrollSpeedFactor2 = 0.3;
        const scrollOffset2 = Math.max(0, (scrollY - scrollStart2) * scrollSpeedFactor2);
        const maxOffset2 = flatsHeight - height;
        const limitedOffset2 = Math.min(scrollOffset2, maxOffset2);
        targetOffsetRef2.current = limitedOffset2;
    }, [scrollY, height]);

    useEffect(() => {
        const animateOffset2 = () => {
            setSmoothOffset2(prev => {
                const diff = targetOffsetRef2.current - prev;
                return Math.abs(diff) < 0.5 ? targetOffsetRef2.current : prev + diff * 0.04;
            });
            rafOffset2.current = requestAnimationFrame(animateOffset2);
        };
        rafOffset2.current = requestAnimationFrame(animateOffset2);
        return () => cancelAnimationFrame(rafOffset2.current);
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (flatsRef.current) {
                setFlatsHeight(flatsRef.current.offsetHeight);
            }
        });
        if (flatsRef.current) resizeObserver.observe(flatsRef.current);
        return () => resizeObserver.disconnect();
    }, []);






    const [smoothScale4, setSmoothScale4] = useState(0);
    const targetScaleRef4 = useRef(0);
    const raf4 = useRef(null);

    const [smoothOffset3, setSmoothOffset3] = useState(0);
    const targetOffsetRef3 = useRef(0);
    const rafOffset3 = useRef(null);

    const elegantRef = useRef(null);
    const [elegantHeight, setElegantHeight] = useState(0);


    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (elegantRef.current) {
                setElegantHeight(elegantRef.current.offsetHeight);
            }
        });
        if (elegantRef.current) resizeObserver.observe(elegantRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    if (flatsRef.current) {
        const scrollStart3 = 24000 + (flatsHeight - height) / 0.3; // точка старта после Flats
        if (scrollY < scrollStart3) {
            targetScaleRef4.current = 0;
        } else {
            targetScaleRef4.current = (scrollY - scrollStart3) / (viewport.height * 0.6);
        }
    }

    useEffect(() => {
        const animate4 = () => {
            setSmoothScale4(prev => {
                const diff = targetScaleRef4.current - prev;
                return Math.abs(diff) < 0.001 ? prev : prev + diff * 0.03;
            });
            raf4.current = requestAnimationFrame(animate4);
        };
        raf4.current = requestAnimationFrame(animate4);
        return () => cancelAnimationFrame(raf4.current);
    }, []);

    useEffect(() => {
        const scrollStart3 = 28000 + (flatsHeight - height) / 0.3 + 2000;
        const scrollSpeedFactor3 = 0.3;
        const scrollOffset3 = Math.max(0, (scrollY - scrollStart3) * scrollSpeedFactor3);
        const maxOffset3 = elegantHeight - height;
        const limitedOffset3 = Math.min(scrollOffset3, maxOffset3);
        targetOffsetRef3.current = limitedOffset3;
    }, [scrollY, height, flatsHeight]);

    useEffect(() => {
        const animateOffset3 = () => {
            setSmoothOffset3(prev => {
                const diff = targetOffsetRef3.current - prev;
                return Math.abs(diff) < 0.5 ? targetOffsetRef3.current : prev + diff * 0.04;
            });
            rafOffset3.current = requestAnimationFrame(animateOffset3);
        };
        rafOffset3.current = requestAnimationFrame(animateOffset3);
        return () => cancelAnimationFrame(rafOffset3.current);
    }, []);

    return (
        <div className={classes.animWrapper}>
            {/* SVG masks */}
            <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
                <defs>
                    <mask id="flowerMask1" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height * 2}>
                        <rect width={width} height={height * 2} fill="black" />
                        <g style={{
                            transform: `translate(${cx}px, ${cy}px) scale(${smoothScale1}) translate(-110px, -110px)`,
                            willChange: "transform"
                        }}>
                            <path d="
                M130,110
                A50,50 0 1 1 110,130
                A50,50 0 1 1 90,110
                A50,50 0 1 1 110,90
                A50,50 0 1 1 130,110
              " fill="white" />
                        </g>
                    </mask>

                    <mask
                        id="flowerMask2"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width={width}
                        height={height * 4}
                        maskType="alpha"
                    >
                        <rect width={width} height={height * 4} fill="black" />
                        {[...Array(6)].map((_, i) => {
                            const stripCount = 6;
                            const rectWidth = width / stripCount;
                            const offsetX = i * rectWidth;

                            const baseDelay = (Math.sin(i * 1) + 1) / 2;
                            const speedFactor = 0.15 + (Math.cos(i * 0.9) + 1) / 10;

                            const localProgress = Math.max(0, Math.min(1, (smoothScale2 - baseDelay) * speedFactor));
                            const translateY = (1 - localProgress) * height;

                            return (
                                <rect
                                    key={i}
                                    x={offsetX}
                                    y={0}
                                    width={rectWidth}
                                    height={height * 3}
                                    fill="white"
                                    transform={`translate(0, ${translateY})`}
                                />
                            );
                        })}
                    </mask>

                    <mask
                        id="flowerMask3"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width={width}
                        height={height * 4}
                        maskType="alpha"
                    >
                        <rect width={width} height={height * 4} fill="black" />
                        {[...Array(6)].map((_, i) => {
                            const stripCount = 6;
                            const rectWidth = width / stripCount;
                            const offsetX = i * rectWidth;

                            const baseDelay = (Math.sin(i * 1.7) + 1) / 2;
                            const speedFactor = 0.15 + (Math.cos(i * 0.8) + 1) / 10;

                            const localProgress = Math.max(0, Math.min(1, (smoothScale3 - baseDelay) * speedFactor));
                            const translateY = (1 - localProgress) * height;

                            return (
                                <rect
                                    key={i}
                                    x={offsetX}
                                    y={0}
                                    width={rectWidth}
                                    height={height * 3}
                                    fill="white"
                                    transform={`translate(0, ${translateY})`}
                                />
                            );
                        })}
                    </mask>

                    <mask
                        id="flowerMask4"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width={width}
                        height={height * 4}
                        maskType="alpha"
                    >
                        <rect width={width} height={height * 4} fill="black" />
                        {[...Array(6)].map((_, i) => {
                            const stripCount = 6;
                            const rectWidth = width / stripCount;
                            const offsetX = i * rectWidth;

                            const baseDelay = (Math.sin(i * 1.2) + 1) / 2;
                            const speedFactor = 0.15 + (Math.cos(i * 0.85) + 1) / 10;

                            const localProgress = Math.max(0, Math.min(1, (smoothScale4 - baseDelay) * speedFactor));
                            const translateY = (1 - localProgress) * height;

                            return (
                                <rect
                                    key={i}
                                    x={offsetX}
                                    y={0}
                                    width={rectWidth}
                                    height={height * 3}
                                    fill="white"
                                    transform={`translate(0, ${translateY})`}
                                />
                            );
                        })}
                    </mask>

                </defs>
            </svg>

            {/* Контент */}
            <div className={classes.wrapper}>
                <div className={classes.background}>

                    {/* 👇 Меняем фон в зависимости от этапа */}
                    {useFirstMask
                        ?
                        <>
                            <Header />
                            <Main_section />
                        </>
                        :
                        <Collection_section />}
                </div>

                <div
                    className={classes.maskedBlock}
                    style={{
                        mask: "url(#flowerMask1)",
                        WebkitMask: "url(#flowerMask1)",
                        zIndex: 5
                    }}
                >
                    <Collection_section reveal={scrollY >= 4500} />
                </div>

                <div
                    className={classes.maskedBlock}
                    style={{
                        transform: `translateY(${-smoothOffset}px)`,
                        willChange: 'transform',
                        mask: "url(#flowerMask2)",
                        WebkitMask: "url(#flowerMask2)",
                        zIndex: 6
                    }}
                >
                    <History_section shown={scrollY >= 11000} />
                </div>

                <div
                    ref={flatsRef}
                    className={classes.maskedBlock}
                    style={{
                        transform: `translateY(${-smoothOffset2}px) translateZ(0)`,
                        willChange: 'transform',
                        mask: "url(#flowerMask3)",
                        WebkitMask: "url(#flowerMask3)",
                        zIndex: 7
                    }}
                >
                    <Flats_section
                        scrollPos={scrollY}
                        shown={scrollY >= 19000}
                        scale={scrollY >= 22000 && scrollY <= 24600}
                        tower={scrollY >= 26500}
                    />
                </div>

                <div
                    ref={elegantRef}
                    className={classes.maskedBlock}
                    style={{
                        transform: `translateY(${-smoothOffset3}px) translateZ(0)`,
                        willChange: 'transform',
                        mask: "url(#flowerMask4)",
                        WebkitMask: "url(#flowerMask4)",
                        zIndex: scrollY >= 28000 ? 8 : 0
                    }}
                >
                    <Elegant_section
                        shown={scrollY >= 32000}
                        // contactShow={scrollY >= 37000}
                        // consultation={scrollY >= 40000}
                    />
                    <Contacts contactShow={scrollY >= 37000} />
                    <Consultation consultation={scrollY >= 40000} />
                </div>

            </div>
        </div>
    );
}

export default AnimatinTest;
