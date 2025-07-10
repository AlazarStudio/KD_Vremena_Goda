import React from "react";
import classes from './Flats_section.module.css';
import Slider from "../../Standart/Slider/Slider";

function Flats_section({ children, ...props }) {
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
            <section className={classes.flats}>
                <img src="/flats_logo.png" alt="" />

                <p className={classes.flatsText}>
                    В центре города, среди тихих улиц и архитектуры <br />
                    с историей, — клубный дом “Времена года” <br />
                    с концептом «Коллекция пространств».
                </p>

                <section className={classes.flatsSlider}>
                    <Slider images={images} />
                </section>
            </section>

            <div style={{backgroundColor: '#fff'}}>

                <section className={classes.flatsHistory}>
                    <p className={classes.flatsHistory_name}>Квартиры, которые становятся <br /> частью  вашей истории</p>

                    <div className={classes.flatsHistory_main}>
                        <div className={classes.flatsHistory_statistic}>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p>12</p>
                                <p>ЭТАЖЕЙ</p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p>4</p>
                                <p>ПОДЪЕЗДА</p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p>190</p>
                                <p>КВАРТИР</p>
                            </div>
                        </div>
                        <div className={classes.flatsHistory_statistic}>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p>64</p>
                                <p>подземный <br /> паркинг</p>
                            </div>
                            <div className={classes.flatsHistory_statistic_block}>
                                <p>86</p>
                                <p>НАземный <br /> паркинг</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Flats_section;