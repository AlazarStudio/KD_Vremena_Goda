import React, { useState } from "react";
import classes from './Slider.module.css';

function Slider({ images = [], itemsPerSlide = 1, arrowsBottom = false }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 100 / itemsPerSlide;

    const totalSlides = Math.ceil(images.length / itemsPerSlide);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    return (
        <div className={classes.sliderBlock}>
            <div className={classes.sliderContainer} style={{height: arrowsBottom ? '85dvh' : '100dvh'}}>
                <div className={classes.slider}>
                    <div
                        className={classes.slideTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {/* Группируем по itemsPerSlide */}
                        {Array.from({ length: totalSlides }, (_, slideIndex) => (
                            <div className={classes.slideGroup} key={slideIndex}>
                                {images
                                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                    .map((img, index) => (
                                        <div className={classes.slide} key={index}  style={{width: slideWidth}}>
                                            <img src={`/${img}`} alt={`slide-${index}`}/>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

                {!arrowsBottom &&
                    <>
                        <div className={classes.prevButton} onClick={prevSlide}>
                            <img src="/ArrowLeft.png" alt="" />
                        </div>
                        <div className={classes.nextButton} onClick={nextSlide}>
                            <img src="/ArrowRight.png" alt="" />
                        </div>
                    </>
                }
            </div>

            {arrowsBottom && <>
                <div className={`${classes.prevButton} ${classes.bottomArrowLeft}`} onClick={prevSlide}>
                    <img src="/ArrowLeftBottom.png" alt="" />
                </div>
                <div className={`${classes.nextButton} ${classes.bottomArrowRigth}`} onClick={nextSlide}>
                    <img src="/ArrowRightBottom.png" alt="" />
                </div>
            </>
            }
        </div>
    );
}

export default Slider;
