import { useEffect, useState } from "react";

export function useScrollStop(delay = 150) {
    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        let timeout = null;

        const onScroll = () => {
            setIsStopped(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsStopped(true);
            }, delay);
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            clearTimeout(timeout);
        };
    }, [delay]);

    return isStopped;
}
