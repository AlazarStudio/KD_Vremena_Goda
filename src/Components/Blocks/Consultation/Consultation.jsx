import React, { useMemo, useState } from "react";
import classes from './Consultation.module.css';

function Consultation({ children, consultation, elegantConsultationAnimRef, ...props }) {
    const [fio, setFio] = useState("");
    const [phone, setPhone] = useState("");
    const [agree, setAgree] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const canSubmit = useMemo(() => {
        const nameOk = fio.trim().length >= 2;
        const digits = phone.replace(/\D/g, "");
        const phoneOk = digits.length >= 10 && digits.length <= 16;
        return agree && nameOk && phoneOk;
    }, [fio, phone, agree]);

    async function handleSubmit(e) {
        e.preventDefault();                     // ← не перезагружаем страницу
        if (!canSubmit) return;

        try {
            const formData = new FormData();
            formData.append("fio", fio);
            formData.append("phone", phone);

            const res = await fetch("/php/send_mail.php", {
                method: "POST",
                body: formData
            });

            const data = await res.json().catch(() => ({}));
        } catch (err) {
            console.error('not ok')
        } finally {
            setFio("");
            setPhone("");
            setAgree(false);
            setIsSend(true)

            setTimeout(() => {
                setIsSend(false)
            }, 5000);
        }
    }

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
                        <form onSubmit={handleSubmit}>
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

                    <div style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: 0,
                        padding: '20px 20px 20px 25px',
                        backgroundColor: '#9FD923',
                        zIndex: '999999',
                        borderRadius: '20px 0 0 20px',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                        transform: `translateX(${!isSend ? '100%' : '0%'})`
                    }}>
                        Ваша заявка успешно отправлена
                    </div>

                </div>

            </section>
        </>
    );
}

export default Consultation;