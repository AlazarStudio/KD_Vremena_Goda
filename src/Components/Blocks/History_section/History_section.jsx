import React, { useEffect, useRef, useState } from "react";
import classes from './History_section.module.css';
import MosaicReveal from "../../../MosaicReveal";

function History_section({ children, shown, blockHeight, viewHeight, isMobile, useSectionMetrics, ...props }) {
    const [historyHostRef, historyMetrics] = useSectionMetrics({ margin: 0 });
    const [historyPlaceRef, historyPlaceMetrics] = useSectionMetrics({ margin: 0 });

    const sectionRef = useRef(null);
    return (
        <section className={classes.history} >
            {/* <div className={classes.history_info_before}></div> */}
            <div className={classes.history_info_block} style={{ height: isMobile ? "500px" : viewHeight }}>
                <div className={classes.history_info} style={{ paddingTop: isMobile ? "0px" : "50px" }}>
                    <p className={`${classes.nameLeft} ${shown ? classes.show : ""}`}
                        style={{ transitionDelay: "0.3s" }}>
                        новая история
                    </p>
                    <p className={`${classes.nameRight} ${shown ? classes.show : ""}`}
                        style={{ transitionDelay: "0.3s" }}>
                        старого города
                    </p>
                    <p className={`${classes.secontCenter} ${shown ? classes.showFromBot : ""}`}
                        style={{ transitionDelay: "0.4s" }}>
                        A NEW HISTORY FOR THE OLD CITY
                    </p>
                    <div className={classes.doobleBlock}>
                        <p className={`${shown ? classes.showFromBot : ""}`}
                            style={{ transitionDelay: "0.4s" }}>
                            Клубный дом «Времена года» в Черкесске – это воплощение комфорта и элегантности, гармонично сочетающее современный дизайн с природными мотивами. Это не просто жилой комплекс, а настоящее сообщество, где каждый житель найдет для себя что-то особенное
                        </p>
                        <p className={`${shown ? classes.showFromBot : ""}`}
                            style={{ transitionDelay: "0.6s" }}>
                            Здесь каждый день наполнен уютом, что делает клубный дом «Времена года» идеальным местом для жизни в Черкесске.
                        </p>
                    </div>
                </div>
            </div>

            <div className={classes.history_info_blockImg} style={{ height: isMobile ? "500px" : viewHeight }}>
                <img src="/history_background.webp" alt="" />
            </div>

            <div ref={historyHostRef} className={classes.history_info_blockTime}>
                <div className={classes.history_info_blockTime_title}>
                    <div
                        className={
                            `
                            ${classes.line4} 
                            ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}
                            `
                        }>
                        Cherkessk’s Most Desirable <br /> Neighbourhood
                    </div>
                    {isMobile ?
                        <div className={`${classes.mobileTitle} ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}`}>
                            Золотой квартал города
                        </div>
                        :
                        <>
                            <div
                                className={
                                    `
                                    ${classes.line1} 
                                    ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}
                                    `
                                }>
                                Золотой
                            </div>
                            <div
                                className={
                                    `
                                    ${classes.line2} 
                                    ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}
                                    `
                                }>
                                квартал
                            </div>
                            <div
                                className={
                                    `
                                    ${classes.line3} 
                                    ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}
                                    `
                                }>
                                города
                            </div>
                        </>
                    }
                </div>

                <div className={classes.history_info_blockTime_text}>
                    <div className={`
                            ${classes.history_info_blockTime_text_title}
                            ${historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}
                        `}>
                        Уникальное <br /> расположение
                    </div>
                    <div className={classes.history_info_blockTime_text_info}>
                        <p className={historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}>
                            Одно из главных преимуществ клубного дома «Времена года» - уникальное расположение в, так называемом, «золотом квартале» Черкесска.

                            <br />
                            <br />
                            Прогуливаясь по улицам «золотого квартала», можно ощутить особую атмосферу уюта и благополучия, которая делает этот район одним из самых желанных мест для проживания в Черкесске
                        </p>
                        <p className={historyMetrics.progress >= 0.15 ? classes.showFromBot : ""}>
                            Это живописный и престижный район в центре города, который привлекает внимание удобством и элитностью. В «золотом квартале» есть место и парковым зонам, и социальным учреждениям. Здесь также расположены уютные кафе, магазины и развлекательные центры.
                        </p>
                    </div>
                </div>

                <div style={{overflow: isMobile && 'hidden', position: "relative", width: '100%' }}>
                    {isMobile && <MosaicReveal targetRef={sectionRef} colors={["#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8", "#fff8e8"]} />}
                    <div ref={sectionRef} className={classes.history_info_blockTime_img}>
                        <img src="/change.webp" alt="" />
                    </div>
                </div>
            </div>

            <div ref={historyPlaceRef} className={classes.history_info_blockCircle}>
                <div className={classes.history_info_blockCircle_left}></div>
                <div className={classes.history_info_blockCircle_circle}>
                    <img src="/city.webp" alt="" />
                </div>
                <div className={classes.history_info_blockCircle_text}>
                    <span className={historyPlaceMetrics.progress >= 0.15 ? classes.showFromBot : ""}>Знакомство</span>
                    <span className={historyPlaceMetrics.progress >= 0.15 ? classes.showFromBot : ""}> с районом</span>
                </div>
            </div>
        </section>
    );
}

export default History_section;