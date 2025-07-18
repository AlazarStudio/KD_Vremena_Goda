import React from "react";
import classes from './Flats_section.module.css';
import Slider from "../../Standart/Slider/Slider";

function Flats_section({ children, shown, scale, tower, ...props }) {
    let images = [
        "Slider1 - img1.png",
        "Slider1 - img2.png",
        "Slider1 - img3.png",
        "Slider1 - img4.png",
        "Slider1 - img5.png",
        "Slider1 - img6.png",
    ];

    return (
        <>
            <section className={`${classes.flats} `}>
                <img src="/flats_logo.png" alt="" className={`${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }} />

                <p className={`${classes.flatsText} ${shown ? classes.show : ""}`}
                    style={{ transitionDelay: "0.6s" }}>
                    Холл, где начинается вечер
                </p>

                <section className={`${classes.flatsSlider} ${scale ? classes.showScale : ""}`}>
                    <Slider images={images} followMouse={true} shown={shown} scale={scale} />
                </section>
            </section>

            <div style={{ backgroundColor: '#fff' }}>
                <section className={classes.flatsHistory}>
                    <img src="/tower.png" alt="" className={`${classes.moveTower} ${tower ? classes.show : ""}`}
                    />
                    <p className={`${classes.flatsHistory_name} ${tower ? classes.show : ""}`}
                    >
                        Квартиры, которые становятся
                    </p>
                    <p className={`${classes.flatsHistory_name_second} ${tower ? classes.show : ""}`}
                    >
                        частью  вашей истории
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
        </>
    );
}

export default Flats_section;