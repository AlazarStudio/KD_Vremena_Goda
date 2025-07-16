import React from "react";
import classes from './Contacts.module.css';

function Contacts({ children, contactShow, ...props }) {
    return (
        <section className={classes.contacts}>
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

                <img
                    className={`${classes.contactsLeft_img3} ${contactShow ? classes.showRotate : ""}`}
                    src="/contacts_logo.png" alt=""
                    style={{ transitionDelay: "0.6s" }}
                />
                <img
                    className={`${classes.contactsLeft_img1} ${contactShow ? classes.show : ""}`}
                    src="/contacts1.png" alt=""
                    style={{ transitionDelay: "0.4s" }}
                />
                <img
                    className={`${classes.contactsLeft_img2} ${contactShow ? classes.show : ""}`}
                    src="/contacts2.png" alt=""
                    style={{ transitionDelay: "0.5s" }}
                />
            </div>
            <div className={classes.contactsRight}>
                <img src="/contacts_logo_text.png" alt="" className={`${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }} />
                <p className={`${classes.contactsRight_miniText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.5s" }}>
                    Связаться с нами
                </p>
                <a className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                    href="tel:+70000000000" style={{ transitionDelay: "0.6s" }}>
                    +7 (000) 000 00 00
                </a>
                <p className={`${classes.contactsRight_miniTextItem} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.7s" }}>
                    Наш адрес
                </p>
                <p className={`${classes.contactsRight_bigText} ${contactShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.8s" }}>
                    Москва, ул. Малая Никитская, 33
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