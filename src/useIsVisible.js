import { useEffect, useState } from "react";

export function useIsVisible(ref) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            const partiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
            setIsVisible(partiallyVisible); // можно заменить на fullyVisible если нужно строго
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
