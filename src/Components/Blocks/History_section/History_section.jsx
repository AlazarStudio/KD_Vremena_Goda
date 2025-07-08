import React from "react";
import classes from './History_section.module.css';

function History_section({ children, ...props }) {
    return (
        <section className={classes.history}>
            <div className={classes.history_info}>
                <p className={classes.nameLeft}>новая история</p>
                <p className={classes.nameRight}>старого города</p>
                <p className={classes.secontCenter}>A NEW HISTORY FOR THE OLD CITY</p>
                <div className={classes.doobleBlock}>
                    <p>
                        Проект навеян духом Старого города: сдержанная эстетика, благородные материалы, утончённый ритм.
                    </p>
                    <p>
                        В доме — ограниченное число квартир. Каждое пространство спроектировано как галерейный объект с определённой функцией: 
                        свет, покой, глубина. <br />
                        Это выбор тех, кто ценит уединение, тишину центра <br />
                        и продуманную архитектуру.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default History_section;