import React from "react";
import classes from './Presentation_section.module.css';

function Presentation_section({ children, presShow, ...props }) {
    return (
        <div className={classes.presentation}>
            <div className={classes.presentation_left}>
                <div className={`${classes.presentation_left_title} ${presShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.2s" }}>
                    ОТКРОЙТЕ ДЛЯ СЕБЯ ВСЕ ГРАНИ ПРОЕКТА «Времена Года»
                </div>
                <form className={`${classes.presentation_left_form} ${presShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }}>
                    <label>Получите подробную презентацию</label>
                    <input type="text" placeholder="Имя" />
                    <input type="text" placeholder="Email" />
                    <label>
                        <input type="checkbox" name="" id="" />
                        <p>
                            Согласие на обработку персональных данных
                        </p>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" />
                        <p>
                            Согласие на получение маркетинговых материалов
                        </p>
                    </label>

                    <button>Получить презентацию</button>
                </form>
            </div>
            <div className={classes.presentation_right}>
                <img src="/circle.png" alt="" className={`${classes.presCircle}`} />
                <img src="/presentation_img.png" alt="" className={`${classes.presImg} ${presShow ? classes.showRight : ""}`}
                    style={{ transitionDelay: "0.6s" }} />
            </div>
        </div>
    );
}

export default Presentation_section;