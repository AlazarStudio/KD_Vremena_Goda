import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimatinTest.module.css";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import Main_section from "../../Blocks/Main_section/Main_section";


function AnimatinTest() {
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
    const revealCollectionNew = scrollY >= viewport.height * 8;

    const [enableCountScroll, setEnableCountScroll] = useState(false);

    useEffect(() => {
        if (revealCollectionNew && !enableCountScroll) {
            setEnableCountScroll(true);
        } else {
            setEnableCountScroll(false);
        }
    }, [revealCollectionNew]);

    return (
        <>
            <div className={classes.animWrapper}>
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
                            height={height * 2}
                        >
                            <rect width={width} height={height * 2} fill="black" />

                            {[
                                { dur: 0.7, delay: 0 },
                                { dur: 0.3, delay: 0 },
                                { dur: 0.5, delay: 0 },
                                { dur: 0.6, delay: 0 },
                                { dur: 0.2, delay: 0 },
                                { dur: 0.4, delay: 0 },
                            ].map(({ dur, delay }, i) => {
                                const rectWidth = width / 6;
                                return (
                                    <rect
                                        key={i}
                                        x={i * rectWidth}
                                        y="0"
                                        width={rectWidth}
                                        height="600"
                                        fill="white"
                                    >
                                        <animate
                                            attributeName="y"
                                            from="0"
                                            to="-600"
                                            dur={`${dur}s`}
                                            begin={`${delay}s`}
                                            fill="freeze"
                                        />
                                    </rect>
                                );
                            })}
                        </mask>
                    </defs>
                </svg>





                <div className={classes.wrapper}>
                    <div className={classes.background}>
                        <Main_section />
                    </div>

                    <div
                        className={classes.maskedBlock}
                        style={{
                            mask: "url(#flowerMask)",
                            WebkitMask: "url(#flowerMask)",
                        }}
                    >
                        <Collection_section reveal={revealCollection} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default AnimatinTest;
