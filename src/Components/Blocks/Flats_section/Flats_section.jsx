import React, { useEffect, useRef, useState } from "react";
import classes from './Flats_section.module.css';
import Slider from "../../Standart/Slider/Slider";
import MosaicReveal from "../../../MosaicReveal";

function Flats_section({ children, shown, scale, tower, scrollPos, isMobile, mobileChange = false, flatsHistoryRef, flatSliderMovePosition, viewHeight = '100vh', ...props }) {
    const sectionRef = useRef(null);

    let images = [
        "Slider1 - img1.webp",
        "Slider1 - img2.webp",
        "Slider1 - img3.webp",
        "Slider1 - img4.webp",
        "Slider1 - img5.webp",
        "Slider1 - img6.webp",
    ];

    const [movePos, setMovePos] = useState(0);

    // useEffect(() => {
    //     if (scrollPos >= flatSliderMovePosition + viewHeight && scrollPos <= flatSliderMovePosition + viewHeight + 800 && !isMobile) {
    //         window.scrollTo({ top: flatSliderMovePosition + 511 });
    //         setMovePos(true)
    //     } else {
    //         setMovePos(false)
    //     }
    // }, [scrollPos]);

    const [isSliderClicked, setIsSliderClicked] = useState(false);

    return (
        <>

            {isMobile ?
                <div className={classes.flatsImg}>
                    <div className={classes.flatsBlock}>
                        <div className={classes.flatsTitle}>Exquisite architecture</div>
                        <div className={classes.flatsDesc}>Изысканная <br /> архитектура</div>
                    </div>
                    <img src="/architecture.jpg" alt="" />
                </div>
                :
                <div className={classes.flatsImg} style={{ height: viewHeight }}>
                    <div className={classes.flatsBlock}>
                        <div className={classes.flatsTitle}>Exquisite architecture</div>
                        <div className={classes.flatsDesc}>Изысканная архитектура</div>
                    </div>
                </div>
            }

            <div className={classes.flatsTextInfo}>
                <div className={classes.flatsTextInfo_img}>
                    <img src="/org1.webp" alt="" />
                    <div className={classes.flatsTextInfo_imgOverlay}></div>
                    <img src="/org2.webp" alt="" />
                </div>

                <div className={classes.flatsTextInfo_descText}>
                    Два архитектурных бюро с мировыми именами — Heatherwick Studio и Paris Classical Architecture — направили весь свой опыт и талант на создание неповторимой архитектуры Nicole. Впервые прошлое и будущее гармонично соединятся в проекте подобного масштаба не только в России, но и в мире
                </div>

                <div className={classes.flatsTextInfo_underText}>
                    <div className={classes.flatsTextInfo_underText_right}>
                        Уникальный архитектурный объект, не имеющий аналогов и переворачивающий представления о недвижимости высочайшего класса Москвы.
                    </div>
                </div>
            </div>

            <div className={classes.flatsImgExt}>
            </div>

            <div className={classes.flatsImgProject}>
                <div className={classes.flatsImgProject_inner}>
                    <img src="/project.jpg" alt="" />
                    <div className={classes.flatsImgProject_overlay}>
                        masterplan <br /> View
                    </div>
                </div>
                <div className={classes.flatsImgProject_text}>
                    <span>Обзор</span>
                    <span>проекта</span>
                </div>
            </div>

            <section
                className={`${classes.flats} `} style={{ height: mobileChange ? viewHeight : 'auto' }}>
                <img src="/flats_logo.webp" alt="" className={`${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.2s" }} />

                <p className={`${classes.flatsText} ${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.3s" }}>
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
                        transform: !isMobile ? (movePos ? 'scale(1) translateX(0) ' : 'scale(1) translateY(0px) ') : (scale ? 'scale(1) translateX(0) ' : 'scale(1) translateY(0px) '),
                        height: mobileChange && '100%'
                    }} >
                        <Slider images={images} followMouse={true} shown={shown} scale={scale} isMobile={isMobile} moveMask={movePos} isSliderClicked={isSliderClicked} setIsSliderClicked={setIsSliderClicked} />
                    </div>
                </section>
            </section>

            <div className={classes.flatsTextInfo}>
                <div className={classes.flatsTextInfo_titleText}>
                    <span>Выдающиеся</span>
                    <span>интерьеры</span>
                    <span>общественных</span>
                    <span>пространств</span>
                </div>

                <div className={classes.flatsTextInfo_underText}>
                    <div className={classes.flatsTextInfo_underText_block}>
                        <div className={classes.flatsTextInfo_underText_block_desc}>
                            Общественные пространства Nicole — это настоящие произведения искусства от двух ведущих мировых дизайнерских бюро. Концепцию Nicole Club и Nicole Residence разработала компания Hirsch Bedner Associates (HBA), создающая интерьеры для таких люксовых отелей, как Six Senses и Ritz Carlton.
                        </div>
                        <div className={classes.flatsTextInfo_underText_block_desc}>
                            Студия Coho Interior Design, известная изысканным французским стилем и глубоким пониманием высокой эстетики, спроектировала общественные и приватные зоны Nicole Collection, опираясь на тонкое восприятие культурного контекста.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#fff',  overflow: isMobile && 'hidden', position: "relative" }}>

                {isMobile && <MosaicReveal targetRef={sectionRef} colors={["#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8"]} />}

                <div ref={sectionRef}>
                    <img src="/tower.webp" alt="" className={`${classes.moveTower} ${tower ? classes.show : ""}`} style={{ zIndex: '99' }} />
                    <section className={classes.flatsHistory} ref={flatsHistoryRef} style={{ height: viewHeight }}>

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
            </div>

            {/* {isMobile && <div className={classes.history_info_blockCircle}>
                <div className={classes.history_info_blockCircle_left}></div>
                <div className={classes.history_info_blockCircle_circle}>
                    <img src="/city.jpg" alt="" />
                </div>
                <div className={classes.history_info_blockCircle_text}>
                    <span>Знакомство</span>
                    <span> с районом</span>
                </div>
            </div>
            } */}
        </>
    );
}

export default Flats_section;