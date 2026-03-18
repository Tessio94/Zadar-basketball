import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ButtonScroll({
    scrollRef,
}: {
    scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return;

        const checkScroll = () => {
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
            setCanScrollLeft(el.scrollLeft > 0);
        };

        checkScroll();
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <>
            {canScrollLeft && (
                <button
                    onClick={() =>
                        scrollRef.current?.scrollBy({
                            left: -300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 -left-[6%] z-10 -translate-y-1/2 rounded-r-xl bg-likar3/80 p-2"
                >
                    <ChevronLeft className="text-white" />
                </button>
            )}
            {/* RIGHT ARROW */}
            {canScrollRight && (
                <button
                    onClick={() =>
                        scrollRef.current?.scrollBy({
                            left: 300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 -right-[6%] z-10 -translate-y-1/2 rounded-l-xl bg-likar3/80 p-2"
                >
                    <ChevronRight className="text-white" />
                </button>
            )}
        </>
    );
}
