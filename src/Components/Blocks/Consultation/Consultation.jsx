import React from "react";
import classes from './Consultation.module.css';
import Footer from "../Footer/Footer";

function Consultation({ children, consultation, ...props }) {
    return (
        <>
            <section className={classes.consultation}>
                <div className={classes.consultation_item}>
                    <div className={`${classes.consultation_item_left} ${consultation ? classes.show : ""}`}
                        style={{ transitionDelay: "0.4s" }}>
                        Получить индивидуальную консультацию

                    </div>
                    <div className={`${classes.consultation_item_right} ${consultation ? classes.show : ""}`}
                        style={{ transitionDelay: "0.6s" }}>
                        <form action="/">
                            <input type="text" placeholder="Имя" />
                            <input type="text" placeholder="Телефон" />

                            <label>
                                <input type="checkbox" name="" id="" />
                                <p>
                                    Я даю согласие на обработку моих персональных данных согласно политике обработки персональных данных
                                </p>
                            </label>

                            <button>Оставить заявку</button>
                        </form>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Consultation;