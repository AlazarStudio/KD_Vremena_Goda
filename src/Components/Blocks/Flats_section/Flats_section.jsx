import React, { useEffect, useState } from "react";
import classes from './Flats_section.module.css';
import Slider from "../../Standart/Slider/Slider";

function Flats_section({ children, shown, scale, tower, scrollPos, isMobile, mobileChange = false, flatsHistoryRef, flatSliderMovePosition, ...props }) {
    let images = [
        "Slider1 - img1.webp",
        "Slider1 - img2.webp",
        "Slider1 - img3.webp",
        "Slider1 - img4.webp",
        "Slider1 - img5.webp",
        "Slider1 - img6.webp",
    ];

    const [movePos, setMovePos] = useState(0);

    useEffect(() => {
        if (scrollPos >= flatSliderMovePosition && scrollPos <= flatSliderMovePosition + 800 && !isMobile) {
            window.scrollTo({ top: flatSliderMovePosition + 511 });
            setMovePos(true)
        } else {
            setMovePos(false)
        }
    }, [scrollPos]);

    const [isSliderClicked, setIsSliderClicked] = useState(false);


    return (
        <>
            <section
                className={`${classes.flats} `} style={{ height: mobileChange ? '100vh' : 'auto' }}>
                <img src="/flats_logo.webp" alt="" className={`${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }} />

                <p className={`${classes.flatsText} ${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.6s" }}>
                    От первого шага — к вашему пространству
                </p>

                <section className={`${classes.flatsSlider}`} style={{
                    height: mobileChange && '100%'
                }}>
                    <div
                        className={`${classes.flatsSlider_mask} ${(movePos && !isSliderClicked) ? classes.showMask : ""}`}
                        style={{ transitionDelay: "1.6s" }}
                    ></div>
                    <div className={classes.forSlider} style={{
                        transform: !isMobile ? (movePos ? 'scale(1) translateX(0) ' : 'scale(0.9) translateY(-100px) ') : (scale ? 'scale(1) translateX(0) ' : 'scale(1) translateY(0px) '),
                        height: mobileChange && '100%'
                    }} >
                        <Slider images={images} followMouse={true} shown={shown} scale={scale} isMobile={isMobile} moveMask={movePos} isSliderClicked={isSliderClicked} setIsSliderClicked={setIsSliderClicked} />
                    </div>
                </section>
            </section>

            <div style={{ backgroundColor: '#fff' }}>
                <section className={classes.flatsHistory} ref={flatsHistoryRef}>
                    <img src="/tower.webp" alt="" className={`${classes.moveTower} ${tower ? classes.show : ""}`} />

                    <p className={`${classes.flatsHistory_name} ${tower ? classes.show : ""}`}>
                        Квартиры, которые становятся
                    </p>
                    <p className={`${classes.flatsHistory_name_second} ${tower ? classes.show : ""}`}>
                        частью  вашей истории
                    </p>

                    <p className={`${classes.flatsHistory_name_mobile} ${tower ? classes.show : ""}`}>
                        Квартиры, которые становятся частью  вашей истории
                    </p>

                    <div className={classes.flatsHistory_main}>
                        <div className={classes.flatsHistory_statistic}>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.4s" }}>12</p>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.5s" }}>
                                    ЭТАЖЕЙ
                                </p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.5s" }}>4</p>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.6s" }}>
                                    ПОДЪЕЗДА
                                </p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.6s" }}>190</p>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.7s" }}>КВАРТИР</p>
                            </div>
                        </div>
                        <div className={classes.flatsHistory_statistic}>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.7s" }}>64</p>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.8s" }}>подземный <br /> паркинг</p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.8s" }}>86</p>
                                <p className={`${tower ? classes.show : ""}`}
                                    style={{ transitionDelay: "0.9s" }}>НАземный <br /> паркинг</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Flats_section;