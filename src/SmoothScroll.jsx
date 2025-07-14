import { useEffect, useRef } from "react";

export default function SmoothScroll({ children, speed = 0.07 }) {
  const containerRef = useRef(null);
  const y = useRef(0);
  const targetY = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const updateBodyHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };

    const onScroll = () => {
      targetY.current = window.scrollY;
    };

    const animate = () => {
      y.current += (targetY.current - y.current) * speed;
      container.style.transform = `translateY(-${y.current}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateBodyHeight);
    updateBodyHeight();
    animate();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBodyHeight);
      document.body.style.height = "auto";
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
