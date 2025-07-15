import React from "react";
import classes from './History_section.module.css';

function History_section({ children, shown, ...props }) {
    return (
        <section className={classes.history}>
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
                        Проект навеян духом Старого города: сдержанная эстетика, благородные материалы, утончённый ритм.
                    </p>
                    <p className={`${shown ? classes.showFromBot : ""}`}
                        style={{ transitionDelay: "0.6s" }}>
                        В доме — ограниченное число квартир. Каждое пространство спроектировано как галерейный объект с определённой функцией:
                        свет, покой, глубина. <br />
                        Это выбор тех, кто ценит уединение, тишину центра <br />
                        и продуманную архитектуру.
                    </p>
                </div>
            </div>
            <img src="/history_background.png" alt="" className={classes.history_bottomImg} />
        </section>
    );
}

export default History_section;