import React from "react";
import classes from './Header.module.css';

function Header({ children, ...props }) {
    return ( 
        <header className={classes.header}>
            <a href="tel:+79380357788" style={{fontFamily: 'Gotham 400'}}>+7 (938) 035 77 88</a>
            <img src="/logo.png" alt="" />
            <a href="/">Контакты</a>
        </header>
     );
}

export default Header;