import React, { useState, useMemo } from "react";
import classes from "./Presentation_section.module.css";

function Presentation_section({ children, presShow, elegantPrezentationRef, ...props }) {
    const [fio, setFio] = useState("");
    const [email, setEmail] = useState("");
    const [agreePD, setAgreePD] = useState(false);
    const [agreeMkt, setAgreeMkt] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const canSubmit = useMemo(() => {
        const nameOk = fio.trim().length >= 2;
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
        return agreePD && nameOk && emailOk && agreeMkt;
    }, [fio, email, agreePD, agreeMkt]);

    async function handleSubmit(e) {
        e.preventDefault();                     // ← не перезагружаем страницу
        if (!canSubmit) return;

        try {
            const formData = new FormData();
            formData.append("fio", fio);
            formData.append("email", email);

            const res = await fetch("/php/send_mail file.php", {
                method: "POST",
                body: formData
            });

            const data = await res.json().catch(() => ({}));
        } catch (err) {
            console.error('not ok')
        } finally {
            setFio("")
            setEmail("")
            setAgreePD(false)
            setAgreeMkt(false)
            setIsSend(true)

            setTimeout(() => {
                setIsSend(false)
            }, 5000);
        }
    }

    return (
        <div className={classes.presentation} ref={elegantPrezentationRef} {...props}>
            <div className={classes.presentation_left}>
                <div
                    className={`${classes.presentation_left_title} ${presShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.2s" }}
                >
                    ОТКРОЙТЕ ДЛЯ СЕБЯ ВСЕ ГРАНИ ПРОЕКТА «Времена Года»
                </div>

                <form
                    className={`${classes.presentation_left_form} ${presShow ? classes.show : ""}`}
                    style={{ transitionDelay: "0.4s" }}
                    onSubmit={handleSubmit}
                >
                    <label>Получите подробную презентацию</label>

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
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className={classes.agreement}>
                        <input
                            type="checkbox"
                            name="agree_pd"
                            checked={agreePD}
                            onChange={(e) => setAgreePD(e.target.checked)}
                            required
                        />
                        <p>Согласие на обработку персональных данных</p>
                    </label>

                    <label className={classes.agreement}>
                        <input
                            type="checkbox"
                            name="agree_mkt"
                            checked={agreeMkt}
                            onChange={(e) => setAgreeMkt(e.target.checked)}
                        />
                        <p>Согласие на получение маркетинговых материалов</p>
                    </label>

                    <button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
                        Получить презентацию
                    </button>
                </form>
            </div>

            <div className={classes.presentation_right}>
                <img src="/circle.png" alt="" className={classes.presCircle} />
                <img
                    src="/presentation_img.png"
                    alt=""
                    className={`${classes.presImg} ${presShow ? classes.showRight : ""}`}
                    style={{ transitionDelay: "0.4s" }}
                />
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
                На указанную почту было отправлено сообщение с презентацией
            </div>
        </div>
    );
}

export default Presentation_section;
