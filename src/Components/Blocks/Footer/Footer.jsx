import React from "react";
import classes from './Footer.module.css';

function Footer({ children, ...props }) {
    return (
        <footer className={classes.footer}>
            <div className={classes.footer_mob}></div>
            <div>
                © КД Времена года 2026
            </div>

            <div>
                {/* <a href="https://alazarstudio.ru" target="_blank" rel="noopener noreferrer">
                    <img src="/logo.png" alt="" />
                </a> */}
                Разработка сайта: <a href="https://alazarstudio.ru" target="_blank" rel="noopener noreferrer">Alazar Studio</a> 
            </div>
        </footer>
    );
}

export default Footer;