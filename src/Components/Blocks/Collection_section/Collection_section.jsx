import React, { forwardRef } from "react";
import classes from "./Collection_section.module.css";

function Collection_section({ reveal,  viewHeight='100vh', ...props }) {
    return (
        <section className={classes.collection} style={{ height: viewHeight }}>
            <p
                className={`${classes.top} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.2s" }}
            >
                The historical part of the city
            </p>
            <p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0s" }}
            >
                Историческая 
            </p>
             <p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0s" }}
            >
                часть города
            </p>
            {/*<p
                className={`${classes.name} ${reveal ? classes.show : ""}`}
                style={{ transitionDelay: "0.3s" }}
            >
                в центре города
            </p> */}
            <p
                className={`${classes.middle} ${reveal ? classes.showRevers : ""}`}
                style={{ transitionDelay: "0s" }}
            >
                Спокойная архитектура. <br />
                Уверенные решения. <br />
                Продуманное окружение. <br />
                Этот дом построен для тех, кто ценит устойчивость. <br />
                В деталях, в жизни, в себе.
            </p>
            {/* <p
                className={`${classes.bottom} ${reveal ? classes.showRevers : ""}`}
                style={{ transitionDelay: "0.5s" }}
            >
                Это не просто жильё. Это адрес, который говорит за вас.
            </p> */}
        </section>
    );
}

export default Collection_section;
