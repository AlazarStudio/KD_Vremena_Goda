import React, { useMemo, useState } from "react";
import classes from './Consultation.module.css';

function Consultation({ children, consultation, elegantConsultationAnimRef, ...props }) {
    const [fio, setFio] = useState("");
    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);

    const canSubmit = useMemo(() => {
        const nameOk = fio.trim().length >= 2;
        const digits = phone.replace(/\D/g, "");
        const phoneOk = digits.length >= 10 && digits.length <= 16;
        return agree && nameOk && phoneOk;
    }, [fio, phone, agree]);

    return (
        <>
            <section className={classes.consultation} ref={elegantConsultationAnimRef} {...props}>
                <div className={classes.consultation_item}>

                    <div
                        className={`${classes.consultation_item_left} ${consultation ? classes.show : ""}`}
                        style={{ transitionDelay: "0.4s" }}
                    >
                        Получить индивидуальную консультацию
                    </div>

                    <div
                        className={`${classes.consultation_item_right} ${consultation ? classes.show : ""}`}
                        style={{ transitionDelay: "0.6s" }}
                    >
                        <form action="/php/send_mail.php" method="post">
                            <input
                                type="text"
                                name="fio"
                                placeholder="Имя"
                                value={fio}
                                onChange={(e) => setFio(e.target.value)}
                                required
                                minLength={2}
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Телефон"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                // необязательный паттерн: допускаем +, пробелы, -, скобки
                                pattern="[\d\s()+-]{10,20}"
                                title="Введите телефон, минимум 10 цифр"
                            />

                            <label className={classes.agreement}>
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    required
                                />
                                <p>
                                    Я даю согласие на обработку моих персональных данных согласно{" "}
                                    <a target="_blank" href="/personal/user%20agreement.pdf" rel="noreferrer">
                                        политике обработки персональных данных
                                    </a>
                                </p>
                            </label>

                            <button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
                                Оставить заявку
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Consultation;