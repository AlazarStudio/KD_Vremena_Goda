import { useEffect, useState } from "react";

export function useIsVisible(ref) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const elementHeight = rect.height;

            const visiblePart = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            const visibleRatio = visiblePart / elementHeight;

            setIsVisible(visibleRatio >= 0.4); // виден хотя бы на 50%
        };

        checkVisibility(); // начальная проверка
        window.addEventListener("scroll", checkVisibility);
        window.addEventListener("resize", checkVisibility);

        return () => {
            window.removeEventListener("scroll", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
        };
    }, [ref]);

    return isVisible;
}
