import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function GameBoxScore() {
    const scrollRef = useRef(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;

        const checkScroll = () => {
            if (!el) return;

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
        <section className="relative mx-auto mb-10 px-[5%]">
            {canScrollLeft && (
                <button
                    onClick={() =>
                        scrollRef.current.scrollBy({
                            left: -300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-r-xl bg-likar3/80 p-2"
                >
                    <ChevronLeft className="text-white" />
                </button>
            )}

            {/* RIGHT ARROW */}
            {canScrollRight && (
                <button
                    onClick={() =>
                        scrollRef.current.scrollBy({
                            left: 300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-l-xl bg-likar3/80 p-2"
                >
                    <ChevronRight className="text-white" />
                </button>
            )}
            <div className="relative overflow-hidden rounded-xl">
                <div
                    className="flex flex-row justify-between bg-likar4"
                    ref={scrollRef}
                >
                    <div className="flex flex-row items-center gap-5 p-3">
                        <img
                            src="/images/teams/vosta.png"
                            alt=""
                            className="aspect-square w-15 rounded-2xl max-sm:w-5"
                        />
                        <p className="font-heading font-semibold text-slate-100">
                            KK Voštarnica
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-5 p-3">
                        <p className="font-heading font-semibold text-slate-100">
                            Trener:
                        </p>
                        <p className="font-heading font-semibold text-slate-100">
                            Ivan Ivanović
                        </p>
                    </div>
                </div>
                <div ref={scrollRef} className="overflow-x-auto">
                    <table className="w-full bg-likar2">
                        <thead>
                            <tr className="border-b border-likar1 bg-likar2 text-slate-100">
                                <th className="p-1 text-center text-nowrap">
                                    BR.
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    IGRAČ
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    POZ
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    MIN
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    PTS
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    ŠUT
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    ŠUT%
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    2P
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    2P%
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    3P
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    3P%
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    SB
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    SB%
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    NS
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    OS
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    SK
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    AS
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    GR
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    UKR
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    BS
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    FO
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    +/-
                                </th>
                                <th className="p-1 text-center text-nowrap">
                                    EFF
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Prva petorka</span>
                                </th>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Klupa</span>
                                </th>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    Ivan Ivanović
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    G
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    32:51
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center text-nowrap">
                                    19
                                </td>
                            </tr>
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Ukupno Ekipa</span>
                                </th>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td
                                    className="p-1 text-center font-semibold text-nowrap"
                                    colSpan={4}
                                ></td>

                                <td className="p-1 text-center font-semibold text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    19
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
