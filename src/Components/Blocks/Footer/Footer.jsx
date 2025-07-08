import React from "react";
import classes from './Footer.module.css';

function Footer({ children, ...props }) {
    return ( 
        <footer className={classes.footer}>
            © КД Времена года 2025
        </footer>
     );
}

export default Footer;