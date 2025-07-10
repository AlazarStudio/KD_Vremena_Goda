import React, { useEffect, useRef, useState } from "react";
import classes from "./AnimatinTest.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import History_section from "../../Blocks/History_section/History_section";
import Footer from "../../Blocks/Footer/Footer";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Elegant_section from "../../Blocks/Elegant_section/Elegant_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";

function AnimatinTest() {
    const maskedRef = useRef(null);
    const [scr, setScr] = useState(0);
    const [rotate, setRotate] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScr(window.scrollY / 1000)
            setRotate(window.scrollY / 10)
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.scrollY < 2000 && window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Блок с анимацией */}
            <div className={classes.animWrapper}>
                <div className={classes.bg2}>
                    <Main_section />
                </div>

                <div
                    ref={maskedRef}
                    className={classes.masked}
                    style={{
                        WebkitMaskSize: `${window.scrollY < 2000 && rotate / 4}%`,
                        maskSize: `${window.scrollY < 2000 && rotate / 4}%`,
                        transform: `rotate(${window.scrollY < 2000 && rotate}deg) scale(${window.scrollY < 2000 && Math.pow(2, scr)})`,
                    }}
                >
                    <div
                        className={classes.bg1}
                        style={{ transform: `rotate(-${window.scrollY < 2000 && rotate}deg) scale(${window.scrollY < 2000 && Math.pow(0.5, scr)})` }}
                    >
                        <Collection_section />
                    </div>
                </div>
            </div>

            {/* Следующий раздел, отображается после анимации */}
            <div className={classes.contentBelow}>
                <History_section />
                <Flats_section />
                <Elegant_section />
                <Contacts /> 
                <Consultation />
                <Footer />
            </div>
        </>
    );
}

export default AnimatinTest;
