import React, { useRef, useState } from "react";
import classes from './Elegant_section.module.css';
import Slider from "../../Standart/Slider/Slider";

function Elegant_section({ shown, isMobile }) {
    let images = [
        "Slider2 - img1.png",
        "Slider2 - img2.png",
        "Slider2 - img3.png",
        "Slider2 - img4.png",
        "Slider2 - img5.png",
        "Slider2 - img6.png",
        "Slider2 - img7.png",
        "Slider2 - img8.png",
    ];

    const [radius, setRadius] = useState(0);
    const [circlePos, setCirclePos] = useState({ cx: "50%", cy: "100%" });
    const [isMasking, setIsMasking] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const buttonRef = useRef(null);

    const raf = useRef(null);

    const animate = () => {
        const diff = targetRef.current - currentRef.current;

        if (Math.abs(diff) < 1) {
            currentRef.current = targetRef.current;
            setRadius(currentRef.current);
            return;
        }

        const speed = diff > 0 ? 0.02 : 0.03;
        currentRef.current += diff * speed;

        setRadius(currentRef.current);
        raf.current = requestAnimationFrame(animate);
    };

    const startAnimationTo = (target) => {
        targetRef.current = target;
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(animate);
    };

    const waitForScrollAndReveal = () => {
        const checkScroll = () => {
            if (Math.round(window.scrollY) == 34000) {
                setTimeout(() => {
                    let cx = 0;
                    let cy = 0;

                    if (buttonRef.current) {
                        const rect = buttonRef.current.getBoundingClientRect();
                        cx = rect.left + rect.width / 2;
                        cy = rect.top + rect.height / 2;
                    }

                    document.body.style.overflow = "hidden";
                    setCirclePos({ cx, cy });
                    startAnimationTo(1600);
                    setIsClosing(false);
                    setIsMasking(true);
                    setIsOpened(true)
                }, 500)
            } else {
                requestAnimationFrame(checkScroll);
            }
        };

        window.scrollTo({ top: 34000 });
        requestAnimationFrame(checkScroll);
    };


    const handleReveal = (e) => {
        waitForScrollAndReveal();
    };

    const handleHide = () => {
        document.body.style.overflow = "";
        setIsMasking(false);
        setIsClosing(true);
        setTimeout(() => setIsClosing(false), 1200)
        startAnimationTo(0);
        setIsOpened(false)
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.topBlock}>
                <div className={classes.startBlock}>
                    <div className={classes.startBlock_item}>
                        <p className={`${shown ? classes.show : ""}`}>элегантные <br />интерьеры</p>
                        <p className={`${shown ? classes.show : ""}`}>ELEGANT INTERIORS</p>
                    </div>
                </div>
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
            // onClick={handleHide}
            >
                <div className={classes.exitButon} onClick={handleHide}>
                    <img src="/close.png" alt="" />
                </div>
                <Slider images={images} itemsPerSlide={3} arrowsBottom={true} shown={isOpened} handleHide={handleHide} />
            </div>

            {/* КНОПКА, поверх всего */}
            <div className={`${classes.floatingButton} ${!isMasking && shown ? classes.showBTN : ""}`}>
                <div className={`${classes.circleBlock} ${isClosing && classes.circleBlockBg}`} onClick={handleReveal}>
                    <img
                        src="/ArrowRightBottom.png"
                        alt=""
                        className={`${classes.floatingButtonImg}`}
                        ref={buttonRef}
                    />
                </div>
            </div>

        </div>
    );
}

export default Elegant_section;
