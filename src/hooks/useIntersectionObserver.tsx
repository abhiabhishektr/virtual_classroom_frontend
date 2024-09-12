import { useEffect, useRef } from 'react';

function useIntersectionObserver(callback: () => void) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observedElement = ref.current;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.length > 0 && entries[0] && entries[0].isIntersecting) {
                    callback();
                }
            },
            { threshold: 0.1 }
        );

        if (observedElement) {
            observer.observe(observedElement);
        }

        return () => {
            if (observedElement) {
                observer.unobserve(observedElement);
            }
        };
    }, [callback]);

    return ref;
}

export default useIntersectionObserver;