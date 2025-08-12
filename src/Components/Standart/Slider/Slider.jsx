import React, { useEffect, useRef, useState } from "react";
import classes from './Slider.module.css';
import { tr } from "framer-motion/client";

function Slider({ images = [], itemsPerSlide = 1, arrowsBottom = false, followMouse = false, shown, scale, handleHide, isMobile, moveMask = false, isSliderClicked, setIsSliderClicked }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

    const rafRef = useRef(null);

    const slideWidth = 100 / itemsPerSlide;
    const totalSlides = images.length;

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        setIsSliderClicked(true)
        // console.log(currentIndex)
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - itemsPerSlide));
        setIsSliderClicked(true)
    };


    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
        const centerX = window.innerWidth / 2;
        if (mousePos.x < centerX) {
            prevSlide();
        } else {
            nextSlide();
        }
    };

    const showLeft = followMouse && mousePos.x < window.innerWidth / 2;
    const showRight = followMouse && mousePos.x >= window.innerWidth / 2;

    useEffect(() => {
        if (!followMouse) return;

        const animate = () => {
            setHoverPos(prev => {
                const dx = mousePos.x - prev.x;
                const dy = mousePos.y - prev.y;
                return {
                    x: prev.x + dx * 0.1,
                    y: prev.y + dy * 0.1,
                };
            });
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [mousePos, followMouse]);

    const [delayedMoveMask, setDelayedMoveMask] = useState(false);

    useEffect(() => {
        if (moveMask) {
            const timer = setTimeout(() => {
                setDelayedMoveMask(true);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setDelayedMoveMask(false); // сброс, если moveMask=false
        }
    }, [moveMask]);

    return (
        <div
            className={classes.sliderBlock}
            onMouseMove={followMouse ? handleMouseMove : undefined}
            onClick={followMouse ? handleClick : undefined}
            style={{
                height: isMobile ? "100%" : 'auto'
            }}
        >
            <div className={classes.sliderContainer} style={{ height: arrowsBottom ? '85dvh' : isMobile ? "100%" : '100dvh' }}>
                <div className={`${classes.slider} ${(delayedMoveMask && !isSliderClicked) ? classes.moveMask : ""}`}>
                    <div
                        className={`${classes.slideTrack}`}
                        style={{
                            transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
                            paddingTop: !isMobile && arrowsBottom && '20px',
                        }}
                    >
                        {Array.from({ length: images.length - itemsPerSlide + 1 }, (_, slideIndex) => (
                            <div className={classes.slideGroup} key={slideIndex}>
                                {images
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((img, index) => (
                                        <div className={classes.slide} key={index}
                                            style={{
                                                maxWidth: `${slideWidth}%`,
                                                padding: itemsPerSlide > 1 ? '0px 10px 0 10px' : 0
                                            }}
                                        >
                                            <img src={`/${img}`} alt={`slide-${index}`} />
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {arrowsBottom && <div className={classes.bottomCloseBar} onClick={handleHide}></div>}

            {!followMouse && !arrowsBottom && (
                <>
                    <div className={classes.prevButton} onClick={prevSlide}>
                        <img src="/ArrowLeft.webp" alt="" />
                    </div>
                    <div className={classes.nextButton} onClick={nextSlide}>
                        <img src="/ArrowRight.webp" alt="" />
                    </div>
                </>
            )}

            {followMouse && scale && !isMobile && (
                <>
                    {showLeft && (
                        <div
                            className={`${classes.mouseArrow}`}
                            style={{
                                left: `${hoverPos.x}px`,
                                top: `${hoverPos.y}px`,
                                transform: `translate(-90%, -120%)`,
                                opacity: `${currentIndex <= 0 ? 0.2 : 1}`
                            }}
                        >
                            <img src="/ArrowLeft.webp" alt="left" />
                        </div>
                    )}
                    {showRight && (
                        <div
                            className={`${classes.mouseArrow}`}
                            style={{
                                left: `${hoverPos.x}px`,
                                top: `${hoverPos.y}px`,
                                transform: `translate(-90%, -120%)`,
                                opacity: `${currentIndex == totalSlides - 1 ? 0.2 : 1}`
                            }}
                        >
                            <img src="/ArrowRight.webp" alt="right" />
                        </div>
                    )}
                </>
            )}

            {!followMouse && arrowsBottom && (
                <div style={{ height: isMobile && '15dvh' }}>
                    <div
                        className={`${classes.prevButton} ${classes.bottomArrowLeft} ${shown ? classes.show : ""}`}
                        onClick={prevSlide}
                        style={{
                            bottom: isMobile ? '0px' : '-120px',
                            left: isMobile ? '15%' : '42%',
                            opacity: currentIndex <= 0 ? 0.4 : 1,
                            cursor: currentIndex <= 0 ? 'auto' : 'pointer',
                            height: isMobile && '15dvh',
                        }}
                    >
                        <img src="/ArrowLeftBottom.webp" alt=""
                            style={{
                                transform: isMobile && 'translate(0, 35%)'
                            }} />
                    </div>
                    <div
                        className={`${classes.nextButton} ${classes.bottomArrowRigth} ${shown ? classes.show : ""}`}
                        onClick={nextSlide}
                        style={{
                            bottom: isMobile ? '0px' : '-120px',
                            right: isMobile ? '15%' : '42%',
                            opacity: currentIndex >= images.length - itemsPerSlide ? 0.4 : 1,
                            cursor: currentIndex >= images.length - itemsPerSlide ? 'auto' : 'pointer',
                            height: isMobile && '15dvh',
                        }}
                    >
                        <img src="/ArrowRightBottom.webp" alt=""
                            style={{
                                transform: isMobile && 'translate(0, 35%)'
                            }} />
                    </div>
                </div>
            )}
        </div >
    );
}


export default Slider;
