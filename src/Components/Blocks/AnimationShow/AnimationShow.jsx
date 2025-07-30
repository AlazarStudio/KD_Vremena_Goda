import React, { useEffect, useRef, useState } from "react";
import classes from './AnimationShow.module.css';
import Header from "../Header/Header";
import Main_section from "../Main_section/Main_section";
import Collection_section from "../Collection_section/Collection_section";
import History_section from "../History_section/History_section";

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


function AnimationShow() {
    const topRef = useRef(null);
    const smoothRadius = useRef(createSmoothDriver(0, 0.12)).current;

    useEffect(() => {
        const onScroll = () => {
            const scrollEnd = window.innerHeight * 2; // когда скролл >= этого значения — цветок раскрыт полностью
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / (scrollEnd * 1.5), 1); // clamp от 0 до 1

            const maxRadius = 1600; // максимальный радиус круга
            smoothRadius.set(progress * maxRadius);
        };

        const unsubscribe = smoothRadius.onUpdate(r => {
            if (topRef.current) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2 - 50;

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
    

    useEffect(() => {
        const onScroll = () => {
            const scrollStart = 2500; // момент начала анимации
            const scrollEnd = scrollStart + window.innerHeight;
            const scrollY = window.scrollY;

            const progress = Math.min(Math.max((scrollY - scrollStart) / (scrollEnd - scrollStart), 0), 1);
            const maxOffset = window.innerHeight;
            smoothRectOffset.set(progress * maxOffset);

            if (progress >= 1) {
                setIsUnpinned(true); // раскрылся — отпускаем
            } else if (progress < 1) {
                setIsUnpinned(false); // если прокрутили обратно — снова фиксируем
            }
        };

        const unsubscribe = smoothRectOffset.onUpdate(offset => {
            if (historyMaskRef.current) {
                const count = 6;
                const rects = [];
                const rectWidth = window.innerWidth / count;
                const height = window.innerHeight;
                const progress = offset / height;

                const scaledProgress = progress * 7; // ⬅ ключевая строчка

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



        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            unsubscribe();
        };
    }, []);


    return (
        <div className={classes.wrapper}>
            <div className={classes.bottom}>
                <Header />
                <Main_section />
            </div>

            <div className={classes.top} ref={topRef}>
                <Collection_section reveal={true} />
            </div>
            
            <div className={classes.history} ref={historyMaskRef} >
                <History_section shown={true} />
            </div>


        </div>
    );
}

export default AnimationShow;
