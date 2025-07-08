import React from "react";
import classes from './Contacts.module.css';

function Contacts({ children, ...props }) {
    return (
        <section className={classes.contacts}>
            <div className={classes.contactsLeft}>
                <div className={classes.contactsLeftItem}>
                    <p>CONTACT US</p>
                    <p>контакты</p>
                </div>

                <img className={classes.contactsLeft_img} src="/contact_imgs.png" alt="" />
            </div>
            <div className={classes.contactsRight}>
                <img src="/contacts_logo_text.png" alt="" />
                <p className={classes.contactsRight_miniText}>Связаться с нами</p>
                <a className={classes.contactsRight_bigText} href="tel:+70000000000">+7 (000) 000 00 00</a>
                <p className={classes.contactsRight_miniTextItem}>Наш адрес</p>
                <p className={classes.contactsRight_bigText}>Москва, ул. Малая Никитская, 33</p>
                <p className={classes.contactsRight_miniText}>
                    пн-пт: 10:00–19:00 <br />
                    сб-вс: по записи
                </p>
            </div>
        </section>
    );
}

export default Contacts;