import React from "react";
import classes from './Main_section.module.css';

function Main_section({ children, mobileChange = false, viewHeight='100vh', ...props }) {
    return (
        <section className={classes.main} style={{
            position: mobileChange ? 'relative' : 'fixed',
            height: viewHeight
        }}>
            <div className={classes.animateImg} >
                <p>
                    <img src="/main_name.webp" alt="" />
                </p>
                <p>
                    <img src="/main_name_bottom.webp" alt="" />
                </p>
            </div>
        </section>
    );
}

export default Main_section;