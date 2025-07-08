import React from "react";
import classes from './Header.module.css';

function Header({ children, ...props }) {
    return ( 
        <header className={classes.header}>
            <a href="tel:+70000000000">+7 (000) 000 00 00</a>
            <img src="/logo.png" alt="" />
            <a href="">Контакты</a>
        </header>
     );
}

export default Header;