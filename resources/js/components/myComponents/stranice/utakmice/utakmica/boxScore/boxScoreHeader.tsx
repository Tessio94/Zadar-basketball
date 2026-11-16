export default function BoxScoreHeader() {
    return (
        <>
            {/* Match each scope="colgroup" heading to its actual columns. */}
            <colgroup span={5} />
            <colgroup span={2} />
            <colgroup span={2} />
            <colgroup span={2} />
            <colgroup span={2} />
            <colgroup span={3} />
            <colgroup span={7} />

            <thead className="bg-slate-900 font-text text-xs text-slate-100 sm:text-sm [&_th]:border-r [&_th]:border-b [&_th]:border-likar3/25 [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-center [&_th]:align-middle [&_th]:whitespace-nowrap">
                <tr className="font-semibold">
                    <th scope="col" rowSpan={2} title="Broj dresa">
                        BR.
                    </th>
                    <th
                        scope="col"
                        rowSpan={2}
                        className="sticky left-0 z-20 bg-slate-900"
                    >
                        IGRAČ
                    </th>
                    <th scope="col" rowSpan={2} title="Pozicija">
                        POZ
                    </th>
                    <th scope="col" rowSpan={2} title="Minute provedene u igri">
                        MIN
                    </th>
                    <th scope="col" rowSpan={2} title="Postignuti poeni">
                        PTS
                    </th>

                    <th scope="colgroup" colSpan={2} className="bg-likar3/10">
                        Šut iz igre
                    </th>
                    <th scope="colgroup" colSpan={2} className="bg-likar3/10">
                        2 poena
                    </th>
                    <th scope="colgroup" colSpan={2} className="bg-likar3/10">
                        3 poena
                    </th>
                    <th scope="colgroup" colSpan={2} className="bg-likar3/10">
                        Slobodna bacanja
                    </th>
                    <th scope="colgroup" colSpan={3} className="bg-likar3/10">
                        Skokovi
                    </th>

                    <th scope="col" rowSpan={2} title="Asistencije">
                        AS
                    </th>
                    <th scope="col" rowSpan={2} title="Izgubljene lopte">
                        GR
                    </th>
                    <th scope="col" rowSpan={2} title="Ukradene lopte">
                        UKR
                    </th>
                    <th scope="col" rowSpan={2} title="Blokade">
                        BS
                    </th>
                    <th scope="col" rowSpan={2} title="Osobne pogreške">
                        FO
                    </th>
                    <th
                        scope="col"
                        rowSpan={2}
                        title="Razlika poena ekipe dok je igrač na parketu"
                    >
                        +/-
                    </th>
                    <th scope="col" rowSpan={2} title="Efikasnost igrača">
                        EFF
                    </th>
                </tr>

                <tr className="bg-likar4/30 text-[11px] text-slate-300 sm:text-xs">
                    <th scope="col" title="Šut iz igre: ubačaji / pokušaji">
                        U/P
                    </th>
                    <th scope="col" title="Postotak šuta iz igre">
                        %
                    </th>
                    <th scope="col" title="Šut za 2 poena: ubačaji / pokušaji">
                        U/P
                    </th>
                    <th scope="col" title="Postotak šuta za 2 poena">
                        %
                    </th>
                    <th scope="col" title="Šut za 3 poena: ubačaji / pokušaji">
                        U/P
                    </th>
                    <th scope="col" title="Postotak šuta za 3 poena">
                        %
                    </th>
                    <th
                        scope="col"
                        title="Slobodna bacanja: ubačaji / pokušaji"
                    >
                        U/P
                    </th>
                    <th scope="col" title="Postotak slobodnih bacanja">
                        %
                    </th>
                    <th scope="col" title="Napadački skokovi">
                        NS
                    </th>
                    <th scope="col" title="Obrambeni skokovi">
                        OS
                    </th>
                    <th scope="col" title="Ukupni skokovi">
                        SK
                    </th>
                </tr>
            </thead>
        </>
    );
}
