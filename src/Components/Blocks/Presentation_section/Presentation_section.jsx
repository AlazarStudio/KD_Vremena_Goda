import React, { useState, useMemo } from "react";
import classes from "./Presentation_section.module.css";

function Presentation_section({ children, presShow, elegantPrezentationRef, viewHeight = '100vh', isMobile, useSectionMetrics, ...props }) {
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

    const [flatsTextInfoRef, flatsTextInfoMetrics] = useSectionMetrics({ margin: 0 });
    const [elegantTextInfoRef, elegantTextInfoMetrics] = useSectionMetrics({ margin: 0 });
    const [flatsTextInfo2Ref, flatsTextInfo2Metrics] = useSectionMetrics({ margin: 0 });
    const [elegantExclusivRef, elegantExclusivMetrics] = useSectionMetrics({ margin: 0 });
    const [infrastructureRef, infrastructureMetrics] = useSectionMetrics({ margin: 0 });
    const [infrastructureTextRef, infrastructureTextMetrics] = useSectionMetrics({ margin: 0 });

    return (
        <>
            <div ref={flatsTextInfoRef} className={classes.flatsTextInfo}>
                <div className={classes.flatsTextInfo_titleText}>
                    <span className={flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}>Apartments Interiors</span>
                    <span className={flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}>Интерьеры</span>
                    <span className={flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}>квартир</span>
                </div>

                <div className={`${classes.flatsTextInfo_underText} ${flatsTextInfoMetrics.progress >= 0.15 ? classes.show : ""}`}>
                    Планировки квартир в клубном доме «Времена года» разнообразные, чтобы каждый мог найти подходящий вариант. Площадь от 39 квадратных метров, французские окна, потолки высотой 3 метра, индивидуальное отопление, шумоизоляция класса А — все это делает квартиры - местом, в котором быт уступает комфорту.
                </div>

                {/* <div className={classes.flatsTextInfo_underImg}>
                    <img src="/hba-white.webp" alt="" />
                    <div className={classes.flatsTextInfo_imgOverlay}></div>
                    <img src="/hba-white.webp" alt="" />
                </div> */}
            </div>

            <div ref={elegantTextInfoRef} className={classes.elegantTextInfo}>
                {isMobile &&
                    <div className={classes.elegantTextInfo_img}>
                        <img src="/interer.webp" alt="" />
                    </div>
                }

                <div className={`${classes.elegantTextInfo_text} ${elegantTextInfoMetrics.progress >= 0.45 ? classes.show : ""}`}>
                    В клубном доме «Времена года» мы позаботились о том, чтобы с первых минут вы ощущали уют.
                    <br />
                    <br />
                    Представьте, переступаете порог здания и понимаете: «Я дома. Я там, где мне хорошо!». Мечта, которая скоро станет реальностью.
                </div>
            </div>

            <div ref={flatsTextInfo2Ref} className={classes.flatsTextInfo} >
                <div className={classes.elegantTextInfo_titleText}>
                    <span className={flatsTextInfo2Metrics.progress >= 0.15 ? classes.show : ""}>PRIVATE CLUB LIVING</span>
                    <span className={flatsTextInfo2Metrics.progress >= 0.15 ? classes.show : ""}>СПОРТ, КОМФОРТ, БЕЗОПАСНОСТЬ</span>
                    {/* <span className={flatsTextInfo2Metrics.progress >= 0.15 ? classes.show : ""}></span> */}
                </div>

                <div className={`${classes.elegantTextInfo_text} ${flatsTextInfo2Metrics.progress >= 0.15 ? classes.show : ""}`}>
                    Современный спортивный зал для жителей дома, двор без машин и закрытая система безопасности, создают атмосферу приватности, где всё пространство работает на ваш комфорт и спокойствие.
                </div>
            </div>

            <div ref={elegantExclusivRef} className={classes.elegantExclusiv} style={{ height: isMobile ? "800px" : viewHeight }}>
                <div className={classes.flatsImgProject} style={{ height: isMobile ? "800px" : viewHeight }}>
                    <div className={classes.flatsImgProject_inner}>
                        <img src="/Slider2 - img2.webp" alt="" />
                        <div className={classes.flatsImgProject_overlay}></div>
                    </div>
                </div>

                <div className={classes.elegantExclusiv_title} >
                    <div className={`${classes.elegantExclusiv_title_small} ${elegantExclusivMetrics.progress >= 0.15 ? classes.show : ""}`}>White Box</div>
                    <span className={elegantExclusivMetrics.progress >= 0.15 ? classes.show : ""}>Предчистовая</span><br />
                    <span className={elegantExclusivMetrics.progress >= 0.15 ? classes.show : ""}>отделка</span>
                </div>

                <div className={classes.elegantExclusiv_desc} >
                    <div className={`${classes.elegantExclusiv_desc_text} ${elegantExclusivMetrics.progress >= 0.15 ? classes.show : ""}`}>
                        <p>
                            Квартиры сдаются в концепции White box. Это готовое решение для тех, кто ценит время и качество.
                        </p>
                        <p>
                            Вы получаете полностью подготовленную квартиру с предчистовой отделкой, готовые ровные стены, потолок, теплые полы, индивидуальное отопление,проведенную электропроводку.
                        </p>

                    </div>

                    <p className={elegantExclusivMetrics.progress >= 0.15 ? classes.show : ""}>
                        Узнать подробнее о деталях White Box можно у наших консультантов по телефону  +7 (938) 035 77 88
                    </p>
                </div>
            </div>

            <div ref={infrastructureRef} className={classes.infrastructure} >
                <div className={classes.infrastructure_cutBlock}>
                    <div className={classes.infrastructure_cutBlock_square1}></div>
                    <div className={classes.infrastructure_cutBlock_square2}></div>
                    <div className={classes.infrastructure_cutBlock_square3}></div>

                    <div className={classes.infrastructure_cutBlock_text}>
                        <span className={infrastructureMetrics.progress >= 0.15 ? classes.show : ""}>Smart инженерия + система «умный дом»</span>
                        <span className={infrastructureMetrics.progress >= 0.15 ? classes.show : ""}>Инфраструктура клубного дома</span>
                    </div>
                </div>
            </div>

            <div ref={infrastructureTextRef} className={classes.infrastructureText} >
                <div className={`${classes.infrastructureText_block} ${infrastructureTextMetrics.progress >= 0.05 ? classes.show : ""}`}>
                    Клубный дом «Времена года» — это не просто роскошное пространство, но и высокотехнологичная система, где каждая деталь работает на комфорт обитателей.
                    Smart-инженерия объединяет передовые технологии автоматизации, создавая безупречную среду обитания.
                    В основе системы лежит централизованное управление всеми инженерными коммуникациями. Умный дом контролирует климат, освещение, безопасность и энергопотребление через единый интерфейс.
                    Владельцы могут управлять всеми функциями с помощью голосовых команд или мобильного приложения.
                </div>
                <div className={`${classes.infrastructureText_block} ${infrastructureTextMetrics.progress >= 0.05 ? classes.show : ""}`}>
                    Инфраструктура клубного дома «Времена года» направлена на создание максимально комфортных условий для проживания и обеспечение безопасности.
                    Дом будет оснащен современными системами безопасности, такими как видеонаблюдение, контроль доступа и круглосуточная охрана.
                    Мы позаботились и о вашем здоровье. В доме будет располагаться спортзал.
                    Важной частью инфраструктуры является удобная и безопасная парковка для жильцов. Никаких машин во дворе- только подземный паркинг с достаточным количеством мест.
                    Для поддержания высокого уровня жизни в клубном доме предусмотрено наличие профессиональной службы управления и технического обслуживания

                </div>
            </div>

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
                    <img src="/circle.webp" alt="" className={classes.presCircle} />
                    <img
                        src="/presentation_img.webp"
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
        </>
    );
}

export default Presentation_section;
