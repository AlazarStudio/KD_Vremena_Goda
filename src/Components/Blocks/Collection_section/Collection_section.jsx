import React from "react";
import classes from "./Collection_section.module.css";

function Collection_section({ reveal }) {
    return (
        <section className={classes.collection}>
            <p
                className={`${classes.top} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.4s" }}
            >
                A collection of spaces in a clubhouse in the city center
            </p>
            <p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.3s" }}
            >
                Коллекция пространств
            </p>
            <p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.3s" }}
            >
                в клубном доме
            </p>
            <p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.3s" }}
            >
                в центре города
            </p>
            <p
                className={`${classes.middle} ${reveal ? classes.showRevers : ""}`}
                style={{ transitionDelay: "0.4s" }}
            >
                Вдохновленный архитектурой Старого города, наш дом сочетает эстетику,
                тишину и статус. <br />
                Всего несколько квартир. Каждая — как самостоятельный объект
                коллекции: <br />
                LIGHT / CALM / FLOW / INNER.
            </p>
            <p
                className={`${classes.bottom} ${reveal ? classes.showRevers : ""}`}
                style={{ transitionDelay: "0.5s" }}
            >
                Это не просто жильё. Это адрес, который говорит за вас.
            </p>
        </section>
    );
}

export default Collection_section;
