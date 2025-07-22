import React, { useEffect, useRef, useState } from "react";
import classes from './Contacts.module.css';

function Contacts({ children, contactShow, isMobile, ...props }) {
    const imgRef = useRef(null);
    const sectionRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!imgRef.current || !sectionRef.current) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;

        // если блок не в зоне видимости — сбрасываем transform
        if (sectionTop >= windowHeight || sectionTop + sectionHeight <= 0) {
            imgRef.current.style.transform = `translateY(0px)`;
            return;
        }

        // от начала появления до полного входа — нормализуем в диапазон 0..1
        const progress = Math.min(1, Math.max(0, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));

        const scrollSpeed = 3; // чем больше — тем быстрее "выпрыгивает"
        const offset = scrollSpeed * progress * (isMobile ? 60 : 150);

        imgRef.current.style.transform = `translateY(${offset - 100}px)`;

    }, [scrollY]);


    return (
        <section className={classes.contacts} ref={sectionRef}>
            <div className={classes.contactsLeft}>
                <div className={classes.contactsLeftItem}
                >
                    <p className={`${contactShow ? classes.show : ""}`}
                        style={{ transitionDelay: "0.4s" }}>
                        CONTACT US
                    </p>
                    <p className={`${contactShow ? classes.show : ""}`}
                        style={{ transitionDelay: "0.6s" }}>
                        контакты
                    </p>
                </div>

            </div>

            <img
                className={`${classes.contactsLeft_img1} ${contactShow ? classes.show : ""}`}
                src="/contacts1.png" alt=""
                style={{ transitionDelay: "0.4s" }}
            />

            <img
                ref={imgRef}
                className={`${classes.contactsLeft_img2}`}
                src="/contacts2.png" alt=""
            />
            <div className={classes.contactsRight}>
                <img src="/contacts_logo_text.png" alt="" className={`${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }} />
                <p className={`${classes.contactsRight_miniText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.5s" }}>
                    Связаться с нами
                </p>
                <a className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                    href="tel:+70000000000" style={{ transitionDelay: "0.5s" }}>
                    +7 (000) 000 00 00
                </a>
                <p className={`${classes.contactsRight_miniTextItem} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.7s" }}>
                    Наш адрес
                </p>
                <p className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.7s" }}>
                    Фабричная, 7 Правительственный
                </p>
                <p className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.8s" }}>
                    квартал / Золотой квартал
                </p>
                <p className={`${classes.contactsRight_miniText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.9s" }}>
                    пн-пт: 10:00–19:00 <br />
                    сб-вс: по записи
                </p>
            </div>
        </section>
    );
}

export default Contacts;