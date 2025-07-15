import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimatinTest.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import Header from "../../Blocks/Header/Header";
import History_section from "../../Blocks/History_section/History_section";

function AnimatinTest() {
    const [scrollY, setScrollY] = useState(0);
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [smoothScale1, setSmoothScale1] = useState(0);
    const [smoothScale2, setSmoothScale2] = useState(0);

    const targetScaleRef1 = useRef(0);
    const targetScaleRef2 = useRef(0);
    const hasTriggeredSecond = useRef(false);

    const raf1 = useRef(null);
    const raf2 = useRef(null);

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

                    <mask id="flowerMask2" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height * 2}>
                        <rect width={width} height={height * 2} fill="black" />
                        <g style={{
                            transform: `translate(${cx}px, ${cy}px) scale(${smoothScale2}) translate(-110px, -110px)`,
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
                </defs>
            </svg>

            {/* Контент */}
            <div className={classes.wrapper}>
                <div className={classes.background}>
                    {/* <Header /> */}
                    {/* 👇 Меняем фон в зависимости от этапа */}
                    {useFirstMask ? <Main_section /> : <Collection_section />}
                </div>

                {/* Маска 1 — показывает Collection поверх Main */}
                {useFirstMask && (
                    <div
                        className={classes.maskedBlock}
                        style={{
                            mask: "url(#flowerMask1)",
                            WebkitMask: "url(#flowerMask1)",
                        }}
                    >
                        <Collection_section reveal={scrollY >= 4000}/>
                    </div>
                )}

                {/* Маска 2 — показывает History поверх Collection */}
                 (
                    <div
                        className={classes.maskedBlock}
                        style={{
                            mask: "url(#flowerMask2)",
                            WebkitMask: "url(#flowerMask2)",
                            // pointerEvents: scrollY >= 9500 ? "auto" : "none",
                            transition: "opacity 0.5s ease",
                        }}
                    >
                        <History_section shown={scrollY >= 9500} />
                    </div>
                )
            </div>
        </div>
    );
}

export default AnimatinTest;
