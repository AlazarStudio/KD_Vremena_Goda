import React, { useEffect, useRef, useState } from "react";
import classes from './Contacts_top.module.css';

function Contacts_top({ children, contactShow, isMobile, elegantContactsAnimRef, handleContactsClick, viewHeight,...props }) {
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
        const offset = scrollSpeed * progress * (isMobile ? 60 : 100);

        imgRef.current.style.transform = !contactShow ? `translateY(${offset - 100}px)` : `translateY(0px)`;
    }, [scrollY, contactShow]);


    return (
        <div ref={elegantContactsAnimRef} className={classes.forImg}>
            <img
                ref={imgRef}
                className={`${classes.contactsLeft_img2}`}
                src="/contacts2.webp" alt=""
            />
            <img
                onClick={() => {
                    handleContactsClick()
                }}

                style={{
                    position: 'absolute',
                    zIndex: 1000,
                    top: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                }}
                src="/circle-with-x.webp"
                alt=""
            />

            <section className={classes.contacts} ref={sectionRef} style={{height: viewHeight}}>
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
                    src="/contacts1.webp" alt=""
                    style={{ transitionDelay: "0.4s" }}
                />

                <img
                    className={`${classes.contactsLeft_img2} ${contactShow ? classes.show : ""}`}
                    src="/contacts2.webp" alt=""
                    style={{ transitionDelay: "0.4s" }}
                />

                <div className={classes.contactsRight}>
                    <img src="/contacts_logo_text.webp" alt="" className={`${contactShow ? classes.show : ""}`}
                        style={{ transitionDelay: "0.4s" }} />
                    <p className={`${classes.contactsRight_miniText} ${contactShow ? classes.show : ""}`}
                        style={{ transitionDelay: "0.5s" }}>
                        Связаться с нами
                    </p>
                    <a className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                        href="tel:+79380357788" style={{ transitionDelay: "0.5s" }}>
                        +7 (938) 035 77 88
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
        </div>
    );
}

export default Contacts_top;