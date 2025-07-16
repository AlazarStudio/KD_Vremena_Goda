import React, { useEffect, useRef, useState } from "react";
import classes from './Slider.module.css';

function Slider({ images = [], itemsPerSlide = 1, arrowsBottom = false, followMouse = false, shown, scale }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

    const rafRef = useRef(null);

    const slideWidth = 100 / itemsPerSlide;
    const totalSlides = Math.ceil(images.length / itemsPerSlide);

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
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

    // console.log(followMouse, arrowsBottom, scale)

    return (
        <div
            className={classes.sliderBlock}
            onMouseMove={followMouse ? handleMouseMove : undefined}
            onClick={followMouse ? handleClick : undefined}
        >
            <div className={classes.sliderContainer} style={{ height: arrowsBottom ? '85dvh' : '100dvh' }}>
                <div className={classes.slider}>
                    <div
                        className={classes.slideTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {Array.from({ length: totalSlides }, (_, slideIndex) => (
                            <div className={classes.slideGroup} key={slideIndex}>
                                {images
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((img, index) => (
                                        <div className={classes.slide} key={index} style={{ width: slideWidth }}>
                                            <img src={`/${img}`} alt={`slide-${index}`} />
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

                {!followMouse && !arrowsBottom && (
                    <>
                        <div className={classes.prevButton} onClick={prevSlide}>
                            <img src="/ArrowLeft.png" alt="" />
                        </div>
                        <div className={classes.nextButton} onClick={nextSlide}>
                            <img src="/ArrowRight.png" alt="" />
                        </div>
                    </>
                )}

                {!followMouse && arrowsBottom && (
                    <>
                        <div className={`${classes.prevButton} ${classes.bottomArrowLeft}`} onClick={prevSlide}>
                            <img src="/ArrowLeftBottom.png" alt="" />
                        </div>
                        <div className={`${classes.nextButton} ${classes.bottomArrowRigth}`} onClick={nextSlide}>
                            <img src="/ArrowRightBottom.png" alt="" />
                        </div>
                    </>
                )}

                {followMouse && scale && (
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
                                <img src="/ArrowLeft.png" alt="left" />
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
                                <img src="/ArrowRight.png" alt="right" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div >
    );
}


export default Slider;
