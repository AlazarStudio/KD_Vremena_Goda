import React from "react";
import classes from './History_section.module.css';

function History_section({ children, shown, blockHeight, viewHeight='1700px',...props }) {
    return (
        <section className={classes.history} style={{ height: viewHeight }}>
            <div className={classes.history_info_before}></div>
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
            <img src="/history_background.webp" alt="" className={classes.history_bottomImg} />
            <img src="/history_background_mobile.webp" alt="" className={classes.history_bottomImg1} />
        </section>
    );
}

export default History_section;