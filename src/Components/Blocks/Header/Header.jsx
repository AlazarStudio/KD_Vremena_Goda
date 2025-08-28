import React, { useState, useRef, useEffect } from "react";
import classes from './Header.module.css';
import Contacts_top from "../Contacts_top/Contacts_top";

function Header({ children, isMobile, viewHeight = '100vh', scrollY, ...props }) {
    const [showContacts, setShowContacts] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const phoneRef = useRef(null);

    function handleContactsClick() {
        setShowContacts(!showContacts);
        document.body.style.overflow = showContacts ? 'auto' : 'hidden';
    }

    // Закрытие дропдауна при клике вне
    useEffect(() => {
        function handleClickOutside(event) {
            if (phoneRef.current && !phoneRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className={classes.header} style={{ backgroundColor: scrollY > 500 ? '#494342ec' : 'transparent', transition: 'background-color 0.3s ease-in-out' }}>
                <div className={classes.phoneWrapper} ref={phoneRef}>
                    <button
                        className={classes.phoneButton}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <img src="/phone.png" alt="" className={classes.phoneIcon} />
                        +7 (938) 035 77 88
                        <img src="/triangle.png" alt="" className={classes.dropdownIcon} />
                    </button>

                    {showDropdown && (
                        <div className={classes.dropdownMenu}>
                            <a
                                href="https://wa.me/79380357788"
                                className={classes.dropdownItem}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/wa.png" alt="" className={classes.phoneIcon} />
                                WhatsApp
                            </a>
                            <a
                                href="https://t.me/mkdmegapolis"
                                className={classes.dropdownItem}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/tg.png" alt="" className={classes.phoneIcon} />
                                Telegram
                            </a>
                        </div>
                    )}
                </div>

                <img src="/logo.webp" alt="" />

                <a onClick={handleContactsClick}>Контакты</a>
            </header>

            {!isMobile && <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100%',
                height: '100vh',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateY(${showContacts ? '0' : '150%'})`,
                transition: 'transform 0.6s ease-in-out'
            }}>
                <Contacts_top contactShow={showContacts} handleContactsClick={handleContactsClick} viewHeight={viewHeight} />
            </div>
            }
        </>
    );
}

export default Header;