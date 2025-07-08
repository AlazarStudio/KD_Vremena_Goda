import React from "react";
import classes from './Consultation.module.css';

function Consultation({ children, ...props }) {
    return (
        <section className={classes.consultation}>
            <div className={classes.consultation_item}>
                <div className={classes.consultation_item_left}>
                    Получить индивидуальную консультацию

                </div>
                <div className={classes.consultation_item_right}>
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
    );
}

export default Consultation;