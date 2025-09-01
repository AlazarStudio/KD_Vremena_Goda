import React from "react";
import classes from './History_section.module.css';

function History_section({ children, shown, blockHeight, viewHeight, isMobile, ...props }) {
    return (
        <section className={classes.history} >
            {/* <div className={classes.history_info_before}></div> */}
            <div className={classes.history_info_block}>
                <div className={classes.history_info}>
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
                            Утро скользит по фасаду. <br />
                            Камень тёплый, даже в тени.<br />
                            Свет собирается в балконах.<br />
                            Линии дома. Всё складывается в ритм, <br /> который совпадает с твоим.
                        </p>
                        <p className={`${shown ? classes.showFromBot : ""}`}
                            style={{ transitionDelay: "0.6s" }}>
                            Внутреннее устройство без хаоса.<br />
                            Логика проходов.<br />
                            Чёткие зоны.<br />
                            Потенциал для мебели, уюта, воздуха.<br />
                            План, которому не нужно пояснений.
                        </p>
                    </div>
                </div>
            </div>

            <div className={classes.history_info_blockImg} style={{ height: viewHeight }}>
                <img src="/history_background.webp" alt="" />
            </div>

            <div className={classes.history_info_blockTime}>
                <div className={classes.history_info_blockTime_title}>
                    <div className={classes.line4}> Moscow’s Most Desirable <br /> Neighbourhood</div>
                    {isMobile ?
                        <div className={classes.mobileTitle}>
                            Время перемен и трансформаций
                        </div>
                        :
                        <>
                            <div className={classes.line1}>Время</div>
                            <div className={classes.line2}>перемен </div>
                            <div className={classes.line3}> и трансформаций</div>
                        </>
                    }
                </div>

                <div className={classes.history_info_blockTime_text}>
                    <div className={classes.history_info_blockTime_text_title}>Проект для тех, <br /> кто видит дальше</div>
                    <div className={classes.history_info_blockTime_text_info}>
                        <p>
                            Китай-город, один из старейших и исторически значимых районов Москвы, переживает глобальное преображение. Облик квартала, которому не уделялось должного внимания в последние десятилетия, изменяется благодаря продуманному плану масштабной реновации. Район становится новым центром притяжения столицы, гармонично сочетая роскошные жилые резиденции и уникальные общественные пространства.
                        </p>
                        <p>
                            Рестораны с авторской кухней, лаундж-зоны для отдыха, галереи и выставочные площадки органично вписываются в обновленный облик квартала и делают его идеальной городской средой для жизни, работы и отдыха.
                            <br />
                            <br />
                            Сердце трансформации района — проект Nicole, задающий пульс преобразования этой знаковой части Москвы.
                        </p>
                    </div>
                </div>

                <div className={classes.history_info_blockTime_img}>
                    <img src="/change.jpg" alt="" />
                </div>

            </div>

            <div className={classes.history_info_blockCircle}>
                <div className={classes.history_info_blockCircle_left}></div>
                <div className={classes.history_info_blockCircle_circle}>
                    <img src="/city.jpg" alt="" />
                </div>
                <div className={classes.history_info_blockCircle_text}>
                    <span>Знакомство</span>
                    <span> с районом</span>
                </div>
            </div>
        </section>
    );
}

export default History_section;