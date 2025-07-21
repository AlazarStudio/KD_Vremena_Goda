import React from "react";
import classes from './Main_section.module.css';

function Main_section({ children, ...props }) {
    return (
        <section className={classes.main}>
            <div className={classes.animateImg} >
                <p>
                    <img src="/main_name.png" alt="" />
                </p>
                <p>
                    <img src="/main_name_bottom.png" alt="" />
                </p>
            </div>
        </section>
    );
}

export default Main_section;