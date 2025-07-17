import React, { useState } from "react";
import classes from './Elegant_section.module.css';
import Slider from "../../Standart/Slider/Slider";
import Contacts from "../Contacts/Contacts";
import Consultation from "../Consultation/Consultation";

function Elegant_section({ children, shown, contactShow, consultation, ...props }) {
    let [isStarted, setIsStarted] = useState(true);

    let images = [
        "Slider2 - img1.png",
        "Slider2 - img2.png",
        "Slider2 - img3.png",
        "Slider2 - img4.png",
        "Slider2 - img5.png",
        "Slider2 - img6.png",
        "Slider2 - img7.png",
        "Slider2 - img8.png",
    ];

    return (
        <div className={classes.connect}>
            <section className={classes.elegantSlider}>
                {isStarted
                    ?
                    <div className={classes.startBlock}>
                        <div className={classes.startBlock_item}>
                            <p>элегантные <br />интерьеры</p>
                            <p>ELEGANT INTERIORS</p>
                            <img src="/ArrowRightBottom.png" alt="" onClick={() => setIsStarted(!isStarted)} />
                        </div>
                    </div>
                    :
                    <Slider images={images} itemsPerSlide={3} arrowsBottom={true} />
                }
            </section>

        </div>  
    );
}

export default Elegant_section;