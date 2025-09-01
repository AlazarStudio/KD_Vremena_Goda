import React, { useEffect, useRef, useState } from "react";
import classes from './Elegant_section_mobile.module.css';
import Slider from "../../Standart/Slider/Slider";
import MosaicReveal from "../../../MosaicReveal";

function Elegant_section_mobile({ shown, isMobile, targetScroll, viewHeight = '100vh' }) {
    const sectionRef = useRef(null);

    let images = [
        "Slider2 - img1.webp",
        "Slider2 - img2.webp",
        "Slider2 - img3.webp",
        "Slider2 - img4.webp",
        "Slider2 - img5.webp",
        "Slider2 - img6.webp",
        "Slider2 - img7.webp",
        "Slider2 - img8.webp",
    ];

    const [radius, setRadius] = useState(0);
    const [circlePos, setCirclePos] = useState({ cx: "50%", cy: "100%" });
    const [isMasking, setIsMasking] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isOpenedToMove, setIsOpenedToMove] = useState(false);

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
        let scrollPosition = isMobile ?
            (targetScroll ? targetScroll : 4000)
            :
            34000

        const checkScroll = () => {
            if (true) {
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
                }, 0)
            } else {
                requestAnimationFrame(checkScroll);
            }
        };

        window.scrollTo({ top: scrollPosition });
        requestAnimationFrame(checkScroll);
    };


    const handleReveal = (e) => {
        waitForScrollAndReveal();
        setTimeout(() => { setIsOpenedToMove(true) }, 800)
    };

    const handleHide = () => {
        document.body.style.overflow = "";
        setIsMasking(false);
        setIsClosing(true);
        setIsClosing(false);
        startAnimationTo(0);
        setIsOpened(false)
        setIsOpenedToMove(false)
    };

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!isOpenedToMove) {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, 1000); // скрываем через 1 сек

            return () => clearTimeout(timeout);
        } else {
            setVisible(true); // показываем сразу при открытии
        }
    }, [isOpenedToMove]);

    return (
        <div className={classes.mainBlock} >
            {/* {isMobile && <MosaicReveal targetRef={sectionRef} heightWant={'100px'} />} */}

            <div className={classes.wrapper} ref={sectionRef} style={{ height: viewHeight }}>
                <div className={`${classes.topBlock} ${isOpenedToMove ? classes.moveRight : ""}`} style={{ height: viewHeight }}>
                    <div className={classes.startBlock}  style={{ height: viewHeight }}>
                        <div className={classes.startBlock_item}>
                            <p className={`${shown ? classes.show : ""}`}>элегантные <br />интерьеры</p>
                            <p className={`${shown ? classes.show : ""}`}>ELEGANT INTERIORS</p>
                        </div>
                    </div>
                </div>

                <div
                    className={`${classes.maskedBlock}`}
                    style={{
                        pointerEvents: radius > 0 ? "all" : "none",
                        zIndex: 0,
                        display: visible ? "flex" : "none",
                    }}
                >
                <div className={classes.exitButon} onClick={handleHide}>
                    <img src="/close.webp" alt="" />
                </div>
                <Slider isMobile={isMobile} images={images} itemsPerSlide={isMobile ? 1 : 3} arrowsBottom={true} shown={isOpened} handleHide={handleHide} />

            </div>

            {/* КНОПКА, поверх всего */}
            <div className={`${classes.floatingButton} ${!isMasking && shown ? classes.showBTN : ""}`}>
                <div className={`${classes.circleBlock} ${isClosing && classes.circleBlockBg}`} onClick={handleReveal}>
                    <img
                        src="/ArrowRightBottom.webp"
                        alt=""
                        className={`${classes.floatingButtonImg}`}
                        ref={buttonRef}
                    />
                </div>
            </div>
        </div>
        </div >
    );
}

export default Elegant_section_mobile;
