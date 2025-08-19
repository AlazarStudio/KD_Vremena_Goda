// MosaicReveal.jsx
import React, { useEffect, useRef, forwardRef } from "react";

/**
 * MosaicReveal — скролл-управляемые «жалюзи».
 * Требования: родительский контейнер должен быть position: relative.
 *
 * Props:
 * - targetRef: RefObject<HTMLElement> — секция/блок, относительно которого считаем прогресс (обязательно)
 * - colors: string[] — цвета колонок (длина массива = кол-во колонок)
 * - openPx: number[] — «ступень» вниз для каждой колонки (px)
 * - upFrac: number[] — доля высоты секции, куда уходит колонка вверх (0..1)
 * - phase: number[] — фазовый сдвиг старта каждой колонки (0..1)
 * - tA: number — прогресс, на котором достигаем openPx (0..1), по умолчанию 0.35
 * - zIndex: number — слой перекрытия
 * - className: string — доп. классы
 * - style: React.CSSProperties — доп. инлайн-стили контейнера
 */
const MosaicReveal = forwardRef(function MosaicReveal(
  {
    targetRef,
    colors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    openPx = [100, 50, 30, 60, 40],
    upFrac = [1.0, 1.0, 1.0, 1.0, 1.0],
    phase = [0.0, 0.0, 0.0, 0.0, 0.0],
    tA = 0.2,
    zIndex = 1111,
    heightWant= "150px",
    className = "",
    style = {},
  },
  ref
) {
  const overlayRef = useRef(null);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

  useEffect(() => {
    const section = targetRef?.current;
    if (!section) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.05)) {
          startedRef.current = true;
          tick();
        }
      },
      { threshold: [0, 0.05, 1] }
    );
    io.observe(section);

    const onScrollOrResize = () => {
      if (!startedRef.current) return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    function tick() {
      rafRef.current = null;
      const layer = overlayRef.current;
      const sec = targetRef.current;
      if (!layer || !sec) return;

      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const H = r.height;

      // локальный прогресс присутствия секции на экране: 0..1
      const total = H + vh;
      const passed = vh - r.top;
      const p = clamp01(passed / total);

      const cols = Array.from(layer.children);

      cols.forEach((col, i) => {
        const ph = phase[i % phase.length] || 0;
        const open = openPx[i % openPx.length] || 80;
        const endY = (upFrac[i % upFrac.length] ?? 1) * H;

        // нормированный прогресс с учётом фазы старта
        const t0 = clamp01((p - ph) / (1 - ph || 1));

        // вычисляем степень k так, чтобы при t=tA достигать open:
        //  y = endY * (t^k) => при tA: open = endY * (tA^k) => k = log(open/endY)/log(tA)
        const ratio = Math.min(0.99, Math.max(0.01, open / Math.max(1, endY)));
        const tAcl = Math.min(0.99, Math.max(0.01, tA));
        const k = Math.log(ratio) / Math.log(tAcl);

        const y = endY * Math.pow(t0, k); // 0 → endY
        const shift = -y; // вверх

        col.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetRef, colors, openPx, upFrac, phase, tA]);

  return (
    <div
      ref={(node) => {
        overlayRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object") ref.current = node;
      }}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        display: "flex",
        pointerEvents: "none",
        height: heightWant,
        ...style,
      }}
    >
      {colors.map((c, i) => (
        <div
          key={i}
          style={{
            flex: "1 0 0",
            background: c,
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
});

export default MosaicReveal;
