import React, { useEffect, useRef, useState } from "react";
import classes from './Flats_section.module.css';
import Slider from "../../Standart/Slider/Slider";
import MosaicReveal from "../../../MosaicReveal";

function Flats_section({ children, shown, scale, tower, scrollPos, isMobile, mobileChange = false, flatsHistoryRef, flatSliderMovePosition, viewHeight = '100vh', useSectionMetrics, ...props }) {
    const sectionRef = useRef(null);
    const sectionNewRef = useRef(null);

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


    const [flatsTextInfoRef, flatsTextInfoMetrics] = useSectionMetrics({ margin: 0 });
    const [flatsImgProjectRef, flatsImgProjectMetrics] = useSectionMetrics({ margin: 0 });
    const [flatsRef, flatsMetrics] = useSectionMetrics({ margin: 0 });
    const [flatsTextInfoNewRef, flatsTextInfoNewMetrics] = useSectionMetrics({ margin: 0 });

    return (
        <>

            {isMobile ?
                <div className={classes.flatsImg}>
                    <div className={classes.flatsBlock}>
                        <div className={classes.flatsTitleMob}>Exquisite architecture</div>
                        <div className={classes.flatsDescMob}>
                            <span>Изысканная</span>
                            <span>архитектура</span>
                        </div>
                    </div>
                    <img src="/architecture.webp" alt="" />
                </div>
                :
                <div className={classes.flatsImg} style={{ height: viewHeight }}>
                    <div className={classes.flatsBlock}>
                        <div className={`${classes.flatsTitle} ${shown ? classes.show : ""}`}>Exquisite architecture</div>
                        <div className={classes.flatsDesc}>
                            <span className={`${shown ? classes.show : ""}`}>Изысканная</span>
                            <span className={`${shown ? classes.show : ""}`}>архитектура</span>
                        </div>
                    </div>
                </div>
            }

            <div ref={flatsTextInfoRef} className={classes.flatsTextInfo}>

                {/* <div className={classes.flatsTextInfo_img}>
                    <img src="/org1.webp" alt=""
                        className={`${classes.flatsTextInfo_img_icon} ${flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}`} />

                    <div className={classes.flatsTextInfo_imgOverlay}></div>

                    <img src="/org2.webp" alt=""
                        className={`${classes.flatsTextInfo_img_icon2} ${flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}`} />
                </div> */}

                <div className={`${classes.flatsTextInfo_descText} ${flatsTextInfoMetrics.progress >= 0.25 ? classes.show : ""}`}>
                    Жилой комплекс представляет собой однокорпусное здание высотой до 13 этажей.

                    <br />
                    <br />
                    Фасады до второго этажа облицованы гранитными плитами, что придаёт комплексу элегантный вид. Выше применена технология мокрого фасада с оштукатуриванием и рустовкой. Такая отделка эстетически привлекательна и функциональна — защищает здание от внешних воздействий.

                    <br />
                    <br />
                    Кровля наплавляемая и многослойная, что гарантирует надёжную защиту от влаги и других погодных условий.
                </div>

                <div className={classes.flatsTextInfo_underText}>
                    <div className={`${classes.flatsTextInfo_underText_right} ${flatsTextInfoMetrics.progress >= 0.35 ? classes.show : ""}`}>
                        Особое внимание уделяется качеству и надёжности строительства. Каркас и несущие конструкции «Времён года» выполнены из цельного бетона с армированием, что обеспечивает высокую прочность здания. Наружные стены и внутренние перегородки возведены с использованием кирпичной кладки или керамоблоков.
                    </div>
                </div>
            </div>

            <div style={{ overflow: isMobile && 'hidden', position: "relative" }}>
                {isMobile && <MosaicReveal targetRef={sectionNewRef} colors={["#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8"]} />}

                <div className={classes.flatsImgExt} ref={sectionNewRef} style={{ overflow: isMobile && 'hidden', position: "relative" }}>
                </div>
            </div>

            <div ref={flatsImgProjectRef} className={classes.flatsImgProject}>
                <div className={classes.flatsImgProject_inner}>
                    <img src="/project.webp" alt="" />
                    <div className={classes.flatsImgProject_overlay}>
                        {/* masterplan <br /> View */}
                    </div>
                </div>
                <div className={classes.flatsImgProject_text}>
                    <span className={`${flatsImgProjectMetrics.progress >= 0.25 ? classes.show : ""}`}>Обзор</span>
                    <span className={`${flatsImgProjectMetrics.progress >= 0.25 ? classes.show : ""}`}>проекта</span>
                </div>
            </div>

            <section
                ref={flatsRef}
                className={`${classes.flats} `} style={{ height: mobileChange ? viewHeight : 'auto' }}>

                <img src="/flats_logo.webp" alt="" className={flatsMetrics.progress >= 0.15 ? classes.show : ""} />

                <p className={`${classes.flatsText} ${flatsMetrics.progress >= 0.15 ? classes.show : ""}`}>
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

            <div
                ref={flatsTextInfoNewRef}
                className={classes.flatsTextInfo}>
                <div className={classes.flatsTextInfo_titleText}>
                    {/* <span className={`${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>интерьеры</span> */}
                    <span className={`${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>интерьеры</span>
                    <span className={`${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>общественных</span>
                    <span className={`${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>пространств</span>
                </div>

                <div className={classes.flatsTextInfo_underText}>
                    <div className={classes.flatsTextInfo_underText_block}>
                        <div className={`${classes.flatsTextInfo_underText_block_desc} ${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>
                            Мы стремимся к экологичности и комфорту. Поэтому в интерьерах общественных помещений клубного дома мы используем натуральные материалы, такие как дуб и мрамор в отделке, а также камень, дерево и кожу в элементах дизайна.
                        </div>
                        <div className={`${classes.flatsTextInfo_underText_block_desc} ${flatsTextInfoNewMetrics.progress >= 0.25 ? classes.show : ""}`}>
                            Это придает пространству теплоту и чувство единения с природой. Запахи, тактильные ощущения- все создано для гармоничного нахождения в доме с первого шага.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#fff', overflow: isMobile && 'hidden', position: "relative" }}>

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
                    <img src="/city.webp" alt="" />
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