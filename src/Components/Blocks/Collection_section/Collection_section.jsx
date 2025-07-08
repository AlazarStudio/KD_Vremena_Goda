import React from "react";
import classes from './Collection_section.module.css';

function Collection_section({ children, ...props }) {
    return (
        <section className={classes.collection}>
            <p className={classes.top}>A collection of spaces in a clubhouse in the city center</p>
            <p className={classes.name}>Коллекция пространств</p>
            <p className={classes.name}>в клубном доме</p>
            <p className={classes.name}>в центре города</p>
            <p className={classes.middle}>
                Вдохновленный архитектурой Старого города, наш дом сочетает эстетику, тишину и статус. <br />
                Всего несколько квартир. Каждая — как самостоятельный объект коллекции: <br />
                LIGHT / CALM / FLOW / INNER.
            </p>
            <p className={classes.bottom}>Это не просто жильё. Это адрес, который говорит за вас.</p>
        </section>
    );
}

export default Collection_section;