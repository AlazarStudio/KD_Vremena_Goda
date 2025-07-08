import React from "react";
import classes from './Main_section.module.css';

function Main_section({ children, ...props }) {
    return ( 
        <section className={classes.main}>
            <img src="/main_name.png" alt="" />
        </section>
     );
}

export default Main_section;