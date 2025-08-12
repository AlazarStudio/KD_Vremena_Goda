import React, { useState } from "react";
import classes from './Header.module.css';
import Contacts_top from "../Contacts_top/Contacts_top";

function Header({ children, ...props }) {
    const [showContacts, setShowContacts] = useState(false);

    function handleContactsClick() {
        setShowContacts(!showContacts);        
        document.body.style.overflow = showContacts ? 'auto' : 'hidden';
    }
    return (
        <>
            <header className={classes.header}>
                <a href="tel:+79380357788" style={{ fontFamily: 'Gotham 400' }}>+7 (938) 035 77 88</a>
                <img src="/logo.png" alt="" />
                <a onClick={handleContactsClick}>Контакты</a>
            </header>

            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateY(${showContacts ? '0' : '100%'})`,
                transition: 'transform 0.6s ease-in-out'
            }}>
                <Contacts_top contactShow={showContacts} handleContactsClick={handleContactsClick}/>
            </div>
        </>
    );
}

export default Header;